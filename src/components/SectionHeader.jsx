import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, highlight, subtitle, id }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-center mb-10 md:mb-16"
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400 mb-4">
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4"
      >
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
