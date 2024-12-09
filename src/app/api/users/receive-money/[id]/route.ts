import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { UserModel } from '@/types';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const data = await req.json();
  const id = (await params).id;

  const res = await apiClient.put<UserModel & { error: string | null }>(
    `${API_ENDPOINT.USERS}/${id}`,
    {
      body: data,
    },
  );

  return Response.json(res);
}
