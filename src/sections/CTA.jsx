import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/index.jsx';

export default function CTA() {
  const { t } = useLanguage();
  const c = t.cta;

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative section-padding overflow-hidden"
      aria-label="Call to action"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/0 via-cyan-400/4 to-navy-900/0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-400/6 blur-[140px] rounded-full" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/4 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl px-5 py-10 sm:px-8 sm:py-12 md:px-16 md:py-16 relative overflow-hidden"
          style={{ borderColor: 'rgba(34,211,238,0.22)', boxShadow: '0 0 80px rgba(34,211,238,0.07)' }}
        >
          {/* Corner glows */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-400/6 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/6 blur-[80px] rounded-full translate-x-1/2 translate-y-1/2" aria-hidden="true" />

          {/* Top border */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.6), transparent)' }} aria-hidden="true" />

          {/* Subtle grid inside card */}
          <div
            className="absolute inset-0 rounded-3xl opacity-30"
            style={{
              backgroundImage: 'linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-400/20 text-cyan-400 text-xs font-medium tracking-widest uppercase mb-6">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              {c.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
              <span className="text-white">{c.headline1}</span>
              <br />
              <span className="gradient-text glow-text">{c.headline2}</span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
              {c.sub}
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-10"
              style={{ backgroundColor: 'rgba(251,113,133,0.1)', color: '#fb7185', border: '1px solid rgba(251,113,133,0.2)' }}
            >
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {c.urgency}
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="shimmer-btn group flex items-center gap-2 px-9 py-4 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{
                  backgroundColor: '#22d3ee',
                  color: '#020817',
                  boxShadow: '0 0 28px rgba(34,211,238,0.45)',
                }}
              >
                {c.cta1}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={scrollToPricing}
                className="px-9 py-4 rounded-xl font-bold text-sm glass border border-white/15 text-slate-300 hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-200"
              >
                {c.cta2}
              </button>
            </div>

            <p className="mt-6 text-xs text-slate-600">{c.footnote}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
