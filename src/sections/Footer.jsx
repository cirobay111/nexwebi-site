import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onLegal }) {
  const { t } = useLanguage();
  const f = t.footer;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const groupKeys = ['Services', 'Company', 'Legal'];

  return (
    <footer style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.25), transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 500, height: 200, background: 'radial-gradient(ellipse, rgba(34,211,238,0.025) 0%, transparent 70%)', filter: 'blur(40px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', padding: 'clamp(48px,6vw,80px) 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 56 }} className="nw-footer-grid">
          <div>
            <button onClick={() => scrollTo('hero')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>◈</div>
              <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
                <span style={{ background: 'linear-gradient(135deg,#22d3ee,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nex</span>
                <span style={{ color: '#f8fafc' }}>Webi</span>
              </span>
            </button>
            <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.7, maxWidth: 280, marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 24 }}>{f.desc}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[['IG','https://www.instagram.com/nexwebi/'],['in','#'],['YT','#']].map(([label, href]) => (
                <a key={label} href={href} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#475569', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {groupKeys.map(group => (
            <div key={group}>
              <h3 style={{ fontSize: 10.5, fontWeight: 700, color: '#334155', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20, marginTop: 0 }}>{group}</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {f.groups[group].map(([label, href]) => (
                  <li key={label}>
                    <button onClick={() => { if (['privacy','terms','cookie'].includes(href)) { onLegal && onLegal(href); } else { scrollTo(href); } }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 13.5, color: '#475569', fontFamily: 'inherit', transition: 'color 0.2s', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#22d3ee'}
                      onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 12, color: '#334155', marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>© {new Date().getFullYear()} NexWebi. {f.copyright}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {[f.privacyPolicy, f.termsOfService].map((label, i) => (
              <button key={label} onClick={() => onLegal && onLegal(i === 0 ? 'privacy' : 'terms')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#334155', fontFamily: 'inherit', transition: 'color 0.2s', padding: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = '#64748b'}
                onMouseLeave={e => e.currentTarget.style.color = '#334155'}>{label}</button>
            ))}
            <span style={{ fontSize: 12, color: '#334155' }}>{f.builtBy} <span style={{ color: 'rgba(34,211,238,0.5)' }}>♥</span> {f.byNexWebi}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
