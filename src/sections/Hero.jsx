import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Star } from 'lucide-react';
import ParticleField from '../components/ParticleField';
import { useLanguage } from '../i18n/index.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-400/5 blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-cyan-400/4 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020817] to-transparent" />
      </div>

      <ParticleField />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-400/20 text-cyan-400 text-xs font-medium tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {h.badge}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-[2.25rem] sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6"
        >
          <span className="text-white">{h.headline1}</span>
          <br />
          <span className="gradient-text glow-text">{h.headline2}</span>
          <br />
          <span className="text-white">{h.headline3}</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mb-10"
        >
          {h.sub}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection('#contact')}
            className="shimmer-btn group relative flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-cyan-400 overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300"
            style={{ color: '#020817', boxShadow: '0 0 24px rgba(34,211,238,0.45)' }}
          >
            <span className="relative z-10">{h.cta1}</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          <button
            onClick={() => scrollToSection('#portfolio')}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm glass border border-cyan-400/30 text-cyan-400 hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all duration-200"
          >
            <Calendar className="w-4 h-4" />
            {h.cta2}
          </button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3.5}
          className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-500"
        >
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" />
            ))}
          </div>
          <span>{h.rating}</span>
          <span className="text-slate-700" aria-hidden="true">·</span>
          <span>{h.trusted}</span>
          <span className="text-slate-700" aria-hidden="true">·</span>
          <span>{h.worldwide}</span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-8 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {h.stats.map(({ value, label }) => (
            <div
              key={label}
              className="glass-card rounded-2xl px-4 py-5 text-center hover:border-cyan-400/20 transition-all duration-300"
            >
              <div className="text-3xl font-black gradient-text mb-1">{value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
