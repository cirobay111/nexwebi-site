import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../context/LanguageContext';

const services = [
  { title: 'Web Design & Development', description: 'Pixel-perfect, responsive websites engineered for performance. From landing pages to complex web apps — built with modern stacks.', tag: 'Most Requested', color: '#22d3ee', icon: '◈' },
  { title: 'Automation Systems', description: 'Eliminate repetitive tasks with intelligent automation pipelines. Integrate APIs, automate workflows, and scale operations effortlessly.', tag: null, color: '#818cf8', icon: '⟳' },
  { title: 'SaaS Development', description: 'Full-stack SaaS platforms with robust authentication, billing, multi-tenancy, and analytics — built to acquire and retain users.', tag: null, color: '#34d399', icon: '◫' },
  { title: 'E-commerce Solutions', description: 'High-converting online stores with seamless checkout, inventory management, and custom integrations for your business model.', tag: null, color: '#f59e0b', icon: '◻' },
  { title: 'Performance Optimization', description: 'Boost Core Web Vitals, improve SEO rankings, and eliminate performance bottlenecks. Real results measured in conversions.', tag: null, color: '#fb7185', icon: '◬' },
  { title: 'AI Integration', description: 'Embed large language models, computer vision, and intelligent agents directly into your products — from chatbots to predictive analytics.', tag: 'New', color: '#a78bfa', icon: '✦' },
];

function ServiceCard({ title, description, tag, color, icon, delay }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      position: 'relative', padding: 28, borderRadius: 22, cursor: 'default', overflow: 'hidden',
      background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(20px)',
      border: hovered ? '1px solid rgba(34,211,238,0.2)' : '1px solid rgba(255,255,255,0.07)',
      boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${color}15` : '0 4px 20px rgba(0,0,0,0.15)',
      transform: visible ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(24px)',
      opacity: visible ? 1 : 0,
      transition: `transform 0.35s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, opacity 0.5s ease ${delay}s, box-shadow 0.3s ease, border-color 0.3s ease`,
    }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 22, background: hovered ? `radial-gradient(circle at 50% 0%, ${color}10 0%, transparent 60%)` : 'transparent', transition: 'background 0.4s ease', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: hovered ? `linear-gradient(90deg, transparent, ${color}70, transparent)` : 'transparent', transition: 'background 0.35s ease' }} />
      {tag && (
        <div style={{ position: 'absolute', top: 18, right: 18, padding: '3px 10px', borderRadius: 100, background: `${color}15`, color, border: `1px solid ${color}30`, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.05em' }}>{tag}</div>
      )}
      <div style={{
        width: 48, height: 48, borderRadius: 14, marginBottom: 20,
        background: `${color}12`, border: `1px solid ${color}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color,
        transform: hovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.25s ease',
      }}>{icon}</div>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: hovered ? '#a5f3fc' : '#f1f5f9', marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.3, transition: 'color 0.2s' }}>{title}</h3>
      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{description}</p>
      <div style={{ marginTop: 20, fontSize: 12.5, fontWeight: 600, color, display: 'flex', alignItems: 'center', gap: 4, opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(4px)', transition: 'all 0.2s ease' }}>
        <span>Learn more</span>
        <span style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.2s', display: 'inline-block' }}>→</span>
      </div>
    </div>
  );
}

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;
  return (
    <section id="services" style={{ position: 'relative', padding: 'clamp(64px,7vw,96px) 24px' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(34,211,238,0.035) 0%, transparent 70%)', filter: 'blur(40px)', borderRadius: '50%' }} />
      </div>
      <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
        <SectionHeader eyebrow={s.eyebrow} title={s.title} highlight={s.highlight} subtitle={s.sub} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {services.map((svc, i) => <ServiceCard key={svc.title} {...svc} delay={i * 0.07} />)}
        </div>
      </div>
    </section>
  );
}
