import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT, EXCEPTION_ERROR_MESSAGE } from '@/constants';

// Types
import {
  AppointmentsResponse,
  AppointmentsDataResponse,
  FetchDataProps,
  AppointmentPayload,
  AppointmentResponse,
  ErrorResponse,
  AppointmentDataResponse,
} from '@/types';

// Services
import { apiClient } from '@/services';

export const getAppointments = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.APPOINTMENTS] } },
}: FetchDataProps): AppointmentsDataResponse => {
  try {
    const params = new URLSearchParams(searchParams);
    const api = await apiClient.apiClientSession();
    const url = decodeURIComponent(
      `${API_ENDPOINT.APPOINTMENTS}?${params.toString()}`,
    );
    const { data, meta, error } = await api.get<
      AppointmentsResponse & { error?: string }
    >(url, {
      ...options,
      next: {
        ...options.next,
        revalidate: 3600,
      },
    });

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { appointments: [], error: errorResponse.error.message };
    }

    return {
      appointments: data,
      ...meta,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.GET('appointments');

    return { appointments: [], error: errorMessage };
  }
};

export const addAppointment = async (
  appointment: AppointmentPayload,
): Promise<AppointmentDataResponse> => {
  try {
    const api = await apiClient.apiClientSession();
    const { data, error } = await api.post<{
      data: AppointmentResponse;
      error?: string;
    }>(`${API_ENDPOINT.APPOINTMENTS}`, {
      body: {
        data: appointment,
      },
    });

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { appointment: null, error: errorResponse.error.message };
    }

    revalidateTag(`${API_ENDPOINT.APPOINTMENTS}/dashboard`);
    revalidateTag(API_ENDPOINT.APPOINTMENTS);

    return { appointment: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.ADD('appointment');

    return { appointment: null, error: errorMessage };
  }
};

export const updateAppointment = async (
  id: string,
  appointment: AppointmentPayload,
): Promise<AppointmentDataResponse> => {
  try {
    const api = await apiClient.apiClientSession();
    const { data, error } = await api.put<{
      data: AppointmentResponse;
      error?: string;
    }>(`${API_ENDPOINT.APPOINTMENTS}/${id}`, {
      body: {
        data: {
          ...appointment,
        },
      },
    });

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { appointment: null, error: errorResponse.error.message };
    }

    revalidateTag(`${API_ENDPOINT.APPOINTMENTS}/dashboard`);
    revalidateTag(API_ENDPOINT.APPOINTMENTS);

    return { appointment: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.UPDATE('appointment');

    return { appointment: null, error: errorMessage };
  }
};

export const deleteAppointment = async (
  id: string,
): Promise<AppointmentDataResponse> => {
  try {
    const api = await apiClient.apiClientSession();
    const { data, error } = await api.delete<{
      data: AppointmentResponse;
      error?: string;
    }>(`${API_ENDPOINT.APPOINTMENTS}/${id}`);

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { appointment: null, error: errorResponse.error.message };
    }

    revalidateTag(`${API_ENDPOINT.APPOINTMENTS}/dashboard`);
    revalidateTag(API_ENDPOINT.APPOINTMENTS);

    return { appointment: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.DELETE('appointment');

    return { appointment: null, error: errorMessage };
  }
};
