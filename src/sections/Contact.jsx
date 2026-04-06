import { useState, useCallback } from 'react';
import LegalModal from '../components/LegalModal';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, Linkedin, Youtube, Clock } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import InstagramIcon from '../components/InstagramIcon';
import { useLanguage } from '../i18n/index.jsx';

/* --- Input sanitization (XSS prevention, client-side) --- */
function sanitize(str) {
  return str.replace(/[<>"'`]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '`': '&#x60;' }[c]));
}

function validateEmail(email) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}

const SOCIAL_LINKS = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/nexwebi/' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };
const INITIAL_ERRORS = { name: '', email: '', message: '' };

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [lastSubmit, setLastSubmit] = useState(0);
  const [legalModal, setLegalModal] = useState(null);

  const validate = useCallback(() => {
    const errs = { name: '', email: '', message: '' };
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.';
    if (!validateEmail(form.email)) errs.email = 'Please enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters.';
    setErrors(errs);
    return !errs.name && !errs.email && !errs.message;
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const maxLengths = { name: 100, email: 254, subject: 200, message: 2000 };
    if (value.length > (maxLengths[name] ?? 500)) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const now = Date.now();
    if (now - lastSubmit < 60_000) {
      setErrors((prev) => ({ ...prev, message: 'Please wait 1 minute before submitting again.' }));
      return;
    }

    setStatus('loading');

    const payload = {
      name: sanitize(form.name.trim()),
      email: sanitize(form.email.trim()),
      subject: sanitize(form.subject.trim()),
      message: sanitize(form.message.trim()),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setStatus('success');
      setLastSubmit(Date.now());
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus(err?.message || 'error');
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-white/5 border text-slate-200 placeholder-slate-600 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/50 ${
      errors[field] ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
    }`;

  return (
    <section
      id="contact"
      className="relative section-padding"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-400/4 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={c.eyebrow}
          title={c.title}
          highlight={c.highlight}
          subtitle={c.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Response time badge */}
              <div className="glass-card rounded-xl p-4 flex items-center gap-3 border-green-400/15">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <div>
                  <p className="text-xs text-green-400 font-semibold">{c.available}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{c.responseTime}</p>
                </div>
              </div>

              {/* Email card */}
              <div className="glass-card rounded-2xl p-6 group hover:border-cyan-400/25 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">{c.email}</span>
                </div>
                <a
                  href="mailto:nexwebi4@gmail.com"
                  className="text-slate-200 font-medium hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  nexwebi4@gmail.com
                </a>
              </div>

              {/* Chat / hours card */}
              <div className="glass-card rounded-2xl p-6 group hover:border-cyan-400/25 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">{c.hours}</span>
                </div>
                <p className="text-sm text-slate-300 font-medium">{c.hoursValue}</p>
                <p className="text-xs text-slate-500 mt-1">{c.hoursNote}</p>
              </div>

              {/* Social links */}
              <div className="glass-card rounded-2xl p-6">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-4">{c.followUs}</p>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/8 transition-all duration-200"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-5 sm:p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-cyan-400" aria-label="Success" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{c.successTitle}</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    {c.successMsg}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 transition-all duration-200"
                  >
                    {c.send}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                        {c.nameLabel} <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass('name')}
                        placeholder={c.namePlaceholder}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                        {c.emailLabel} <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass('email')}
                        placeholder={c.emailPlaceholder}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-4">
                    <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      {c.subjectLabel}
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass('subject')}
                      placeholder={c.subjectPlaceholder}
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label htmlFor="contact-message" className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                      {c.messageLabel} <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass('message')} resize-none`}
                      placeholder={c.messagePlaceholder}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    <div className="flex items-center justify-between mt-1.5">
                      {errors.message ? (
                        <p id="message-error" className="text-xs text-red-400 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.message}
                        </p>
                      ) : <span />}
                      <span className="text-xs text-slate-600">{form.message.length}/2000</span>
                    </div>
                  </div>

                  {/* Error banner */}
                  {status !== 'idle' && status !== 'loading' && status !== 'success' && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex items-center gap-2" role="alert">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      Error: {status}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="shimmer-btn w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                    style={{
                      backgroundColor: '#22d3ee',
                      color: '#020817',
                      boxShadow: '0 0 20px rgba(34,211,238,0.35)',
                    }}
                    aria-busy={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-navy-950/30 border-t-navy-950 animate-spin" aria-hidden="true" />
                        {c.sending}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        {c.send}
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-center text-xs text-slate-600">
                    {c.privacy}{' '}
                    <button onClick={() => setLegalModal('privacy')} className="text-slate-400 hover:text-cyan-400 transition-colors underline">{c.privacyLink}</button>.{' '}
                    {c.privacyNote}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    </section>
  );
}
