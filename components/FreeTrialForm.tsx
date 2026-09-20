'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { trialInbox, web3formsKey } from '@/config/site';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'error'; message: string }
  /* Delivery isn't wired up yet — offer the email route instead of pretending. */
  | { kind: 'fallback'; mailto: string };

const field =
  'w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-[0.9375rem] text-ink-900 ' +
  'placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30';

const fields = [
  { name: 'firstName', label: 'First name', type: 'text', autoComplete: 'given-name', placeholder: 'Asha', half: true },
  { name: 'lastName', label: 'Last name', type: 'text', autoComplete: 'family-name', placeholder: 'Menon', half: true },
  { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email', placeholder: 'you@company.com', half: true },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', placeholder: '+91 98765 43210', half: true },
  { name: 'company', label: 'Company', type: 'text', autoComplete: 'organization', placeholder: 'Your agency or brokerage', half: false },
] as const;

export function FreeTrialForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  function buildMailto(v: Record<string, string>) {
    const body = [
      `Name: ${v.firstName} ${v.lastName}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone}`,
      `Company: ${v.company}`,
      '',
      'I would like to book a free trial of BrokrSuite.',
    ].join('\n');
    return `mailto:${trialInbox}?subject=${encodeURIComponent(
      `Free trial request — ${v.firstName} ${v.lastName}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  /**
   * Both relays run here rather than on the server: Web3Forms permits
   * server-side calls only on its paid plan, and FormSubmit answers 403 to
   * Vercel's IPs. From the visitor's own browser both are accepted.
   *
   * Web3Forms is tried first because it works on any domain. FormSubmit is the
   * backstop, but it scopes activation per origin, so it only delivers from
   * origins that inbox has activated.
   */
  async function relayViaWeb3Forms(values: Record<string, string>) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: `Free trial request — ${values.firstName} ${values.lastName} (${values.company})`,
        from_name: 'BrokrSuite website',
        replyto: values.email,
        Name: `${values.firstName} ${values.lastName}`,
        Email: values.email,
        Phone: values.phone,
        Company: values.company,
      }),
    });
    const body = (await res.json().catch(() => ({}))) as { success?: boolean };
    return res.ok && Boolean(body.success);
  }

  async function relayFromBrowser(values: Record<string, string>) {
    if (await relayViaWeb3Forms(values).catch(() => false)) return true;
    const target = process.env.NEXT_PUBLIC_FORMSUBMIT_ID || trialInbox;
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(target)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Free trial request — ${values.firstName} ${values.lastName} (${values.company})`,
        _captcha: 'false',
        _template: 'table',
        Name: `${values.firstName} ${values.lastName}`,
        Email: values.email,
        Phone: values.phone,
        Company: values.company,
      }),
    });
    const body = (await res.json().catch(() => ({}))) as { success?: string };
    return res.ok && body.success === 'true';
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(
      fields.map((f) => [f.name, String(data.get(f.name) || '').trim()]),
    ) as Record<string, string>;

    if (Object.values(values).some((v) => !v)) {
      setStatus({ kind: 'error', message: 'Please fill in every field.' });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/free-trial/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus({ kind: 'sent' });
        form.reset();
        return;
      }
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      if (payload.error === 'not-configured' || payload.error === 'delivery-failed') {
        // No mail provider set: try relaying from here before giving up.
        if (await relayFromBrowser(values).catch(() => false)) {
          setStatus({ kind: 'sent' });
          form.reset();
          return;
        }
        setStatus({ kind: 'fallback', mailto: buildMailto(values) });
        return;
      }
      setStatus({ kind: 'error', message: payload.error || 'Something went wrong. Please try again.' });
    } catch {
      if (await relayFromBrowser(values).catch(() => false)) {
        setStatus({ kind: 'sent' });
        form.reset();
        return;
      }
      setStatus({ kind: 'fallback', mailto: buildMailto(values) });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className="rounded-card-lg border border-success/30 bg-success/5 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-ink-950">Thanks — we have your details</h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
          Someone from the team will be in touch shortly to set your trial up. If it is urgent, email us at{' '}
          <a className="font-medium text-brand-700 underline underline-offset-4" href={`mailto:${trialInbox}`}>
            {trialInbox}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
            <label htmlFor={f.name} className="mb-1 block text-sm font-medium text-ink-800">
              {f.label} <span className="text-error">*</span>
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required
              autoComplete={f.autoComplete}
              className={field}
              placeholder={f.placeholder}
            />
          </div>
        ))}
      </div>

      {status.kind === 'error' && (
        <p role="alert" className="rounded-xl bg-error/10 px-4 py-3 text-sm text-error">
          {status.message}
        </p>
      )}

      {status.kind === 'fallback' && (
        <div role="alert" className="rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-ink-800">
          <p className="font-medium">We could not submit that automatically.</p>
          <p className="mt-1 leading-relaxed">
            Your details have <strong>not</strong> been sent yet. Open it as an email instead — everything
            you typed is already filled in.
          </p>
          <a
            href={status.mailto}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-ink-950 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
          >
            Send by email
          </a>
        </div>
      )}

      <Button type="submit" size="lg" disabled={status.kind === 'sending'} className="w-full sm:w-auto">
        {status.kind === 'sending' ? 'Sending…' : 'Book my free trial'}
      </Button>

      <p className="text-xs leading-relaxed text-ink-400">
        We use these details only to set up your trial and get in touch about it.
      </p>
    </form>
  );
}
