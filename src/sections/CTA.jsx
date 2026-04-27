export default function CTA() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };
  return (
    <section id="cta" style={{ padding: 'clamp(60px,8vw,100px) 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ position: 'relative', borderRadius: 28, padding: 'clamp(48px,6vw,80px) 40px', overflow: 'hidden', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(34,211,238,0.15)', boxShadow: '0 0 80px rgba(34,211,238,0.07)' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(34,211,238,0.08) 0%, transparent 70%)', filter: 'blur(40px)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)' }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 100, background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.18)', fontSize: 11, color: '#22d3ee', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22d3ee', animation: 'heroPulse 2s infinite', display: 'inline-block' }} /> Let's Build Together
          </div>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, margin: '0 0 20px', color: '#f8fafc' }}>
            Ready to Build Your<br />
            <span style={{ background: 'linear-gradient(135deg,#22d3ee,#a5f3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Next Digital Product?</span>
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, margin: '0 auto 12px', maxWidth: 500 }}>Whether you have a fully scoped project or just a spark of an idea — we'll turn it into a product your users love.</p>
          <p style={{ fontSize: 12.5, color: '#f59e0b', margin: '0 0 36px', fontWeight: 600 }}>⚡ Currently accepting new projects — limited spots available</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
            <button onClick={() => scrollTo('contact')} style={{
              padding: '14px 32px', borderRadius: 100, background: '#22d3ee', color: '#020817',
              border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
              boxShadow: '0 0 32px rgba(34,211,238,0.45)', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(34,211,238,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(34,211,238,0.45)'; }}>
              Start Your Project →
            </button>
            <button onClick={() => scrollTo('pricing')} style={{
              padding: '13px 28px', borderRadius: 100, background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8',
              cursor: 'pointer', fontSize: 15, fontWeight: 500, fontFamily: 'inherit', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.25)'; e.currentTarget.style.color = '#22d3ee'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#94a3b8'; }}>
              View Pricing
            </button>
          </div>
          <p style={{ fontSize: 12, color: '#334155', margin: 0 }}>No commitment required · Free consultation · Response within 24h</p>
        </div>
      </div>
    </section>
  );
}
