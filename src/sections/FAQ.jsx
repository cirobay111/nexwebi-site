import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../context/LanguageContext';


function FAQItem({ q, a, last }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
      <button onClick={() => setOpen(v => !v)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
        textAlign: 'left', fontFamily: 'inherit',
      }}>
        <span style={{ fontSize: 14.5, fontWeight: 600, color: open ? '#a5f3fc' : '#f1f5f9', lineHeight: 1.4, transition: 'color 0.2s', paddingRight: 8 }}>{q}</span>
        <div style={{
          flexShrink: 0, width: 30, height: 30, borderRadius: 9,
          background: open ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.05)',
          border: open ? '1px solid rgba(34,211,238,0.3)' : '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: open ? '#22d3ee' : '#64748b',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'all 0.25s ease',
        }}>+</div>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? 300 : 0, opacity: open ? 1 : 0, transition: 'max-height 0.3s cubic-bezier(0.25,0.1,0.25,1), opacity 0.25s ease' }}>
        <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.75, paddingBottom: 20, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLanguage();
  const f = t.faq;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };
  return (
    <section id="faq" style={{ position: 'relative', padding: 'clamp(64px,7vw,96px) 24px' }}>
      <div style={{ position: 'absolute', bottom: '10%', right: '25%', width: 400, height: 300, background: 'radial-gradient(ellipse, rgba(129,140,248,0.04) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
        <SectionHeader eyebrow={f.eyebrow} title={f.title} highlight={f.highlight} subtitle={f.sub} />
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 24, alignItems: 'start' }} className="nw-contact-grid">
          <div style={{ position: 'sticky', top: 96 }}>
            <div style={{ padding: '32px 28px', borderRadius: 22, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#f8fafc', marginBottom: 12, letterSpacing: '-0.03em' }}>{f.stillQ}</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 24 }}>{f.stillA}</p>
              <button onClick={scrollToContact} style={{
                width: '100%', padding: '13px', borderRadius: 14,
                background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.25)',
                color: '#22d3ee', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.08)'; }}>
                {f.cta}
              </button>
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <p style={{ fontSize: 10.5, color: '#334155', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>{f.responseLabel}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22d3ee', animation: 'heroPulse 2s infinite', boxShadow: '0 0 6px #22d3ee' }} />
                  <span style={{ fontSize: 14, color: '#e2e8f0', fontWeight: 500 }}>{f.responseValue}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderRadius: 22, overflow: 'hidden', background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 32px' }}>
            {f.items.map((item, i) => <FAQItem key={item.q} {...item} last={i === f.items.length - 1} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
