import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../context/LanguageContext';

const plans = [
  {
    name: 'Starter', price: '399', period: 'one-time',
    tagline: 'A clean, professional landing page that converts',
    accent: '#64748b', recommended: false, cta: 'Get My Landing Page',
    features: ['1 professional landing page','Mobile-first responsive design','Basic SEO setup','Contact form integration','Speed & performance optimization','Free 30-min discovery call','5-day delivery','7-day post-launch support'],
  },
  {
    name: 'Growth', price: '999', period: 'one-time',
    tagline: 'A complete website built to grow your business',
    accent: '#22d3ee', recommended: true, cta: 'Grow My Business',
    features: ['Up to 4 custom pages','Premium UI/UX design','Mobile & tablet optimization','Advanced SEO + Google Analytics','Contact & quote forms','Social media integration','Free 30-min discovery call','10-day delivery','30-day post-launch support'],
  },
  {
    name: 'Scale', price: '2,500', priceNote: '+', period: 'starting from',
    tagline: 'A custom-built platform engineered to scale',
    accent: '#818cf8', recommended: false, cta: 'Build My Platform',
    features: ['Unlimited pages & custom features','SaaS or custom platform build','User authentication & admin dashboard','Third-party API integrations','Payment processing (Stripe etc.)','Automation workflows','E-commerce functionality','Free 30-min discovery call','14-day delivery','60-day priority support'],
  },
];

function PlanCard({ plan, delay, onCta }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const { name, price, priceNote, period, tagline, accent, recommended, cta, features } = plan;
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      position: 'relative', borderRadius: 24, padding: '32px 28px',
      display: 'flex', flexDirection: 'column',
      background: recommended ? 'rgba(15,23,42,0.75)' : 'rgba(12,19,35,0.55)',
      backdropFilter: 'blur(20px)',
      border: recommended ? `2px solid ${accent}50` : hovered ? '1px solid rgba(34,211,238,0.18)' : '1px solid rgba(255,255,255,0.07)',
      boxShadow: recommended ? `0 0 60px ${accent}12, 0 8px 40px rgba(0,0,0,0.3)` : hovered ? '0 16px 50px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.15)',
      transform: visible ? (hovered && !recommended ? 'translateY(-6px)' : recommended ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(28px)',
      opacity: visible ? 1 : 0,
      transition: `all 0.4s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
    }}>
      {!recommended && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, borderRadius: '24px 24px 0 0', background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }} />}
      {recommended && (
        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', padding: '5px 16px', borderRadius: 100, background: accent, color: '#020817', fontSize: 11, fontWeight: 800, letterSpacing: '0.05em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5 }}>
          ⚡ Best Value
        </div>
      )}
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{name}</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, marginTop: 12, marginBottom: 8, marginLeft: 0, marginRight: 0, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: '#475569', marginBottom: 6 }}>$</span>
          <span style={{ fontSize: 52, fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.04em', lineHeight: 1 }}>{price}</span>
          {priceNote && <span style={{ fontSize: 15, fontWeight: 700, color: accent, marginBottom: 6 }}>{priceNote}</span>}
          <span style={{ fontSize: 13, color: '#475569', marginBottom: 6 }}>/ {period}</span>
        </div>
        <p style={{ fontSize: 13.5, color: '#64748b', marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, lineHeight: 1.5 }}>{tagline}</p>
      </div>
      <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}20, transparent)`, marginBottom: 24 }} />
      <ul style={{ flex: 1, listStyle: 'none', padding: 0, marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {features.map(feat => (
          <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ flexShrink: 0, width: 18, height: 18, borderRadius: '50%', marginTop: 1, background: `${accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 9, color: accent, fontWeight: 900 }}>✓</span>
            </div>
            <span style={{ fontSize: 13.5, color: feat.startsWith('Free') ? '#22d3ee' : '#cbd5e1', lineHeight: 1.4, fontWeight: feat.startsWith('Free') ? 600 : 400 }}>{feat}</span>
          </li>
        ))}
      </ul>
      <button onClick={onCta} style={{
        width: '100%', padding: '14px', borderRadius: 14,
        border: recommended ? 'none' : '1px solid rgba(255,255,255,0.1)',
        background: recommended ? accent : 'rgba(255,255,255,0.04)',
        color: recommended ? '#020817' : '#94a3b8',
        fontSize: 14, fontWeight: 700, cursor: 'pointer',
        fontFamily: 'inherit', letterSpacing: '-0.01em',
        boxShadow: recommended ? `0 0 24px ${accent}45` : 'none',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        if (recommended) { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = `0 0 36px ${accent}65`; }
        else { e.currentTarget.style.borderColor = `${accent}35`; e.currentTarget.style.color = accent; }
      }}
      onMouseLeave={e => {
        if (recommended) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 0 24px ${accent}45`; }
        else { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#94a3b8'; }
      }}>
        {cta}
      </button>
    </div>
  );
}

export default function Pricing() {
  const { t } = useLanguage();
  const p = t.pricing;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };
  return (
    <section id="pricing" style={{ position: 'relative', padding: 'clamp(80px,10vw,140px) 24px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', right: '20%', width: 500, height: 400, background: 'radial-gradient(ellipse, rgba(129,140,248,0.04) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: 450, height: 350, background: 'radial-gradient(ellipse, rgba(34,211,238,0.04) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%' }} />
      </div>
      <div style={{ maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
        <SectionHeader eyebrow={p.eyebrow} title={p.title} highlight={p.highlight} subtitle={p.sub} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 52 }}>
          {p.guarantees.map(g => (
            <div key={g} style={{ fontSize: 13, color: '#64748b' }}>{g}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, alignItems: 'start' }}>
          {plans.map((plan, i) => <PlanCard key={plan.name} plan={plan} delay={i * 0.1} onCta={scrollToContact} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 100, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.18)', fontSize: 12.5, color: '#34d399' }}>
            {p.badge}
          </div>
          <p style={{ fontSize: 14, color: '#475569', marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
            {p.customNote}{' '}
            <button onClick={scrollToContact} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#22d3ee', fontSize: 14, fontFamily: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3, padding: 0 }}>
              {p.customLink}
            </button>
            {' '}{p.customEnd}
          </p>
        </div>
      </div>
    </section>
  );
}
