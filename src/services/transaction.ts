// Constants
import {
  API_ENDPOINT,
  API_ROUTE_ENDPOINT,
  DOMAIN,
  EXCEPTION_ERROR_MESSAGE,
} from '@/constants';

// Types
import {
  FetchDataProps,
  ErrorResponse,
  TransactionsDataResponse,
  TransactionsResponse,
} from '@/types';

// Api
import { apiClient } from './api';

export const getTransactions = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.TRANSACTIONS] } },
}: FetchDataProps): TransactionsDataResponse => {
  try {
    const params = new URLSearchParams(searchParams);
    const api = await apiClient.apiClientSession();
    const url = decodeURIComponent(
      `${API_ROUTE_ENDPOINT.TRANSACTIONS}?${params.toString()}`,
    );
    const { data, meta, error } = await api.get<
      TransactionsResponse & { error?: string }
    >(url, {
      ...options,
      next: {
        ...options.next,
        revalidate: 3600,
      },
      baseUrl: DOMAIN,
    });

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { transactions: [], error: errorResponse.error.message };
    }

    return {
      transactions: data,
      ...meta,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.GET('appointments');

    return { transactions: [], error: errorMessage };
  }
};
