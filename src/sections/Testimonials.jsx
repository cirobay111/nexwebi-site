import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';

const testimonials = [
  { name: 'Sarah Mitchell', role: 'CEO · CloudVenture Inc.', feedback: 'NexWebi transformed our vision into a world-class SaaS platform. Their technical depth, attention to detail, and speed of execution are genuinely remarkable. We launched 40% under budget.', rating: 5, avatar: 'SM', accent: '#22d3ee', featured: true },
  { name: 'James Okafor', role: 'CTO · Logix Automation', feedback: 'The automation systems they built eliminated 70% of our manual work overnight. The team understood our business logic deeply and delivered something that feels tailor-made.', rating: 5, avatar: 'JO', accent: '#818cf8' },
  { name: 'Elena Marchetti', role: 'Founder · LuxRetail Group', feedback: "Our e-commerce revenue increased 3x in the first quarter after launch. NexWebi didn't just build a store — they engineered a conversion machine.", rating: 5, avatar: 'EM', accent: '#34d399' },
  { name: 'David Park', role: 'Head of Product · Nexus Digital', feedback: 'Working with NexWebi felt like having a senior engineering team embedded in our company. Fast communication, zero compromises on quality.', rating: 5, avatar: 'DP', accent: '#f59e0b' },
  { name: 'Amara Diallo', role: 'Operations Director · Scale AI Labs', feedback: 'The AI integration they built for our platform is genuinely cutting-edge. They navigated complex ML infrastructure as if it were second nature.', rating: 5, avatar: 'AD', accent: '#fb7185' },
];

const stats = [
  { value: '5.0', label: 'Average Rating' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '0', label: 'Missed Deadlines' },
];

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
      <blockquote style={{ flex: 1, fontSize: 13.5, color: '#94a3b8', lineHeight: 1.7, margin: '0 0 18px', fontStyle: 'normal' }}>"{t.feedback}"</blockquote>
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
  const featured = testimonials.find(t => t.featured);
  const rest = testimonials.filter(t => !t.featured);
  return (
    <section id="testimonials" style={{ position: 'relative', padding: 'clamp(80px,10vw,140px) 24px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(34,211,238,0.025) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader eyebrow="Client Stories" title="What Our" highlight="Clients Say" subtitle="Real feedback from businesses that trusted us to build their digital products." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 52, maxWidth: 680, margin: '0 auto 52px' }} className="nw-stats-grid">
          {stats.map(({ value, label }) => (
            <div key={label} style={{ padding: '18px 16px', borderRadius: 16, textAlign: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.04em', background: 'linear-gradient(135deg,#22d3ee,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 10.5, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
            </div>
          ))}
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
            <blockquote style={{ flex: 1, fontSize: 17, color: '#e2e8f0', lineHeight: 1.7, fontWeight: 300, fontStyle: 'italic', margin: 0 }}>"{featured.feedback}"</blockquote>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, marginTop: 24, marginBottom: 16, alignSelf: 'flex-start', background: `${featured.accent}12`, color: featured.accent, border: `1px solid ${featured.accent}25`, fontSize: 11.5, fontWeight: 700 }}>✓ Launched 40% under budget</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0, background: `${featured.accent}15`, border: `1px solid ${featured.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: featured.accent }}>{featured.avatar}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>{featured.name}</div>
                <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{featured.role}</div>
              </div>
            </div>
          </div>
          {rest.map(t => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </div>
    </section>
  );
}
