import { apiClient } from './apiClient';

export interface CmsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CmsResponse<T = any> {
  success: boolean;
  data?: T[];
  item?: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}

export async function fetchCmsItems<T = any>(
  moduleName: string,
  params: CmsQueryParams = {}
): Promise<CmsResponse<T>> {
  const query = new URLSearchParams();
  if (params.page) query.append('page', String(params.page));
  if (params.limit) query.append('limit', String(params.limit));
  if (params.search) query.append('search', params.search);
  if (params.category) query.append('category', params.category);
  if (params.status) query.append('status', params.status);
  if (params.sortBy) query.append('sortBy', params.sortBy);
  if (params.sortOrder) query.append('sortOrder', params.sortOrder);

  const queryString = query.toString();
  const endpoint = `/cms/${moduleName}${queryString ? `?${queryString}` : ''}`;
  const res = await apiClient<any>(endpoint);
  return {
    success: res.success,
    data: Array.isArray(res.data) ? res.data : undefined,
    pagination: res.meta,
    message: res.message,
  } as CmsResponse<T>;
}

export async function createCmsItem<T = any>(
  moduleName: string,
  payload: Record<string, any>
): Promise<{ success: boolean; data?: T; message?: string }> {
  return apiClient<T>(`/cms/${moduleName}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCmsItem<T = any>(
  moduleName: string,
  id: string,
  payload: Record<string, any>
): Promise<{ success: boolean; data?: T; message?: string }> {
  return apiClient<T>(`/cms/${moduleName}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteCmsItem(
  moduleName: string,
  id: string
): Promise<{ success: boolean; message?: string }> {
  return apiClient(`/cms/${moduleName}/${id}`, {
    method: 'DELETE',
  });
}

export async function duplicateCmsItem<T = any>(
  moduleName: string,
  id: string
): Promise<{ success: boolean; data?: T; message?: string }> {
  return apiClient<T>(`/cms/${moduleName}/${id}/duplicate`, {
    method: 'POST',
  });
}

export async function togglePublishCmsItem<T = any>(
  moduleName: string,
  id: string
): Promise<{ success: boolean; data?: T; message?: string }> {
  return apiClient<T>(`/cms/${moduleName}/${id}/toggle-publish`, {
    method: 'POST',
  });
}
