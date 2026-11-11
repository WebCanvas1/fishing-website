import { useState, type FormEvent } from 'react';

const inputClass = 'mt-2 w-full rounded-xl border border-navy/20 px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-ocean';

export default function MembershipForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending' || status === 'sent') return;

    const data = new FormData(event.currentTarget);
    setStatus('sending');

    try {
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (response.status !== 201) throw new Error('Enquiry could not be saved.');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 text-navy sm:p-8">
      <h3 id="membership-form-title" className="font-display text-2xl font-bold">Register your interest</h3>
      {status === 'sent' ? (
        <p role="status" className="mt-4">Thanks! We received your membership enquiry.</p>
      ) : (
        <form aria-labelledby="membership-form-title" onSubmit={submit} className="mt-4 space-y-4">
          <p>Leave your details so we can contact you about membership.</p>
          <fieldset disabled={status === 'sending'} className="space-y-4">
            <label className="block text-sm font-semibold">
              Full name
              <input name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" className={inputClass} />
            </label>
            <label className="block text-sm font-semibold">
              Email address
              <input name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} />
            </label>
            <label className="block text-sm font-semibold">
              Message (optional)
              <textarea name="notes" rows={3} maxLength={1900} className={inputClass} />
            </label>
            <button type="submit" className="rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-ocean disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send membership enquiry'}
            </button>
          </fieldset>
          {status === 'error' && (
            <p role="alert" className="text-sm text-coral-600">We couldn’t send your enquiry. Please try again later.</p>
          )}
        </form>
      )}
    </div>
  );
}
