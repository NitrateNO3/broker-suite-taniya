'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { contact, contactEndpoint } from '@/config/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Values = {
  name: string;
  company: string;
  phone: string;
  email: string;
  teamSize: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: '', company: '', phone: '', email: '', teamSize: '', message: '' };

const teamSizes = ['Just me', '2–5 people', '6–20 people', '21–50 people', '50+ people'];

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length < 2) errors.name = 'Please enter your full name.';

  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';

  if (values.phone.trim() && !/^[+\d][\d\s()-]{6,19}$/.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number.';

  if (!values.message.trim()) errors.message = 'Tell us a little about what you need.';
  else if (values.message.trim().length < 10) errors.message = 'Please add a bit more detail.';

  return errors;
}

const fieldBase =
  'block w-full rounded-xl border bg-white px-3.5 py-2.5 text-[0.9375rem] text-ink-900 placeholder:text-ink-400 ' +
  'transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500';

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  // Timestamp trap: bots submit near-instantly. Set on first interaction.
  const startedAt = useRef<number | null>(null);

  const isConfigured = Boolean(contactEndpoint);

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (startedAt.current === null) startedAt.current = Date.now();
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError('');

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    // Spam protection: hidden honeypot + minimum time-on-form.
    const honeypot = new FormData(e.currentTarget).get('website');
    const elapsed = startedAt.current ? Date.now() - startedAt.current : 0;
    if (honeypot || elapsed < 2000) {
      setStatus('error');
      setServerError('Your submission looked automated. Please try again, or email us directly.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, source: 'brokrsuite.com/contact' }),
      });

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

      setStatus('success');
      setValues(empty);
      startedAt.current = null;
    } catch {
      setStatus('error');
      setServerError('We could not send your message. Please try again, or email us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-card-lg border border-success/20 bg-success/5 p-8 text-center" role="status">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-success text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6" aria-hidden="true">
            <path d="M4 12.5l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-5 text-lg font-semibold text-ink-950">Thanks — we&apos;ve got your request.</h3>
        <p className="mx-auto mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ink-600">
          A member of the BrokrSuite team will get back to you shortly. If it&apos;s urgent, email us at{' '}
          <a href={`mailto:${contact.email}`} className="font-medium text-brand-600 underline underline-offset-4">
            {contact.email}
          </a>
          .
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      {!isConfigured && (
        <div className="rounded-xl border border-warning/25 bg-warning/5 p-4" role="note">
          <p className="text-sm font-semibold text-ink-900">This form is not connected yet</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-600">
            Set <code className="rounded bg-ink-100 px-1 py-0.5 text-[0.8125rem]">NEXT_PUBLIC_CONTACT_ENDPOINT</code>{' '}
            to enable submissions. In the meantime, please email{' '}
            <a href={`mailto:${contact.email}`} className="font-medium text-brand-600 underline underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        </div>
      )}

      {status === 'error' && serverError && (
        <div className="rounded-xl border border-error/25 bg-error/5 p-4" role="alert">
          <p className="text-sm leading-relaxed text-error">
            {serverError}{' '}
            <a href={`mailto:${contact.email}`} className="font-medium underline underline-offset-4">
              {contact.email}
            </a>
          </p>
        </div>
      )}

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-name`} name="name" label="Name" required error={errors.name}>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set('name')}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className={`${fieldBase} ${errors.name ? 'border-error' : 'border-ink-200'}`}
          />
        </Field>

        <Field id={`${uid}-company`} name="company" label="Company name" error={errors.company}>
          <input
            id={`${uid}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={set('company')}
            placeholder="Your agency or firm"
            className={`${fieldBase} border-ink-200`}
          />
        </Field>

        <Field id={`${uid}-email`} name="email" label="Email" required error={errors.email}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            className={`${fieldBase} ${errors.email ? 'border-error' : 'border-ink-200'}`}
          />
        </Field>

        <Field id={`${uid}-phone`} name="phone" label="Phone" error={errors.phone}>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            placeholder="+91 98765 43210"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
            className={`${fieldBase} ${errors.phone ? 'border-error' : 'border-ink-200'}`}
          />
        </Field>
      </div>

      <Field id={`${uid}-teamSize`} name="teamSize" label="Number of team members" error={errors.teamSize}>
        <select
          id={`${uid}-teamSize`}
          name="teamSize"
          value={values.teamSize}
          onChange={set('teamSize')}
          className={`${fieldBase} border-ink-200 ${values.teamSize ? '' : 'text-ink-400'}`}
        >
          <option value="">Select team size</option>
          {teamSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </Field>

      <Field id={`${uid}-message`} name="message" label="Message" required error={errors.message}>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={set('message')}
          placeholder="Tell us about your business and what you'd like to see in the demo."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          className={`${fieldBase} resize-y ${errors.message ? 'border-error' : 'border-ink-200'}`}
        />
      </Field>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={!isConfigured || status === 'submitting'}
          data-analytics="demo-request"
          className="w-full sm:w-auto"
        >
          {status === 'submitting' && (
            <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" aria-hidden="true" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" className="opacity-25" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
          {status === 'submitting' ? 'Sending…' : 'Request a Demo'}
        </Button>
        <p className="text-xs leading-relaxed text-ink-500">
          We&apos;ll only use your details to respond to this enquiry.
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === 'submitting' ? 'Sending your request' : ''}
      </p>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  required,
  error,
  children,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
        {required && (
          <span className="ml-0.5 text-error" aria-hidden="true">
            *
          </span>
        )}
        {!required && <span className="ml-1.5 text-xs font-normal text-ink-400">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
