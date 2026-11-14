import { NextResponse } from 'next/server';
import { getUserProgress, saveUserProgress, validateEmailFormat } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required.' }, { status: 400 });
    }

    const emailCheck = validateEmailFormat(email);
    if (!emailCheck.valid) {
      return NextResponse.json({ error: emailCheck.error }, { status: 400 });
    }

    const progress = getUserProgress(emailCheck.normalized);
    return NextResponse.json({ success: true, progress });
  } catch (err: any) {
    console.error('[API PROGRESS GET ERROR]', err);
    return NextResponse.json({ error: err.message || 'Failed to retrieve user progress.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, progress } = body || {};

    if (!email) {
      return NextResponse.json({ error: 'Email is required to persist progress.' }, { status: 400 });
    }

    const emailCheck = validateEmailFormat(email);
    if (!emailCheck.valid) {
      return NextResponse.json({ error: emailCheck.error }, { status: 400 });
    }

    if (!progress || typeof progress !== 'object') {
      return NextResponse.json({ error: 'Valid progress object is required.' }, { status: 400 });
    }

    const success = saveUserProgress(emailCheck.normalized, progress);
    return NextResponse.json({ success });
  } catch (err: any) {
    console.error('[API PROGRESS POST ERROR]', err);
    return NextResponse.json({ error: err.message || 'Failed to save user progress.' }, { status: 500 });
  }
}
