import { motion } from 'framer-motion';
import { Zap, Twitter, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '#services' },
    { label: 'Automation', href: '#services' },
    { label: 'SaaS Platforms', href: '#services' },
    { label: 'E-commerce', href: '#services' },
    { label: 'AI Integration', href: '#services' },
  ],
  Company: [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Why NexWebi', href: '#why-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const socials = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/nexwebi/' },
  { icon: Twitter, label: 'Twitter / X', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="relative border-t border-white/6 overflow-hidden"
      aria-label="Site footer"
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)' }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-400/3 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo */}
              <a
                href="#"
                onClick={(e) => handleNavClick(e, '#hero')}
                className="inline-flex items-center gap-2 mb-5 group"
                aria-label="NexWebi home"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                </div>
                <span className="text-xl font-bold">
                  <span className="gradient-text">Nex</span>
                  <span className="text-white">Webi</span>
                </span>
              </a>

              <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-6">
                Building next-generation digital products — from modern websites to intelligent
                automation systems and scalable SaaS platforms.
              </p>

              {/* Social links */}
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links], i) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">
                {group}
              </h3>
              <ul className="space-y-3" role="list">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {label}
                      {!href.startsWith('#') && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} NexWebi. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200">
              Terms of Service
            </a>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span className="text-xs text-slate-600">
              Built with{' '}
              <span className="text-cyan-400/60" aria-label="love">♥</span>
              {' '}by NexWebi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
