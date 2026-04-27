import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../components/SectionHeader';

const items = [
  { title: 'Fast Delivery', desc: 'Agile sprints with transparent milestones. We deliver MVPs in weeks, not months — no delays, no excuses.', color: '#22d3ee', icon: '🚀' },
  { title: 'Modern Tech Stack', desc: 'React, Next.js, Node.js, Python, PostgreSQL, AWS — battle-tested technologies for production-grade software.', color: '#818cf8', icon: '⚡' },
  { title: 'Scalable Architecture', desc: 'Systems designed to handle 10x growth without rewrites. Microservices, CDN, and cloud-native from the start.', color: '#34d399', icon: '↑' },
  { title: 'Automation Expertise', desc: 'Deep knowledge of workflow automation, API orchestration, and intelligent business process management.', color: '#f59e0b', icon: '⟳' },
  { title: 'Security First', desc: 'OWASP compliance, secure coding practices, and data protection built in from day one — not bolted on after.', color: '#fb7185', icon: '◈' },
  { title: 'Long-Term Partnership', desc: "We don't disappear after launch. Dedicated support, proactive monitoring, and ongoing improvements.", color: '#a78bfa', icon: '♦' },
];

const techs = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Tailwind', 'OpenAI', 'Stripe', 'GraphQL', 'Vercel', 'MongoDB', 'Framer'];

function WhyCard({ title, desc, color, icon, delay }) {
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
      display: 'flex', gap: 16, padding: '22px 22px', borderRadius: 18,
      background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(16px)',
      border: hovered ? `1px solid ${color}22` : '1px solid rgba(255,255,255,0.06)',
      boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.25)' : 'none',
      transform: visible ? (hovered ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(20px)',
      opacity: visible ? 1 : 0,
      transition: `all 0.3s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
      cursor: 'default',
    }}>
      <div style={{
        flexShrink: 0, width: 44, height: 44, borderRadius: 12,
        background: `${color}12`, border: `1px solid ${color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
        transform: hovered ? 'scale(1.12)' : 'scale(1)', transition: 'transform 0.2s ease',
      }}>{icon}</div>
      <div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', marginBottom: 6, letterSpacing: '-0.02em' }}>{title}</h3>
        <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="why-us" style={{ position: 'relative', padding: 'clamp(80px,10vw,140px) 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader eyebrow="Why NexWebi" title="Built Different," highlight="Built Better" subtitle="We don't just build websites — we engineer digital experiences that perform, scale, and convert." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 72 }}>
          {items.map((item, i) => <WhyCard key={item.title} {...item} delay={i * 0.06} />)}
        </div>

        {/* Tech marquee */}
        <div>
          <p style={{ textAlign: 'center', fontSize: 10.5, letterSpacing: '0.15em', color: '#334155', textTransform: 'uppercase', marginBottom: 24, fontWeight: 600 }}>Technologies We Master</p>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, #020817, transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, #020817, transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', animation: 'marqueeLeft 28s linear infinite', width: 'max-content' }}>
              {[...techs, ...techs, ...techs].map((tech, i) => (
                <div key={i} style={{
                  flexShrink: 0, margin: '0 6px', padding: '10px 20px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  fontSize: 12.5, color: '#475569', fontWeight: 500, whiteSpace: 'nowrap',
                }}>{tech}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </section>
  );
}
