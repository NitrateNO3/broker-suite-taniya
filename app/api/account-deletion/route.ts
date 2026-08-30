import { NextResponse } from 'next/server';
import { contact, site } from '@/config/site';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Receives an account-deletion request and mails it to the site address.
 *
 * The recipient is fixed to `contact.email` and the body is templated here, so
 * this can never be used to send arbitrary mail to arbitrary people.
 *
 * Delivery is configured with ONE of:
 *   RESEND_API_KEY (+ optional ACCOUNT_DELETION_FROM)  — sends via Resend
 *   ACCOUNT_DELETION_WEBHOOK                           — POSTs JSON onward
 *
 * With neither set the route answers 503 and the form falls back to opening a
 * prefilled email, rather than telling someone their request was sent when it
 * was not.
 */

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  reason?: unknown;
  confirm?: unknown;
};

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const reason = str(body.reason, 2000);

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email address does not look valid.' }, { status: 400 });
  }
  if (body.confirm !== true) {
    return NextResponse.json({ error: 'Please confirm you want the account deleted.' }, { status: 400 });
  }

  const receivedAt = new Date().toISOString();
  const lines = [
    `Account deletion request — ${site.name}`,
    '',
    `Name:      ${name}`,
    `Email:     ${email}`,
    `Phone:     ${phone || '—'}`,
    `Received:  ${receivedAt}`,
    '',
    'Reason given:',
    reason || '—',
    '',
    'The requester confirmed they understand the deletion is permanent.',
  ];
  const text = lines.join('\n');
  const subject = `Account deletion request — ${name}`;

  const webhook = process.env.ACCOUNT_DELETION_WEBHOOK;
  const resendKey = process.env.RESEND_API_KEY;

  try {
    if (resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.ACCOUNT_DELETION_FROM || `${site.name} <onboarding@resend.dev>`,
          to: [contact.email],
          reply_to: email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        console.error('Resend rejected the deletion request:', res.status, await res.text());
        return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    if (webhook) {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ subject, name, email, phone, reason, receivedAt, text }),
      });
      if (!res.ok) {
        console.error('Deletion webhook rejected the request:', res.status);
        return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error('Could not deliver the deletion request:', error);
    return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
  }

  // Nothing configured — say so plainly so the form can offer the email route.
  return NextResponse.json({ error: 'not-configured' }, { status: 503 });
}
