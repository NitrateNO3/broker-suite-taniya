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
 * Delivery, in order of preference:
 *   RESEND_API_KEY (+ optional TRIAL_MAIL_FROM)  — sends via Resend
 *   TRIAL_WEBHOOK                                — POSTs the JSON onward
 *   otherwise                                    — relays via FormSubmit
 *
 * The FormSubmit default needs no credentials, but the inbox owner must click
 * the "Activate Form" link FormSubmit emails on the first submission. Until
 * then — or if every route fails — this answers 502/503 and the form says the
 * enquiry has not been sent, rather than faking success.
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

  const resendKey = process.env.RESEND_API_KEY;
  const webhook = process.env.TRIAL_WEBHOOK;

  try {
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
    // No credentials configured: relay through FormSubmit, which forwards to
    // `trialInbox` once that inbox has activated the form.
    const relay = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(trialInbox)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // FormSubmit rejects requests without a site origin.
        Origin: site.url,
        Referer: `${site.url}/free-trial/`,
      },
      body: JSON.stringify({
        _subject: subject,
        _captcha: 'false',
        _template: 'table',
        Name: `${firstName} ${lastName}`,
        Email: email,
        Phone: phone,
        Company: company,
        Received: receivedAt,
      }),
    });
    const result = (await relay.json().catch(() => ({}))) as { success?: string; message?: string };
    if (relay.ok && result.success === 'true') {
      return NextResponse.json({ ok: true });
    }
    console.error('FormSubmit did not accept the enquiry:', relay.status, result.message);
    return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
  } catch (error) {
    console.error('Could not deliver the trial enquiry:', error);
    return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
  }
}
