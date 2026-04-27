import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Services', href: 'services' },
  { label: 'Portfolio', href: 'portfolio' },
  { label: 'Why Us', href: 'why-us' },
  { label: 'Insights', href: 'blog' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'Contact', href: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map(l => l.href);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'center',
      padding: scrolled ? '10px 24px' : '20px 24px',
      transition: 'padding 0.4s cubic-bezier(0.25,0.1,0.25,1)',
    }}>
      <div style={{
        width: '100%', maxWidth: 900,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px 0 16px', height: 56,
        background: scrolled ? 'rgba(2,8,23,0.85)' : 'rgba(15,23,42,0.5)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 100,
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,211,238,0.05)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.25,0.1,0.25,1)',
      }}>
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 8px' }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M3 10 L10 3 L17 10 L10 17 Z" stroke="#22d3ee" strokeWidth="1.5" fill="rgba(34,211,238,0.15)"/>
              <path d="M10 6 L14 10 L10 14 L6 10 Z" fill="#22d3ee" opacity="0.6"/>
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>
            <span style={{ background: 'linear-gradient(135deg,#22d3ee,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nex</span>
            <span style={{ color: '#f8fafc' }}>Webi</span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="nw-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map(({ label, href }) => {
            const isActive = activeSection === href;
            return (
              <li key={href}>
                <button onClick={() => scrollTo(href)} style={{
                  background: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  padding: '6px 14px', borderRadius: 100,
                  fontSize: 13.5, fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#22d3ee' : '#94a3b8',
                  letterSpacing: '-0.01em', transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}>
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="nw-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => scrollTo('contact')} style={{
            padding: '8px 20px', borderRadius: 100,
            background: '#22d3ee', color: '#020817',
            border: 'none', cursor: 'pointer',
            fontSize: 13.5, fontWeight: 600, fontFamily: 'inherit',
            letterSpacing: '-0.01em',
            boxShadow: '0 0 20px rgba(34,211,238,0.35)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(34,211,238,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(34,211,238,0.35)'; }}>
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(v => !v)} className="nw-mobile-nav" style={{
          background: 'none', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: '#94a3b8',
          fontSize: 18, lineHeight: 1, fontFamily: 'inherit',
        }}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 16, right: 16,
          background: 'rgba(8,15,30,0.97)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16, padding: 16, marginTop: 8,
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {navLinks.map(({ label, href }) => (
            <button key={href} onClick={() => scrollTo(href)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '12px 16px', borderRadius: 10, textAlign: 'left',
              fontSize: 15, color: '#cbd5e1', fontFamily: 'inherit', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.08)'; e.currentTarget.style.color = '#22d3ee'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#cbd5e1'; }}>
              {label}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')} style={{
            marginTop: 8, padding: '13px 16px', borderRadius: 12,
            background: '#22d3ee', color: '#020817', border: 'none',
            cursor: 'pointer', fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
          }}>
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
