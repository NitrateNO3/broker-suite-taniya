'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { contact, site } from '@/config/site';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'error'; message: string }
  /* Delivery isn't wired up yet — offer the email route instead of pretending. */
  | { kind: 'fallback'; mailto: string };

const field =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.9375rem] text-ink-900 placeholder:text-ink-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30';

export function DeleteAccountForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  function buildMailto(values: Record<string, string>) {
    const body = [
      `Name: ${values.name}`,
      `Account email: ${values.email}`,
      `Phone: ${values.phone || '—'}`,
      '',
      'Reason:',
      values.reason || '—',
      '',
      'I confirm I want this account and its data permanently deleted.',
    ].join('\n');
    return `mailto:${contact.email}?subject=${encodeURIComponent(
      `Account deletion request — ${values.name}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      reason: String(data.get('reason') || '').trim(),
    };
    const confirm = data.get('confirm') === 'on';

    if (!values.name || !values.email) {
      setStatus({ kind: 'error', message: 'Please give your name and the email on the account.' });
      return;
    }
    if (!confirm) {
      setStatus({ kind: 'error', message: 'Please confirm you want the account deleted.' });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/account-deletion/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, confirm }),
      });
      if (res.ok) {
        setStatus({ kind: 'sent' });
        form.reset();
        return;
      }
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      if (payload.error === 'not-configured' || payload.error === 'delivery-failed') {
        setStatus({ kind: 'fallback', mailto: buildMailto(values) });
        return;
      }
      setStatus({ kind: 'error', message: payload.error || 'Something went wrong. Please try again.' });
    } catch {
      setStatus({ kind: 'fallback', mailto: buildMailto(values) });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className="rounded-card-lg border border-success/30 bg-success/5 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-ink-950">Request received</h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
          We have your request and will confirm by email once the account and its data have been removed.
          If you do not hear back within a few days, email us at{' '}
          <a className="font-medium text-red-700 underline underline-offset-4" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-800">
            Full name <span className="text-error">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-800">
            Email on the account <span className="text-error">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-800">
          Phone on the account <span className="text-ink-400">(optional)</span>
        </label>
        <input id="phone" name="phone" autoComplete="tel" className={field} placeholder="Helps us find the right account" />
      </div>

      <div>
        <label htmlFor="reason" className="mb-1.5 block text-sm font-medium text-ink-800">
          Reason <span className="text-ink-400">(optional)</span>
        </label>
        <textarea id="reason" name="reason" rows={4} className={field} placeholder="Anything you would like us to know." />
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/60 p-4">
        <input
          type="checkbox"
          name="confirm"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-red-300 text-red-600 focus:ring-red-500"
        />
        <span className="text-sm leading-relaxed text-ink-700">
          I understand that deleting my {site.name} account permanently removes my profile, saved
          properties and session data, and that this cannot be undone.
        </span>
      </label>

      {status.kind === 'error' && (
        <p role="alert" className="rounded-xl bg-error/10 px-4 py-3 text-sm text-error">
          {status.message}
        </p>
      )}

      {status.kind === 'fallback' && (
        <div role="alert" className="rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-ink-800">
          <p className="font-medium">We could not submit that automatically.</p>
          <p className="mt-1 leading-relaxed">
            Your request has <strong>not</strong> been sent yet. Open it as an email instead — everything you
            typed is already filled in.
          </p>
          <a
            href={status.mailto}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-ink-950 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
          >
            Send by email
          </a>
        </div>
      )}

      <Button type="submit" variant="danger" size="lg" disabled={status.kind === 'sending'} className="w-full sm:w-auto">
        {status.kind === 'sending' ? 'Submitting…' : 'Request account deletion'}
      </Button>
    </form>
  );
}
