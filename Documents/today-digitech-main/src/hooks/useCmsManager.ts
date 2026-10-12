'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  fetchCmsItems,
  createCmsItem,
  updateCmsItem,
  deleteCmsItem,
  duplicateCmsItem,
  togglePublishCmsItem,
  CmsQueryParams,
} from '@/lib/cmsService';

import Swal from 'sweetalert2';

export function useCmsManager<T extends { _id?: string; id?: string; title?: string; name?: string }>(
  moduleName: string,
  initialParams: CmsQueryParams = { page: 1, limit: 20 },
  defaultFallbackItems: T[] = []
) {
  const [items, setItems] = useState<T[]>(defaultFallbackItems);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchCmsItems<T>(moduleName, {
        page: pagination.page,
        limit: pagination.limit,
        search,
        status: statusFilter,
        category: categoryFilter,
      });

      if (res.success && res.data && res.data.length > 0) {
        setItems(res.data);
        setError(null);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      } else if (defaultFallbackItems.length > 0) {
        setItems(defaultFallbackItems);
        setError(null);
      } else {
        setItems([]);
        setError(res.message || `No records found`);
      }
    } catch (err: any) {
      if (defaultFallbackItems.length > 0) {
        setItems(defaultFallbackItems);
        setError(null);
      } else {
        setError(err.message || 'Unable to connect to backend server.');
      }
    } finally {
      setLoading(false);
    }
  }, [moduleName, pagination.page, pagination.limit, search, statusFilter, categoryFilter]);

  useEffect(() => {
    loadItems();
  }, [moduleName, pagination.page, pagination.limit, search, statusFilter, categoryFilter]);

  const handleCreate = async (payload: Record<string, any>) => {
    setSubmitting(true);
    try {
      const res = await createCmsItem<T>(moduleName, payload);
      if (res.success) {
        setIsModalOpen(false);
        setEditingItem(null);
        await loadItems();
        Swal.fire({
          icon: 'success',
          title: 'Created Successfully!',
          text: 'The new record has been published live.',
          timer: 2000,
          showConfirmButton: false,
        });
        return { success: true };
      } else {
        Swal.fire({ icon: 'error', title: 'Action Failed', text: res.message || 'Creation failed' });
        return { success: false, message: res.message || 'Creation failed' };
      }
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Creation error' });
      return { success: false, message: err.message || 'Creation error' };
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (id: string, payload: Record<string, any>) => {
    setSubmitting(true);
    try {
      const res = await updateCmsItem<T>(moduleName, id, payload);
      if (res.success) {
        setIsModalOpen(false);
        setEditingItem(null);
        await loadItems();
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully!',
          text: 'Record changes saved live.',
          timer: 2000,
          showConfirmButton: false,
        });
        return { success: true };
      } else {
        Swal.fire({ icon: 'error', title: 'Update Failed', text: res.message || 'Update failed' });
        return { success: false, message: res.message || 'Update failed' };
      }
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Update error' });
      return { success: false, message: err.message || 'Update error' };
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this record? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#64748B',
      confirmButtonText: 'Yes, Delete Record!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await deleteCmsItem(moduleName, id);
      if (res.success) {
        await loadItems();
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Record removed successfully.',
          timer: 1800,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({ icon: 'error', title: 'Delete Failed', text: res.message || 'Failed to delete record' });
      }
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Delete error' });
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const res = await duplicateCmsItem<T>(moduleName, id);
      if (res.success) {
        await loadItems();
        Swal.fire({
          icon: 'success',
          title: 'Duplicated!',
          text: 'Copy of record created.',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({ icon: 'error', title: 'Duplicate Failed', text: res.message || 'Failed to duplicate' });
      }
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Duplicate error' });
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const res = await togglePublishCmsItem<T>(moduleName, id);
      if (res.success) {
        await loadItems();
      } else {
        Swal.fire({ icon: 'error', title: 'Status Toggle Failed', text: res.message || 'Failed to toggle status' });
      }
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Toggle status error' });
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: T) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return {
    items,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    pagination,
    setPagination,
    loadItems,
    isModalOpen,
    editingItem,
    submitting,
    openCreateModal,
    openEditModal,
    closeModal,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleDuplicate,
    handleTogglePublish,
  };
}
