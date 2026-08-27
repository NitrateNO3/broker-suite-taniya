import { LogoMark } from '@/components/Logo';

/**
 * Illustrative renderings of the BrokrSuite app UI, used until real product
 * screenshots are available. Everything here is layout, not live data — swap
 * these for exported screenshots by replacing the component body.
 */

export type ScreenVariant = 'dashboard' | 'properties' | 'leads' | 'clients' | 'followups' | 'team';

const statusStyles: Record<string, string> = {
  Available: 'bg-success/10 text-success',
  'Under Offer': 'bg-warning/10 text-warning',
  Sold: 'bg-ink-200 text-ink-600',
  New: 'bg-brand-100 text-brand-700',
  Contacted: 'bg-warning/10 text-warning',
  Qualified: 'bg-success/10 text-success',
  Today: 'bg-error/10 text-error',
  Tomorrow: 'bg-brand-100 text-brand-700',
};

function Chip({ label }: { label: string }) {
  return (
    <span className={`shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.5625rem] font-semibold ${statusStyles[label] ?? 'bg-ink-100 text-ink-600'}`}>
      {label}
    </span>
  );
}

function ScreenHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-2.5 bg-white px-4 pb-3 pt-2">
      <LogoMark className="h-6 w-6" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.6875rem] font-bold leading-tight text-ink-950">{title}</p>
        {sub && <p className="truncate text-[0.5625rem] leading-tight text-ink-400">{sub}</p>}
      </div>
      <span className="h-5 w-5 rounded-full bg-brand-100" aria-hidden="true" />
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg bg-white p-2.5 shadow-xs ring-1 ring-ink-100">{children}</div>;
}

function Row({
  title,
  meta,
  status,
  accent = false,
}: {
  title: string;
  meta: string;
  status?: string;
  accent?: boolean;
}) {
  return (
    <Card>
      <div className="flex items-start gap-2.5">
        <span
          className={`mt-0.5 h-8 w-8 shrink-0 rounded-md ${accent ? 'bg-brand-100' : 'bg-ink-100'}`}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.625rem] font-semibold leading-tight text-ink-900">{title}</p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="truncate text-[0.5625rem] leading-tight text-ink-400">{meta}</p>
            {status && <Chip label={status} />}
          </div>
        </div>
      </div>
    </Card>
  );
}

function Metric({ value, label, delta }: { value: string; label: string; delta?: string }) {
  return (
    <div className="rounded-lg bg-white p-2.5 shadow-xs ring-1 ring-ink-100">
      <p className="text-[0.5625rem] font-medium uppercase tracking-wide text-ink-400">{label}</p>
      <p className="mt-1 text-base font-bold leading-none text-ink-950">{value}</p>
      {delta && <p className="mt-1 text-[0.5625rem] font-medium text-success">{delta}</p>}
    </div>
  );
}

