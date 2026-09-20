import { NextResponse } from 'next/server';
import { site, trialInbox } from '@/config/site';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Receives a free-trial enquiry and mails it to `trialInbox`.
 *
 * The recipient and the message body are fixed here, so the route cannot be
 * used to send arbitrary mail to arbitrary addresses.
 *
 * Delivery is configured with ONE of:
 *   WEB3FORMS_ACCESS_KEY                         — sends via Web3Forms
 *   RESEND_API_KEY (+ optional TRIAL_MAIL_FROM)  — sends via Resend
 *   TRIAL_WEBHOOK                                — POSTs the JSON onward
 *
 * With neither set this answers 503, and the form falls back to relaying from
 * the browser (see FreeTrialForm). It never reports success it cannot back up.
 *
 * Note: the FormSubmit relay cannot live here — FormSubmit answers 403 to
 * Vercel's serverless IPs, so that call has to come from the visitor.
 */

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  const firstName = str(body.firstName, 80);
  const lastName = str(body.lastName, 80);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const company = str(body.company, 160);

  if (!firstName || !lastName || !email || !phone || !company) {
    return NextResponse.json({ error: 'Please fill in every field.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email address does not look valid.' }, { status: 400 });
  }

  const receivedAt = new Date().toISOString();
  const text = [
    `Free trial request — ${site.name}`,
    '',
    `Name:     ${firstName} ${lastName}`,
    `Email:    ${email}`,
    `Phone:    ${phone}`,
    `Company:  ${company}`,
    `Received: ${receivedAt}`,
  ].join('\n');
  const subject = `Free trial request — ${firstName} ${lastName} (${company})`;

  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const webhook = process.env.TRIAL_WEBHOOK;

  try {
    // Preferred: no origin restrictions and no datacenter blocking, so unlike
    // the browser relay this works from the server on any domain.
    if (web3Key) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject,
          from_name: site.name,
          replyto: email,
          Name: `${firstName} ${lastName}`,
          Email: email,
          Phone: phone,
          Company: company,
          Received: receivedAt,
        }),
      });
      const out = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (res.ok && out.success) return NextResponse.json({ ok: true });
      console.error('Web3Forms rejected the enquiry:', res.status, out.message);
      return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
    }

    if (resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.TRIAL_MAIL_FROM || `${site.name} <onboarding@resend.dev>`,
          to: [trialInbox],
          reply_to: email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        console.error('Resend rejected the trial enquiry:', res.status, await res.text());
        return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    if (webhook) {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ subject, firstName, lastName, email, phone, company, receivedAt, text }),
      });
      if (!res.ok) {
        console.error('Trial webhook rejected the enquiry:', res.status);
        return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error('Could not deliver the trial enquiry:', error);
    return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
  }

  return NextResponse.json({ error: 'not-configured' }, { status: 503 });
}
