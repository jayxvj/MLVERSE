import { NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '@/lib/db';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    // 1. Cross-verify with SQL database
    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists. Please sign in instead.' },
        { status: 409 }
      );
    }

    // 2. Insert into SQL database
    const newUser = createUser({
      email,
      password,
      fullName: fullName || email.split('@')[0],
    });

    // 3. Optional Supabase Auth sync if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: newUser.fullName } },
        });
      } catch (e) {
        console.warn('[SUPABASE SYNC WARNING]', e);
      }
    }

    return NextResponse.json({
      success: true,
      user: newUser,
    });
  } catch (err: any) {
    console.error('[AUTH REGISTER ERROR]', err);
    return NextResponse.json({ error: err.message || 'Server error creating account' }, { status: 500 });
  }
}

