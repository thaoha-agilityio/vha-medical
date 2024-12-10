import { NextRequest } from 'next/server';
import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { UserLogged } from '@/types';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization') || '';

  const res = await apiClient.get<{
    user: UserLogged | null;
    error: string | null;
  }>(`${API_ENDPOINT.USERS}/me?populate=*`, {
    headers: {
      Authorization: token,
    },
  });

  return Response.json(res);
}
