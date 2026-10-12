import { getAccessToken, setAccessToken } from './tokenStore';

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
const BASE_URL = configuredApiUrl || '/api/v1';

export interface RefreshResult {
  accessToken: string;
  user: any;
}

export interface ApiClientResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: { total: number; page: number; limit: number; totalPages: number };
}

let refreshPromise: Promise<RefreshResult | null> | null = null;

export async function refreshTokenRequest(): Promise<RefreshResult | null> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const resData = await response.json().catch(() => ({}));
      if (response.ok && resData.data?.accessToken) {
        const result: RefreshResult = {
          accessToken: resData.data.accessToken,
          user: resData.data.user,
        };
        setAccessToken(result.accessToken);
        return result;
      } else {
        setAccessToken(null);
        return null;
      }
    } catch {
      setAccessToken(null);
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false,
): Promise<ApiClientResponse<T>> {
  let token = getAccessToken();
  const isAuthCheck =
    endpoint.includes('/auth/login') ||
    endpoint.includes('/auth/refresh-token') ||
    endpoint.includes('/auth/logout');

  if (!token && !isRetry && !isAuthCheck) {
    const refreshRes = await refreshTokenRequest();
    if (refreshRes?.accessToken) {
      token = refreshRes.accessToken;
    }
  }

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('/') ? `${BASE_URL}${endpoint}` : `${BASE_URL}/${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    const isAuthCheck =
      endpoint.includes('/auth/login') ||
      endpoint.includes('/auth/refresh-token') ||
      endpoint.includes('/auth/logout');

    // Handle 401 Unauthorized -> Trigger Refresh Token logic for protected resource calls
    if (response.status === 401 && !isRetry && !isAuthCheck) {
      const refreshRes = await refreshTokenRequest();
      if (refreshRes?.accessToken) {
        return apiClient<T>(endpoint, options, true);
      } else {
        return { success: false, message: 'Session expired' };
      }
    }

    if (!response.ok) {
      const resData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: resData.message || resData.error?.message || `HTTP ${response.status} Request failed`,
      };
    }

    const resData = await response.json();
    return resData;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Network request failed',
    };
  }
}
