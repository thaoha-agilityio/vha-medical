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

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  await apiClient.put<UserModel & { error: string | null }>(
    `${API_ENDPOINT.USERS}/${id}`,
    {
      body: {
        publishedAt: null,
      },
    },
  );

  await apiClient.put<{ error: string | null }>(
    `${API_ENDPOINT.CHEMISTS}/unpublish/${id}`,
  );

  await apiClient.put<{ error: string | null }>(
    `${API_ENDPOINT.NOTIFICATIONS}/unpublish/${id}`,
  );

  await apiClient.put<{ error: string | null }>(
    `${API_ENDPOINT.APPOINTMENTS}/unpublish/${id}`,
  );

  return Response.json({});
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = req.headers.get('Authorization') || '';
  const id = (await params).id;

  const res = await apiClient.get<UserModel & { error: string | null }>(
    `${API_ENDPOINT.USERS}/${id}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return Response.json(res);
}
