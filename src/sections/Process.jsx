import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../components/SectionHeader';

const steps = [
  { num: '01', title: 'Discovery Call', desc: 'We start by understanding your goals, audience, and technical requirements. Free 30-minute consultation to scope your project.', accent: '#22d3ee', icon: '◎' },
  { num: '02', title: 'Design & Architecture', desc: 'Our designers craft pixel-perfect wireframes and UI prototypes. Our architects design a scalable, secure system blueprint.', accent: '#818cf8', icon: '◫' },
  { num: '03', title: 'Development Sprints', desc: 'Agile 1-week sprints with daily updates. You see progress in real time and can give feedback at every milestone.', accent: '#34d399', icon: '⟳' },
  { num: '04', title: 'QA & Security Testing', desc: 'Automated tests, cross-browser checks, performance audits, and OWASP security review before anything ships.', accent: '#f59e0b', icon: '◈' },
  { num: '05', title: 'Launch & Deploy', desc: 'CI/CD pipeline, production deployment, DNS setup, SSL certificates, and monitoring dashboards — all handled.', accent: '#fb7185', icon: '↑' },
  { num: '06', title: 'Support & Growth', desc: "Post-launch support, analytics review, and iterative improvements. We build long-term partnerships, not one-off projects.", accent: '#a78bfa', icon: '♦' },
];

function ProcessCard({ num, title, desc, accent, icon, delay }) {
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
      position: 'relative', padding: '28px 26px', borderRadius: 20, cursor: 'default',
      background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(16px)',
      border: hovered ? `1px solid ${accent}22` : '1px solid rgba(255,255,255,0.07)',
      boxShadow: hovered ? '0 16px 50px rgba(0,0,0,0.25)' : 'none',
      transform: visible ? (hovered ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(22px)',
      opacity: visible ? 1 : 0,
      transition: `all 0.4s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', bottom: 0, left: 24, right: 24, height: 1, background: hovered ? `linear-gradient(90deg, transparent, ${accent}40, transparent)` : 'transparent', transition: 'background 0.3s' }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${accent}12`, border: `1px solid ${accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: accent, transform: hovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.25s ease' }}>{icon}</div>
        <span style={{ fontSize: 42, fontWeight: 900, color: `${accent}14`, lineHeight: 1, letterSpacing: '-0.04em' }}>{num}</span>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: hovered ? '#a5f3fc' : '#f1f5f9', marginBottom: 10, letterSpacing: '-0.02em', transition: 'color 0.2s' }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{desc}</p>
    </div>
  );
}

export default function Process() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };
  return (
    <section id="process" style={{ position: 'relative', padding: 'clamp(80px,10vw,140px) 24px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(34,211,238,0.025) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader eyebrow="How We Work" title="Our Proven" highlight="Process" subtitle="Six clear steps from first conversation to long-term partnership — no surprises, no delays." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {steps.map((s, i) => <ProcessCard key={s.title} {...s} delay={i * 0.08} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 52 }}>
          <p style={{ fontSize: 14, color: '#475569', marginBottom: 20 }}>
            From discovery call to live product — typically <span style={{ color: '#22d3ee', fontWeight: 600 }}>2–6 weeks</span> depending on scope.
          </p>
          <button onClick={scrollToContact} style={{
            padding: '12px 28px', borderRadius: 100,
            background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.25)',
            color: '#22d3ee', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.13)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.07)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.25)'; }}>
            Start the Process →
          </button>
        </div>
      </div>
    </section>
  );
}
