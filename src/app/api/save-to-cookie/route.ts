import { encrypt } from '@/utils/encode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { key, value } = await req.json();

  const hasCookie = cookies().get(key);

  if (hasCookie?.value === value)
    return new NextResponse('Cookie is already up-to-date', { status: 200 });

  const encryptedValue = (await encrypt(value)) || '';

  cookies().set({
    name: key,
    value: encryptedValue,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // use secure cookies in production
  });

  return new NextResponse('Cookie saved successfully', { status: 201 });
}
