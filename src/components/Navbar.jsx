import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/index.jsx';

const navHrefs = ['#services', '#portfolio', '#why-us', '#blog', '#pricing', '#contact'];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const navLabels = [t.nav.services, t.nav.portfolio, t.nav.whyUs, t.nav.blog, t.nav.pricing, t.nav.contact];
  const navLinks = navHrefs.map((href, i) => ({ label: navLabels[i], href }));

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-cyan-400/10' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group"
            aria-label="NexWebi home"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center group-hover:glow-cyan-sm transition-all duration-300">
                <Zap className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-cyan-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="gradient-text">Nex</span>
              <span className="text-white">Webi</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7" role="list">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`text-sm transition-colors duration-200 relative group ${
                      isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-cyan-400 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA + Lang toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border border-white/15 text-slate-400 hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200 tracking-widest"
              aria-label="Switch language"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400 hover:text-navy-950 hover:border-cyan-400 transition-all duration-200"
              style={{ '--tw-text-opacity': 1 }}
            >
              {t.nav.getStarted}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-cyan-400 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-cyan-400/10 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col px-6 py-4 gap-1" role="list">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="block py-3 text-slate-300 hover:text-cyan-400 border-b border-white/5 last:border-0 transition-colors duration-200 text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-3 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="block w-full text-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-cyan-400 text-[#020817]"
                >
                  {t.nav.getStarted}
                </a>
                <button
                  onClick={() => { setLang(lang === 'en' ? 'fr' : 'en'); setMobileOpen(false); }}
                  className="w-full text-center px-5 py-2 rounded-lg text-sm font-bold border border-white/15 text-slate-400 hover:text-cyan-400 transition-all"
                >
                  {lang === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
