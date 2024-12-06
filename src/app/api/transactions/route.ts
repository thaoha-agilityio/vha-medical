import { NextRequest } from 'next/server';

import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { TransactionsResponse } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = req.headers.get('Authorization') || '';

  const res = await apiClient.get<TransactionsResponse>(
    `${API_ENDPOINT.TRANSACTIONS}?${decodeURIComponent(searchParams.toString())}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return Response.json(res);
}
