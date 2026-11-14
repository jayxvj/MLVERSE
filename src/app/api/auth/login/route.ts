import { NextResponse } from 'next/server';
import { verifyUserPassword, validateEmailFormat } from '@/lib/db';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    const emailValidation = validateEmailFormat(email);
    if (!emailValidation.valid) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 });
    }
    const normalizedEmail = emailValidation.normalized;

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password is required.' }, { status: 400 });
    }

    // Cross-verify credentials strictly against SQL database
    const verifyResult = verifyUserPassword(normalizedEmail, password);
    if (!verifyResult.success || !verifyResult.user) {
      return NextResponse.json(
        { error: verifyResult.error || 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Optional Supabase sync
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
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
