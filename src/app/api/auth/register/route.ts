import { NextResponse } from 'next/server';
import { findUserByEmail, createUser, validateEmailFormat } from '@/lib/db';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, fullName } = body || {};

    // 1. Email validation (RFC compliance, domain typo check, gmail rules)
    const emailValidation = validateEmailFormat(email);
    if (!emailValidation.valid) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 });
    }
    const normalizedEmail = emailValidation.normalized;

    // 2. Password validation
    if (!password || typeof password !== 'string' || password.trim().length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long and cannot be only whitespace.' },
        { status: 400 }
      );
    }
    if (password.length > 72) {
      return NextResponse.json({ error: 'Password cannot exceed 72 characters.' }, { status: 400 });
    }

    // 3. Full Name validation (if provided)
    let cleanFullName = '';
    if (fullName && typeof fullName === 'string') {
      const trimmedName = fullName.trim();
      if (trimmedName.length > 0 && trimmedName.length < 2) {
        return NextResponse.json(
          { error: 'Full name must be at least 2 characters long if provided.' },
          { status: 400 }
        );
      }
      cleanFullName = trimmedName.slice(0, 60);
    }

    // 4. Cross-verify with SQL database
    const existing = findUserByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists. Please sign in instead.' },
        { status: 409 }
      );
    }

    // 5. Insert into SQL database with fresh individual LMS record
    const newUser = createUser({
      email: normalizedEmail,
      password,
      fullName: cleanFullName || normalizedEmail.split('@')[0],
    });

    // 6. Optional Supabase Auth sync if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signUp({
          email: normalizedEmail,
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
