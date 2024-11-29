import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { AuthResponse } from '@/types';

export async function POST(req: Request) {
  const data = await req.json();

  const res = await apiClient.post<AuthResponse>(API_ENDPOINT.SIGN_UP, {
    body: data,
  });

  return Response.json(res);
}
