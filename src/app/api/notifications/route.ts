import { NextRequest } from 'next/server';

import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { NotificationResponse, NotificationsResponse } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = req.headers.get('Authorization') || '';

  const res = await apiClient.get<NotificationsResponse>(
    `${API_ENDPOINT.NOTIFICATIONS}?${decodeURIComponent(searchParams.toString())}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return Response.json(res);
}

export async function POST(req: Request) {
  const data = await req.json();

  const res = await apiClient.post<NotificationResponse>(
    API_ENDPOINT.NOTIFICATIONS,
    {
      body: data,
    },
  );

  return Response.json(res);
}

export async function PUT(req: Request) {
  const data = await req.json();

  const res = await apiClient.put<NotificationResponse>(
    API_ENDPOINT.NOTIFICATIONS,
    {
      body: data,
    },
  );

  return Response.json(res);
}
