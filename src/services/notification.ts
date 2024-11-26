import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT, EXCEPTION_ERROR_MESSAGE } from '@/constants';

// Types
import {
  NotificationsResponse,
  NotificationsDataResponse,
  FetchDataProps,
  NotificationPayload,
  NotificationResponse,
  ErrorResponse,
  NotificationDataResponse,
} from '@/types';

// Services
import { apiClient } from '@/services';

export const getNotifications = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.NOTIFICATIONS] } },
}: FetchDataProps): NotificationsDataResponse => {
  try {
    const params = new URLSearchParams(searchParams);
    const api = await apiClient.apiClientSession();
    const url = decodeURIComponent(
      `${API_ENDPOINT.NOTIFICATIONS}?${params.toString()}`,
    );
    const { data, meta, error } = await api.get<
      NotificationsResponse & { error?: string }
    >(url, {
      ...options,
      next: {
        ...options.next,
        revalidate: 3600,
      },
    });

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { notifications: [], error: errorResponse.error.message };
    }

    return {
      notifications: data,
      ...meta,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.GET('notifications');

    return { notifications: [], error: errorMessage };
  }
};

export const addNotification = async (
  notification: NotificationPayload,
): Promise<NotificationDataResponse> => {
  try {
    const api = await apiClient.apiClientSession();
    const { data, error } = await api.post<{
      data: NotificationResponse;
      error?: string;
    }>(`${API_ENDPOINT.NOTIFICATIONS}`, {
      body: {
        data: notification,
      },
    });

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { notification: null, error: errorResponse.error.message };
    }

    revalidateTag(API_ENDPOINT.NOTIFICATIONS);

    return { notification: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.ADD('notification');

    return { notification: null, error: errorMessage };
  }
};

export const updateNotification = async (
  id: string,
  notification: NotificationPayload,
): Promise<NotificationDataResponse> => {
  try {
    const api = await apiClient.apiClientSession();
    const { data, error } = await api.put<{
      data: NotificationResponse;
      error?: string;
    }>(`${API_ENDPOINT.NOTIFICATIONS}/${id}`, {
      body: {
        data: {
          ...notification,
        },
      },
    });

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { notification: null, error: errorResponse.error.message };
    }

    revalidateTag(API_ENDPOINT.NOTIFICATIONS);

    return { notification: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.UPDATE('notification');

    return { notification: null, error: errorMessage };
  }
};

export const deleteNotification = async (
  id: string,
): Promise<NotificationDataResponse> => {
  try {
    const api = await apiClient.apiClientSession();
    const { data, error } = await api.delete<{
      data: NotificationResponse;
      error?: string;
    }>(`${API_ENDPOINT.NOTIFICATIONS}/${id}`);

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { notification: null, error: errorResponse.error.message };
    }

    revalidateTag(API_ENDPOINT.APPOINTMENTS);

    return { notification: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.DELETE('notification');

    return { notification: null, error: errorMessage };
  }
};
