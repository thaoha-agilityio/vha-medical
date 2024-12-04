import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { UserModel } from '@/types';

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
