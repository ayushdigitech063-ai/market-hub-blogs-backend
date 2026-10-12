import { LeadSubmissionPayload } from '@today-digitech/shared';

interface ApiErrorPayload {
  message?: string;
  errorCode?: string;
  errors?: Array<{ field?: string; message?: string }>;
}

interface ApiSuccessPayload<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PublicApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  signal?: AbortSignal;
  timeoutMs?: number;
  retries?: number;
  next?: { revalidate?: number };
}

export interface CmsDataResult<T> {
  data: T | null;
  status: 'success' | 'not_found' | 'empty' | 'unavailable';
  message?: string;
}

export class PublicApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly fieldErrors: Record<string, string> = {},
    public readonly retryable = false,
  ) {
    super(message);
    this.name = 'PublicApiError';
  }
}

const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_NETWORK_RETRIES = 1;
export const PUBLIC_CMS_REVALIDATE_SECONDS = 300;
const CMS_TIMEOUT_MS = 3000;

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
const apiBaseUrl = configuredApiUrl || '/api/v1';
const publicApiBaseUrl = apiBaseUrl.endsWith('/public') ? apiBaseUrl : `${apiBaseUrl}/public`;

export const getMediaUrl = (url?: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/uploads/')) {
    let origin = (configuredApiUrl || 'http://localhost:5000/api/v1').replace(/\/api\/v1\/?$/, '');
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost' && !configuredApiUrl?.includes('localhost')) {
      origin = 'http://localhost:5000';
    }
    return `${origin}${url}`;
  }
  return url;
};

export const buildPublicApiUrl = (path: string): string =>
  path.startsWith('http') ? path : `${publicApiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;

const getFieldErrors = (payload: ApiErrorPayload): Record<string, string> =>
  (payload.errors || []).reduce<Record<string, string>>((errors, error) => {
    if (error.field && error.message) errors[error.field] = error.message;
    return errors;
  }, {});

const getStatusMessage = (status: number, fallbackMessage?: string): string => {
  if (fallbackMessage) return fallbackMessage;

  const messages: Record<number, string> = {
    400: 'Please review the submitted information and try again.',
    401: 'Your session is not authorized to make this request.',
    403: 'You do not have permission to make this request.',
    404: 'The requested service could not be found.',
    422: 'The submitted information could not be processed.',
    429: 'Too many requests were sent. Please wait and try again.',
    500: 'The service is temporarily unavailable. Please try again later.',
  };

  return messages[status] || 'Unable to complete the request. Please try again.';
};

const isOffline = (): boolean =>
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  navigator.onLine === false;

const wait = (duration: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, duration));

export const publicApiRequest = async <T>(
  path: string,
  { body, headers, signal, timeoutMs = DEFAULT_TIMEOUT_MS, retries = 0, ...options }: PublicApiRequestOptions = {},
): Promise<T> => {
  let attempt = 0;

  while (attempt <= retries) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const abortFromCaller = () => controller.abort();
    signal?.addEventListener('abort', abortFromCaller, { once: true });

    try {
      if (isOffline()) {
        throw new PublicApiError('You appear to be offline. Please reconnect and try again.', undefined, {}, true);
      }

      const response = await fetch(buildPublicApiUrl(path), {
        ...options,
        method: options.method || 'GET',
        cache: options.cache || 'no-store',
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
          ...headers,
        },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      });

      const payload = (await response.json().catch(() => ({}))) as ApiSuccessPayload<T> & ApiErrorPayload;
      if (!response.ok || !payload.success) {
        throw new PublicApiError(
          getStatusMessage(response.status, payload.message),
          response.status,
          getFieldErrors(payload),
          response.status >= 500 || response.status === 429,
        );
      }

      return payload.data;
    } catch (error) {
      const requestWasCancelled = signal?.aborted;
      const apiError =
        error instanceof PublicApiError
          ? error
          : new PublicApiError(
              requestWasCancelled
                ? 'Request cancelled.'
                : error instanceof DOMException && error.name === 'AbortError'
                  ? 'The request timed out. Please try again.'
                  : 'A network error occurred. Please try again.',
              undefined,
              {},
              !requestWasCancelled,
            );

      if (!requestWasCancelled && apiError.retryable && attempt < retries) {
        attempt += 1;
        await wait(250 * attempt);
        continue;
      }

      throw apiError;
    } finally {
      clearTimeout(timeout);
      signal?.removeEventListener('abort', abortFromCaller);
    }
  }

  throw new PublicApiError('Unable to complete the request. Please try again.');
};

export const submitPublicLead = (
  payload: LeadSubmissionPayload,
  options: Pick<PublicApiRequestOptions, 'signal'> = {},
): Promise<{ id: string; name: string; email: string }> =>
  publicApiRequest('/leads', {
    method: 'POST',
    body: payload,
    signal: options.signal,
    retries: DEFAULT_NETWORK_RETRIES,
  });

export const getPublicData = <T>(path: string, options: PublicApiRequestOptions = {}): Promise<T> =>
  publicApiRequest<T>(path, options);

export const getPublicCmsData = async <T>(path: string): Promise<CmsDataResult<T>> => {
  try {
    const data = await getPublicData<T>(path, {
      cache: 'force-cache',
      next: { revalidate: PUBLIC_CMS_REVALIDATE_SECONDS },
      timeoutMs: CMS_TIMEOUT_MS,
    });
    const isEmpty = Array.isArray(data) && data.length === 0;
    return { data, status: isEmpty ? 'empty' : 'success' };
  } catch (error) {
    if (error instanceof PublicApiError && error.status === 404) {
      return { data: null, status: 'not_found', message: error.message };
    }
    return {
      data: null,
      status: 'unavailable',
      message: error instanceof Error ? error.message : 'CMS content is unavailable.',
    };
  }
};

export async function fetchPublicData<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    return await getPublicData<T>(endpoint, { timeoutMs: 1200 });
  } catch {
    return fallbackData;
  }
}
