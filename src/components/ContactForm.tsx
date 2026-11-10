import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { INQUIRY_TOPICS, submitContactInquiry, type InquiryTopic } from '@/lib/contact';

type FormState = {
  name: string;
  email: string;
  topic: InquiryTopic;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM: FormState = { name: '', email: '', topic: 'general', message: '' };

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Please tell us your name.';
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Please enter a valid email address.';
  if (form.message.trim().length < 10) errors.message = 'Please write at least 10 characters so we can help.';
  return errors;
}

const fieldClass =
  'w-full rounded-xl border bg-white px-4 py-3.5 text-charcoal placeholder:text-charcoal/40 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-teal/20';

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const borderFor = (key: keyof FormState) => (errors[key] ? 'border-coral' : 'border-navy/15 focus:border-teal');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('submitting');
    try {
      await submitContactInquiry(form);
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error('Contact inquiry failed', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-xl shadow-navy/10 ring-1 ring-navy/5 animate-fade-up">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 text-teal">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h3 className="mt-6 font-display text-3xl font-bold uppercase text-navy">Message received</h3>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-charcoal/75">
          Thanks for getting in touch. The crew will reply to your email as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 rounded-full border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors duration-200 hover:border-teal hover:text-ocean"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-white p-6 shadow-xl shadow-navy/10 ring-1 ring-navy/5 sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-navy">Your name</span>
          <input
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Jane Angler"
            aria-invalid={Boolean(errors.name)}
            className={`${fieldClass} ${borderFor('name')}`}
          />
          {errors.name && <span className="text-sm text-coral-600">{errors.name}</span>}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-navy">Email address</span>
          <input
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            className={`${fieldClass} ${borderFor('email')}`}
          />
          {errors.email && <span className="text-sm text-coral-600">{errors.email}</span>}
        </label>
      </div>

      <label className="mt-6 flex flex-col gap-2">
        <span className="text-sm font-semibold text-navy">What can we help with?</span>
        <select
          value={form.topic}
          onChange={(e) => updateField('topic', e.target.value as InquiryTopic)}
          className={`${fieldClass} ${borderFor('topic')} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230077A8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          {INQUIRY_TOPICS.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-6 flex flex-col gap-2">
        <span className="text-sm font-semibold text-navy">Message</span>
        <textarea
          rows={6}
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Tell us what you're planning, what you're after or what you'd like to know."
          aria-invalid={Boolean(errors.message)}
          className={`${fieldClass} ${borderFor('message')} resize-y`}
        />
        {errors.message && <span className="text-sm text-coral-600">{errors.message}</span>}
      </label>

      {status === 'error' && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl bg-coral/10 p-4 text-sm text-charcoal ring-1 ring-coral/30"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-coral-600" />
          <span>We couldn't send your message just now. Please check your connection and try again.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-8 py-4 text-base font-semibold text-white shadow-lg shadow-coral/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send message
            <Send className="h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}
