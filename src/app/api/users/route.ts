import { NextRequest } from 'next/server';

import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { UserLogged, UserModel } from '@/types';

export async function POST(req: Request) {
  const data = await req.json();
  const token = req.headers.get('Authorization') || '';

  const res = await apiClient.post<UserModel & { error: string | null }>(
    API_ENDPOINT.USERS,
    {
      body: data,
      headers: {
        Authorization: token,
      },
    },
  );

  return Response.json(res);
}

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization') || '';

  const res = await apiClient.get<UserLogged[] & { error: string | null }>(
    `${API_ENDPOINT.USERS}?filters[publishedAt][$notNull]=true`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return Response.json(res);
}
