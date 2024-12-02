import { NextRequest } from 'next/server';

import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { ChemistsDataResponse } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = req.headers.get('Authorization') || '';

  const res = await apiClient.get<ChemistsDataResponse>(
    `${API_ENDPOINT.CHEMISTS}?${decodeURIComponent(searchParams.toString())}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  console.log('Authorization', res);

  return Response.json(res);
}

export async function POST(req: Request) {
  const data = await req.json();

  const res = await apiClient.post<ChemistsDataResponse>(
    API_ENDPOINT.CHEMISTS,
    {
      body: data,
    },
  );

  return Response.json(res);
}
