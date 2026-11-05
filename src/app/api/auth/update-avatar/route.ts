import { NextResponse } from 'next/server';
import { updateUserAvatar } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email, avatarUrl } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    if (!avatarUrl || typeof avatarUrl !== 'string') {
      return NextResponse.json({ error: 'Avatar image URL is required.' }, { status: 400 });
    }

    updateUserAvatar(email, avatarUrl);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error updating avatar' }, { status: 500 });
  }
}

