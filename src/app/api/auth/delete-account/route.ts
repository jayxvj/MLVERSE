import { NextResponse } from 'next/server';
import { findUserByEmail, deleteUserPermanently } from '@/lib/db';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email, confirmation } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    if (confirmation !== 'DELETE FOREVER') {
      return NextResponse.json(
        { error: 'Confirmation phrase must be exactly "DELETE FOREVER" to delete this account.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = findUserByEmail(normalizedEmail);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'No account found with this email address in the database.' },
        { status: 404 }
      );
    }

    // Delete from SQL database
    deleteUserPermanently(normalizedEmail);

    // If Supabase is configured, delete matching profile record
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('profiles').delete().eq('email', normalizedEmail);
      } catch (e) {
        console.warn('[SUPABASE DELETE WARNING]', e);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Account and all associated records have been permanently deleted from the database.',
    });
  } catch (err: any) {
    console.error('[DELETE ACCOUNT API ERROR]', err);
    return NextResponse.json({ error: err.message || 'Server error deleting account' }, { status: 500 });
  }
}

