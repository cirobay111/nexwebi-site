import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const statValues = ['50+', '98%', '5×', '24/7'];

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const anim = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.8s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, transform 0.8s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
  });

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '120px 24px 80px',
    }}>
      {/* Background */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(34,211,238,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.022) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', top: '30%', left: '15%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(129,140,248,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '10%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34,211,238,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(to top, #020817, transparent)' }} />
        {[...Array(18)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${10 + (i * 73 + 17) % 80}%`,
            top: `${5 + (i * 47 + 23) % 85}%`,
            width: i % 3 === 0 ? 2.5 : 1.5,
            height: i % 3 === 0 ? 2.5 : 1.5,
            borderRadius: '50%',
            background: i % 4 === 0 ? '#818cf8' : '#22d3ee',
            opacity: 0.25 + (i % 4) * 0.1,
            animation: `floatParticle ${5 + (i % 4) * 2}s ease-in-out infinite`,
            animationDelay: `${(i * 0.4) % 4}s`,
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        {/* Badge */}
        <div style={{ ...anim(0), display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px 6px 8px', borderRadius: 100, background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.18)', marginBottom: 36 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 8px #22d3ee', animation: 'heroPulse 2s infinite', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: '#22d3ee', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h.badge}</span>
        </div>

        {/* Headline */}
        <h1 style={{ ...anim(0.1), marginTop: 0, marginBottom: 24, lineHeight: 1.03, letterSpacing: '-0.04em' }}>
          <span style={{ display: 'block', fontSize: 'clamp(52px, 9vw, 96px)', fontWeight: 800, color: '#f8fafc' }}>{h.line1}</span>
          <span style={{ display: 'block', fontSize: 'clamp(52px, 9vw, 96px)', fontWeight: 800, background: 'linear-gradient(135deg, #22d3ee 0%, #67e8f9 45%, #a5f3fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 0 40px rgba(34,211,238,0.3))' }}>{h.line2}</span>
          <span style={{ display: 'block', fontSize: 'clamp(52px, 9vw, 96px)', fontWeight: 800, color: '#f8fafc' }}>{h.line3}</span>
        </h1>

        {/* Sub */}
        <p style={{ ...anim(0.2), maxWidth: 580, marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: 44, fontSize: 'clamp(16px, 2vw, 19px)', color: '#64748b', lineHeight: 1.7, fontWeight: 400, letterSpacing: '-0.01em' }}>
          {h.sub}
        </p>

        {/* CTAs */}
        <div style={{ ...anim(0.3), display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 48 }}>
          <button onClick={() => scrollTo('contact')} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 32px', borderRadius: 100,
            background: '#22d3ee', color: '#020817',
            border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
            boxShadow: '0 0 32px rgba(34,211,238,0.45), 0 4px 16px rgba(0,0,0,0.3)',
            transition: 'all 0.25s cubic-bezier(0.25,0.1,0.25,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04) translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(34,211,238,0.6), 0 8px 24px rgba(0,0,0,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(34,211,238,0.45), 0 4px 16px rgba(0,0,0,0.3)'; }}>
            {h.cta1} <span style={{ fontSize: 16 }}>→</span>
          </button>
          <button onClick={() => scrollTo('portfolio')} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '13px 28px', borderRadius: 100,
            background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.25)',
            color: '#22d3ee', cursor: 'pointer', fontSize: 15, fontWeight: 500, fontFamily: 'inherit',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.12)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.06)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.25)'; }}>
            {h.cta2}
          </button>
        </div>

        {/* Trust bar */}
        <div style={{ ...anim(0.35), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 52, fontSize: 12.5, color: '#475569', flexWrap: 'wrap' }}>
          <span style={{ color: '#f59e0b', letterSpacing: 1 }}>★★★★★</span>
          <span>{h.trust}</span>
        </div>

        {/* Stats */}
        <div style={{ ...anim(0.4), display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }} className="nw-stats-grid">
          {statValues.map((value, i) => (
            <div key={i} style={{
              padding: '20px 16px', borderRadius: 18,
              background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em', background: 'linear-gradient(135deg,#22d3ee,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 10.5, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>{h.stats[i]}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatParticle { 0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; } 50% { transform: translateY(-18px) scale(1.2); opacity: 0.6; } }
        @keyframes heroPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
      `}</style>
    </section>
  );
}
