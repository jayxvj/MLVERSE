import { NextResponse } from 'next/server';
import { verifyUserPassword } from '@/lib/db';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password is required.' }, { status: 400 });
    }

    // Cross-verify credentials strictly against SQL database
    const verifyResult = verifyUserPassword(email, password);
    if (!verifyResult.success || !verifyResult.user) {
      return NextResponse.json(
        { error: verifyResult.error || 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Optional Supabase sync
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signInWithPassword({ email, password });
      } catch (e) {
        console.warn('[SUPABASE SYNC WARNING]', e);
      }
    }

    return NextResponse.json({
      success: true,
      user: verifyResult.user,
    });
  } catch (err: any) {
    console.error('[AUTH LOGIN ERROR]', err);
    return NextResponse.json({ error: err.message || 'Server error logging in' }, { status: 500 });
  }
}

