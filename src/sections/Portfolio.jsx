import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../components/SectionHeader';

const projects = [
  {
    title: 'Luxury Real Estate Platform',
    subtitle: 'Real Estate · Marrakech',
    description: 'A luxury real estate platform for Marrakech — featuring property listings with interactive map, advanced filters, bilingual support (FR/AR), and an admin panel for managing properties.',
    tags: ['Bilingual FR/AR', 'Interactive Map', 'Admin Panel', 'Advanced Filters'],
    accent: '#22d3ee',
    metrics: [{ value: '2', label: 'Languages' }, { value: '100%', label: 'Custom Design' }, { value: '< 7d', label: 'Delivery' }],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Mapbox'],
    category: 'Web Platform',
    screenshots: ['/portfolio/re-hero.png', '/portfolio/re-properties.png', '/portfolio/fah-hero.png'],
  },
  {
    title: 'Premium Car Rental Platform',
    subtitle: 'Car Rental · Marrakech',
    description: 'A premium car rental platform for Marrakech — featuring a curated fleet of luxury vehicles, real-time availability, instant booking system, and 24/7 customer support.',
    tags: ['Instant Booking', 'Fleet Management', '24/7 Support', 'Real-time Availability'],
    accent: '#818cf8',
    metrics: [{ value: '3×', label: 'More Bookings' }, { value: '1.9s', label: 'Load Time' }, { value: '80%', label: 'Faster' }],
    tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Vercel'],
    category: 'E-commerce',
    screenshots: ['/portfolio/atlas-hero.png', '/portfolio/atlas-cars.png', '/portfolio/atlas-features.png'],
  },
];

function ScreenshotSlider({ screenshots, accent, hovered }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!hovered) return;
    const t = setInterval(() => setActive(i => (i + 1) % screenshots.length), 2200);
    return () => clearInterval(t);
  }, [hovered, screenshots.length]);

  return (
    <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 380 }}>
      <div style={{
        borderRadius: 14, overflow: 'hidden',
        background: 'rgba(8,15,30,0.95)', border: `1px solid ${accent}22`,
        boxShadow: `0 24px 70px rgba(0,0,0,0.55)`,
        transform: hovered ? 'scale(1.03) translateY(-5px)' : 'scale(1)',
        transition: 'transform 0.45s cubic-bezier(0.25,0.1,0.25,1)',
      }}>
        <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.025)' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.75 }} />)}
          </div>
          <div style={{ flex: 1, height: 18, borderRadius: 5, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
            <span style={{ fontSize: 9, color: '#334155' }}>nexwebi.com/project</span>
          </div>
        </div>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '62%', overflow: 'hidden', background: '#0a1020' }}>
          {screenshots.map((src, i) => (
            <img key={src} src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: i === active ? 1 : 0, transition: 'opacity 0.6s ease' }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 70%, rgba(2,8,23,0.6) 100%)', pointerEvents: 'none' }} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
        {screenshots.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 20 : 6, height: 6, borderRadius: 3, background: i === active ? accent : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, reverse, delay }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const { title, subtitle, description, tags, accent, metrics, tech, category, screenshots } = project;
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderRadius: 24, overflow: 'hidden',
      background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(20px)',
      border: hovered ? `1px solid ${accent}30` : '1px solid rgba(255,255,255,0.08)',
      boxShadow: hovered ? `0 24px 70px rgba(0,0,0,0.35)` : '0 8px 32px rgba(0,0,0,0.2)',
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      opacity: visible ? 1 : 0,
      transition: `all 0.5s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
    }} className="nw-project-card">
      {/* Screenshot panel */}
      <div style={{
        order: reverse ? 1 : 0, position: 'relative', minHeight: 340,
        background: `linear-gradient(135deg, ${accent}08 0%, rgba(2,8,23,0.9) 100%)`,
        borderRight: reverse ? 'none' : '1px solid rgba(255,255,255,0.06)',
        borderLeft: reverse ? '1px solid rgba(255,255,255,0.06)' : 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 32, overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${accent}06 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <ScreenshotSlider screenshots={screenshots} accent={accent} hovered={hovered} />
        <div style={{ position: 'absolute', top: 20, left: 20, padding: '4px 12px', borderRadius: 100, background: `${accent}12`, border: `1px solid ${accent}25`, fontSize: 10.5, fontWeight: 700, color: accent, letterSpacing: '0.06em' }}>{category}</div>
      </div>

      {/* Content panel */}
      <div style={{ order: reverse ? 0 : 1, padding: 'clamp(32px,4vw,52px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>{subtitle}</div>
        <h3 style={{ fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 16 }}>{title}</h3>
        <p style={{ fontSize: 14.5, color: '#64748b', lineHeight: 1.75, marginBottom: 24 }}>{description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {tags.map(tag => <span key={tag} style={{ padding: '4px 12px', borderRadius: 100, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{tag}</span>)}
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {metrics.map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.04em', background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 11, color: '#475569', marginTop: 4, letterSpacing: '0.03em' }}>{label}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 10.5, color: '#334155', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Built with</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tech.map(t => <span key={t} style={{ padding: '3px 10px', borderRadius: 8, background: `${accent}0C`, border: `1px solid ${accent}20`, fontSize: 11.5, color: accent, fontWeight: 600 }}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };
  return (
    <section id="portfolio" style={{ position: 'relative', padding: 'clamp(80px,10vw,140px) 24px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', right: '5%', width: 500, height: 400, background: 'radial-gradient(ellipse, rgba(129,140,248,0.04) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader eyebrow="Our Work" title="Real Projects," highlight="Real Results" subtitle="Every project we ship is production-ready, fully custom, and built to perform." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} reverse={i % 2 !== 0} delay={i * 0.1} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <p style={{ fontSize: 15, color: '#475569', marginBottom: 20 }}>Want to see your project here?</p>
          <button onClick={scrollToContact} style={{
            padding: '13px 28px', borderRadius: 100,
            background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.25)',
            color: '#22d3ee', cursor: 'pointer', fontSize: 14, fontWeight: 600,
            fontFamily: 'inherit', letterSpacing: '-0.01em', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.13)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.07)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.25)'; }}>
            Start Your Project →
          </button>
        </div>
      </div>
    </section>
  );
}
