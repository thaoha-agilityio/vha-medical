import { NextRequest } from 'next/server';

import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { TransactionResponse, TransactionsResponse } from '@/types';

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

export async function POST(req: Request) {
  const data = await req.json();
  const token = req.headers.get('Authorization') || '';

  const res = await apiClient.post<{
    data: TransactionResponse;
    error?: string;
  }>(API_ENDPOINT.TRANSACTIONS, {
    body: data,
    headers: {
      Authorization: token,
    },
  });

  return Response.json(res);
}
