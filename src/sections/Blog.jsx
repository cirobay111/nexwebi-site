import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../i18n/index.jsx';

const categoryColors = {
  Strategy:   { bg: '#22d3ee18', text: '#22d3ee', border: '#22d3ee30' },
  Business:   { bg: '#f59e0b18', text: '#f59e0b', border: '#f59e0b30' },
  Technical:  { bg: '#818cf818', text: '#818cf8', border: '#818cf830' },
  Stratégie:  { bg: '#22d3ee18', text: '#22d3ee', border: '#22d3ee30' },
  Technique:  { bg: '#818cf818', text: '#818cf8', border: '#818cf830' },
};

const defaultColor = { bg: '#64748b18', text: '#94a3b8', border: '#64748b30' };

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Blog() {
  const { t } = useLanguage();
  const b = t.blog;

  return (
    <section
      id="blog"
      className="relative section-padding"
      aria-labelledby="blog-heading"
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-500/4 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={b.eyebrow}
          title={b.title}
          highlight={b.highlight}
          subtitle={b.subtitle}
          id="blog-heading"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {b.articles.map((article, i) => {
            const color = categoryColors[article.category] || defaultColor;
            return (
              <motion.article
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group glass-card rounded-2xl p-7 flex flex-col cursor-default overflow-hidden relative"
              >
                {/* Top border accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${color.text}70, transparent)` }}
                  aria-hidden="true"
                />

                {/* Category + read time */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                  >
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    {article.readTime} {b.minRead}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-cyan-300 transition-colors duration-200">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed flex-1">
                  {article.excerpt}
                </p>

                {/* CTA */}
                <div
                  className="mt-6 flex items-center gap-1.5 text-xs font-semibold opacity-60 group-hover:opacity-100 transition-all duration-200"
                  style={{ color: color.text }}
                >
                  <span>{b.readMore}</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
