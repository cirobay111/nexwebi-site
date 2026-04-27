import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../context/LanguageContext';

const visualMeta = [
  { avatar: 'SM', accent: '#22d3ee', featured: true },
  { avatar: 'JO', accent: '#818cf8' },
  { avatar: 'EM', accent: '#34d399' },
  { avatar: 'DP', accent: '#f59e0b' },
  { avatar: 'AD', accent: '#fb7185' },
];

const statValues = ['5.0', '50+', '98%', '0'];

function TestimonialCard({ t }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      position: 'relative', borderRadius: 20, padding: '24px 24px',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(16px)',
      border: hovered ? '1px solid rgba(34,211,238,0.15)' : '1px solid rgba(255,255,255,0.07)',
      boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.25)' : 'none',
      transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'all 0.25s ease',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: hovered ? `linear-gradient(90deg, transparent, ${t.accent}45, transparent)` : 'transparent', transition: 'background 0.3s ease' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{ color: '#f59e0b', fontSize: 11.5, letterSpacing: 2 }}>★★★★★</div>
        <span style={{ fontSize: 28, color: t.accent, opacity: 0.12, lineHeight: 1, fontFamily: 'Georgia,serif' }}>"</span>
      </div>
      <blockquote style={{ flex: 1, fontSize: 13.5, color: '#94a3b8', lineHeight: 1.7, marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 18, fontStyle: 'normal' }}>"{t.feedback}"</blockquote>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: `${t.accent}12`, border: `1px solid ${t.accent}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: t.accent }}>{t.avatar}</div>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#f1f5f9' }}>{t.name}</div>
          <div style={{ fontSize: 11.5, color: '#475569', marginTop: 1 }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const tr = t.testimonials;
  const items = tr.items.map((it, i) => ({ ...it, ...visualMeta[i] }));
  const featured = items.find(t => t.featured);
  const rest = items.filter(t => !t.featured);

  return (
    <section id="testimonials" style={{ position: 'relative', padding: 'clamp(64px,7vw,96px) 24px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(34,211,238,0.025) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
        <SectionHeader eyebrow={tr.eyebrow} title={tr.title} highlight={tr.highlight} subtitle={tr.sub} />

        {/* Stats row — fixed: separated margin/maxWidth */}
        <div style={{ maxWidth: 680, marginLeft: 'auto', marginRight: 'auto', marginBottom: 52 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }} className="nw-stats-grid">
            {statValues.map((value, i) => (
              <div key={i} style={{ padding: '18px 16px', borderRadius: 16, textAlign: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.04em', background: 'linear-gradient(135deg,#22d3ee,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: 10.5, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{tr.statsLabels[i]}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }} className="nw-testimonials-grid">
          {/* Featured */}
          <div style={{
            gridRow: 'span 2', position: 'relative', borderRadius: 22, padding: 32,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(20px)',
            border: `1px solid ${featured.accent}28`, boxShadow: `0 0 60px ${featured.accent}08`,
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${featured.accent}60, transparent)` }} />
            <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 80, color: featured.accent, opacity: 0.07, lineHeight: 1, fontFamily: 'Georgia, serif', userSelect: 'none' }}>"</div>
            <div style={{ color: '#f59e0b', fontSize: 13, letterSpacing: 2, marginBottom: 24 }}>★★★★★</div>
            <blockquote style={{ flex: 1, fontSize: 17, color: '#e2e8f0', lineHeight: 1.7, fontWeight: 300, fontStyle: 'italic', marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>"{featured.feedback}"</blockquote>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, marginTop: 24, marginBottom: 16, alignSelf: 'flex-start', background: `${featured.accent}12`, color: featured.accent, border: `1px solid ${featured.accent}25`, fontSize: 11.5, fontWeight: 700 }}>{tr.featuredBadge}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0, background: `${featured.accent}15`, border: `1px solid ${featured.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: featured.accent }}>{featured.avatar}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>{featured.name}</div>
                <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{featured.role}</div>
              </div>
            </div>
          </div>
          {rest.map(testimonial => <TestimonialCard key={testimonial.name} t={testimonial} />)}
        </div>
      </div>
    </section>
  );
}
