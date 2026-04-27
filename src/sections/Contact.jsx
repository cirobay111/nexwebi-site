import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.length < 2) e.name = c.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = c.errors.email;
    if (!form.message.trim() || form.message.length < 20) e.message = c.errors.message;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  };

  const inputStyle = (field) => ({
    width: '100%', padding: '13px 16px', borderRadius: 12,
    background: 'rgba(255,255,255,0.04)',
    border: errors[field] ? '1px solid rgba(251,113,133,0.5)' : '1px solid rgba(255,255,255,0.1)',
    color: '#e2e8f0', fontSize: 14, fontFamily: 'inherit', outline: 'none',
    transition: 'border-color 0.2s, background 0.2s', boxSizing: 'border-box',
  });

  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 };

  return (
    <section id="contact" style={{ position: 'relative', padding: 'clamp(64px,7vw,96px) 24px' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 700, height: 350, background: 'radial-gradient(ellipse, rgba(34,211,238,0.04) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
        <SectionHeader eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} subtitle={c.sub} />
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 24, alignItems: 'start' }} className="nw-contact-grid">
          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ padding: '16px 20px', borderRadius: 16, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', flexShrink: 0, animation: 'heroPulse 2s infinite', boxShadow: '0 0 8px #34d399' }} />
              <div>
                <div style={{ fontSize: 12.5, color: '#34d399', fontWeight: 700 }}>{c.available}</div>
                <div style={{ fontSize: 11.5, color: '#475569', marginTop: 2 }}>{c.availableSub}</div>
              </div>
            </div>
            {[
              { icon: '✉', label: c.emailLabel, content: <a href="mailto:nexwebi4@gmail.com" style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 500, textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#22d3ee'} onMouseLeave={e => e.currentTarget.style.color = '#e2e8f0'}>nexwebi4@gmail.com</a> },
              { icon: '◷', label: c.hoursLabel, content: <><div style={{ fontSize: 14, color: '#e2e8f0', fontWeight: 500 }}>{c.hoursValue}</div><div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>{c.hoursNote}</div></> },
            ].map(({ icon, label, content }) => (
              <div key={label} style={{ padding: '20px 22px', borderRadius: 18, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{icon}</div>
                  <span style={{ fontSize: 10.5, color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
                </div>
                {content}
              </div>
            ))}
            <div style={{ padding: '20px 22px', borderRadius: 18, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 10.5, color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>{c.socialLabel}</div>
              <div style={{ display: 'flex', gap: 10 }}>
                {c.socials.map(({ name, abbr, href }) => (
                  <a key={name} href={href} aria-label={name} style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'; e.currentTarget.style.background = 'rgba(34,211,238,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}>
                    {abbr}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ borderRadius: 22, padding: '36px 32px', background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center', gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#22d3ee' }}>✓</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f8fafc', marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{c.successTitle}</h3>
                <p style={{ fontSize: 14, color: '#64748b', marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, maxWidth: 280 }}>{c.successSub}</p>
                <button onClick={() => setStatus('idle')} style={{ marginTop: 8, padding: '10px 24px', borderRadius: 100, background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)', color: '#22d3ee', cursor: 'pointer', fontSize: 14, fontFamily: 'inherit', fontWeight: 600 }}>{c.sendAnother}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="nw-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>{c.labels.name} <span style={{ color: '#fb7185' }}>*</span></label>
                    <input value={form.name} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(ev => ({ ...ev, name: '' })); }} placeholder={c.placeholders.name} style={inputStyle('name')}
                      onFocus={e => { e.target.style.borderColor = 'rgba(34,211,238,0.4)'; e.target.style.background = 'rgba(34,211,238,0.04)'; }}
                      onBlur={e => { e.target.style.borderColor = errors.name ? 'rgba(251,113,133,0.5)' : 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }} />
                    {errors.name && <p style={{ fontSize: 11.5, color: '#fb7185', marginTop: 6 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>{c.labels.email} <span style={{ color: '#fb7185' }}>*</span></label>
                    <input type="email" value={form.email} onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(ev => ({ ...ev, email: '' })); }} placeholder={c.placeholders.email} style={inputStyle('email')}
                      onFocus={e => { e.target.style.borderColor = 'rgba(34,211,238,0.4)'; e.target.style.background = 'rgba(34,211,238,0.04)'; }}
                      onBlur={e => { e.target.style.borderColor = errors.email ? 'rgba(251,113,133,0.5)' : 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }} />
                    {errors.email && <p style={{ fontSize: 11.5, color: '#fb7185', marginTop: 6 }}>{errors.email}</p>}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>{c.labels.subject}</label>
                  <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder={c.placeholders.subject} style={inputStyle('subject')}
                    onFocus={e => { e.target.style.borderColor = 'rgba(34,211,238,0.4)'; e.target.style.background = 'rgba(34,211,238,0.04)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>{c.labels.message} <span style={{ color: '#fb7185' }}>*</span></label>
                  <textarea rows={5} value={form.message} onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(ev => ({ ...ev, message: '' })); }} placeholder={c.placeholders.message} style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(34,211,238,0.4)'; e.target.style.background = 'rgba(34,211,238,0.04)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.message ? 'rgba(251,113,133,0.5)' : 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    {errors.message ? <span style={{ fontSize: 11.5, color: '#fb7185' }}>{errors.message}</span> : <span />}
                    <span style={{ fontSize: 11, color: '#334155' }}>{form.message.length}/{c.counterMax}</span>
                  </div>
                </div>
                <button type="submit" disabled={status === 'loading'} style={{
                  width: '100%', padding: '15px', borderRadius: 14,
                  background: '#22d3ee', color: '#020817', border: 'none',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
                  boxShadow: '0 0 24px rgba(34,211,238,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'all 0.2s ease', opacity: status === 'loading' ? 0.7 : 1,
                }}
                onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(34,211,238,0.55)'; }}}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(34,211,238,0.4)'; }}>
                  {status === 'loading' ? (
                    <><span style={{ width: 16, height: 16, border: '2px solid rgba(2,8,23,0.3)', borderTopColor: '#020817', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} /> {c.sending}...</>
                  ) : <><span>{c.submit}</span><span>→</span></>}
                </button>
                <p style={{ textAlign: 'center', fontSize: 11.5, color: '#334155', marginTop: 14, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{c.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
