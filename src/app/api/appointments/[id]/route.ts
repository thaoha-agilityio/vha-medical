import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { AppointmentResponse } from '@/types';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const data = await req.json();
  const token = req.headers.get('Authorization') || '';
  const id = (await params).id;

  const res = await apiClient.put<{
    data: AppointmentResponse;
    error?: string;
  }>(`${API_ENDPOINT.APPOINTMENTS}/${id}`, {
    body: data,
    headers: {
      Authorization: token,
    },
  });

  return Response.json(res);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  const res = await apiClient.delete<{
    data: AppointmentResponse;
    error?: string;
  }>(`${API_ENDPOINT.APPOINTMENTS}/${id}`);

  return Response.json(res);
}