export function AppScreen({ variant }: { variant: ScreenVariant }) {
  if (variant === 'dashboard') {
    return (
      <div className="h-full bg-ink-50">
        <ScreenHeader title="Dashboard" sub="Sharma Properties" />
        <div className="space-y-2 px-3 py-2.5">
          <div className="grid grid-cols-2 gap-2">
            <Metric value="128" label="Properties" delta="+6 this week" />
            <Metric value="41" label="Active Leads" delta="+9 this week" />
            <Metric value="12" label="Closed Deals" />
            <Metric value="7" label="Follow-Ups" />
          </div>

          <Card>
            <p className="text-[0.5625rem] font-semibold uppercase tracking-wide text-ink-400">Sales Pipeline</p>
            <div className="mt-2 flex h-14 items-end gap-1.5" aria-hidden="true">
              {[38, 55, 44, 68, 52, 80, 62].map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-sm ${i === 5 ? 'bg-brand-600' : 'bg-brand-200'}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-[0.5625rem] font-semibold uppercase tracking-wide text-ink-400">Team Performance</p>
            <div className="mt-2 space-y-1.5">
              {[
                ['Ravi K.', 82],
                ['Neha S.', 64],
                ['Arjun M.', 47],
              ].map(([name, pct]) => (
                <div key={name as string} className="flex items-center gap-2">
                  <span className="w-12 shrink-0 text-[0.5625rem] text-ink-600">{name}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100" aria-hidden="true">
                    <span className="block h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (variant === 'properties') {
    return (
      <div className="h-full bg-ink-50">
        <ScreenHeader title="Properties" sub="128 listings" />
        <div className="px-3 pb-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-ink-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 text-ink-300" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" strokeLinecap="round" />
            </svg>
            <span className="text-[0.5625rem] text-ink-400">Search properties…</span>
          </div>
          <div className="mt-2 flex gap-1.5">
            {['All', 'Residential', 'Commercial'].map((f, i) => (
              <span
                key={f}
                className={`rounded-md px-2 py-1 text-[0.5625rem] font-medium ${
                  i === 0 ? 'bg-brand-600 text-white' : 'bg-white text-ink-500 ring-1 ring-ink-100'
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2 px-3">
          <Row title="3 BHK · Green Valley" meta="Sector 62 · ₹92L" status="Available" accent />
          <Row title="Office · Tower B" meta="Cyber City · ₹2.4Cr" status="Under Offer" />
          <Row title="2 BHK · Palm Residency" meta="Sector 45 · ₹68L" status="Available" />
          <Row title="Plot · Sunrise Enclave" meta="Sector 88 · ₹1.4Cr" status="Available" />
          <Row title="Retail · Main Road" meta="Sector 18 · ₹1.1Cr" status="Sold" />
        </div>
      </div>
    );
  }

  if (variant === 'leads') {
    return (
      <div className="h-full bg-ink-50">
        <ScreenHeader title="Leads" sub="41 active" />
        <div className="space-y-2 px-3 py-2.5">
          <div className="grid grid-cols-3 gap-1.5">
            {[
              ['New', '14'],
              ['Contacted', '19'],
              ['Qualified', '8'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-white p-2 text-center shadow-xs ring-1 ring-ink-100">
                <p className="text-sm font-bold leading-none text-ink-950">{value}</p>
                <p className="mt-1 text-[0.5rem] text-ink-400">{label}</p>
              </div>
            ))}
          </div>
          <Row title="Priya Menon" meta="Website · Ravi K." status="New" accent />
          <Row title="Ankit Verma" meta="Referral · Neha S." status="Contacted" />
          <Row title="Sunita Rao" meta="Walk-in · Ravi K." status="Qualified" />
          <Row title="Imran Sheikh" meta="Portal · Arjun M." status="Contacted" />
          <Row title="Kavita Nair" meta="Website · Neha S." status="New" />
        </div>
      </div>
    );
  }

  if (variant === 'clients') {
    return (
      <div className="h-full bg-ink-50">
        <ScreenHeader title="Client Profile" sub="Priya Menon" />
        <div className="space-y-2 px-3 py-2.5">
          <Card>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-[0.625rem] font-bold text-brand-700">
                PM
              </span>
              <div>
                <p className="text-[0.6875rem] font-semibold text-ink-950">Priya Menon</p>
                <p className="text-[0.5625rem] text-ink-400">+91 •••• ••4821</p>
              </div>
            </div>
          </Card>
          <Card>
            <p className="text-[0.5625rem] font-semibold uppercase tracking-wide text-ink-400">Requirements</p>
            <dl className="mt-2 space-y-1.5">
              {[
                ['Budget', '₹80L – ₹1Cr'],
                ['Locations', 'Sector 62, 45'],
                ['Type', '3 BHK Apartment'],
                ['Timeline', 'Within 3 months'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <dt className="text-[0.5625rem] text-ink-400">{k}</dt>
                  <dd className="text-[0.5625rem] font-medium text-ink-800">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card>
            <p className="text-[0.5625rem] font-semibold uppercase tracking-wide text-ink-400">Communication</p>
            <div className="mt-2 space-y-2">
              {[
                ['Site visit scheduled', '2 days ago'],
                ['Shared 3 listings', '5 days ago'],
              ].map(([t, when]) => (
                <div key={t} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.5625rem] font-medium text-ink-800">{t}</p>
                    <p className="text-[0.5rem] text-ink-400">{when}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (variant === 'followups') {
    return (
      <div className="h-full bg-ink-50">
        <ScreenHeader title="Follow-Ups" sub="7 upcoming" />
        <div className="space-y-2 px-3 py-2.5">
          <div className="rounded-lg bg-brand-600 p-3 text-white">
            <p className="text-[0.5625rem] font-medium uppercase tracking-wide text-brand-100">Due today</p>
            <p className="mt-1 text-lg font-bold leading-none">3 follow-ups</p>
          </div>
          <Row title="Call Priya Menon" meta="Green Valley visit" status="Today" accent />
          <Row title="Send docs to Ankit" meta="Agreement draft" status="Today" />
          <Row title="Call Sunita Rao" meta="Budget confirmation" status="Tomorrow" />
          <Card>
            <p className="text-[0.5625rem] font-semibold uppercase tracking-wide text-ink-400">Completed</p>
            <div className="mt-2 space-y-1.5">
              {['Called Imran Sheikh', 'Shared listings with Ravi', 'Site visit with Kavita'].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-2.5 w-2.5 text-success" aria-hidden="true">
                    <path d="M4 12.5l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[0.5625rem] text-ink-400 line-through">{t}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-ink-50">
      <ScreenHeader title="Team" sub="6 members" />
      <div className="space-y-2 px-3 py-2.5">
        {[
          ['Ravi Kulkarni', 'Senior Agent · 18 leads', 'RK'],
          ['Neha Sharma', 'Agent · 12 leads', 'NS'],
          ['Arjun Mehta', 'Agent · 11 leads', 'AM'],
          ['Divya Iyer', 'Agent · 9 leads', 'DI'],
        ].map(([name, meta, initials]) => (
          <Card key={name}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[0.5625rem] font-bold text-brand-700">
                {initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.625rem] font-semibold text-ink-900">{name}</p>
                <p className="truncate text-[0.5625rem] text-ink-400">{meta}</p>
              </div>
            </div>
          </Card>
        ))}
        <Card>
          <p className="text-[0.5625rem] font-semibold uppercase tracking-wide text-ink-400">Assigned this week</p>
          <div className="mt-2 flex h-12 items-end gap-1.5" aria-hidden="true">
            {[45, 70, 55, 85, 60].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-brand-300" style={{ height: `${h}%` }} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
