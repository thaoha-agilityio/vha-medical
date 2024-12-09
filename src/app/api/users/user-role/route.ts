import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { RolesResponse } from '@/types';

export async function GET() {
  const res = await apiClient.get<RolesResponse>(
    `${API_ENDPOINT.PERMISSIONS}/roles`,
  );

  return Response.json(res);
}
