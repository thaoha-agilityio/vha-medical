import { NextRequest } from 'next/server';

import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { SpecialtiesResponse } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const res = await apiClient.get<SpecialtiesResponse & { error?: string }>(
    `${API_ENDPOINT.SPECIALTIES}?${searchParams.toString()}`,
  );

  return Response.json(res);
}
