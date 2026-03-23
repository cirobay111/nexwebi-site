import { motion } from 'framer-motion';
import {
  Globe,
  Cpu,
  LayoutTemplate,
  ShoppingCart,
  Gauge,
  Brain,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../i18n/index.jsx';

const serviceColors = ['#22d3ee', '#818cf8', '#34d399', '#f59e0b', '#fb7185', '#a78bfa'];
const serviceIcons = [Globe, Cpu, LayoutTemplate, ShoppingCart, Gauge, Brain];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;
  const services = s.items.map((item, i) => ({
    ...item,
    icon: serviceIcons[i],
    color: serviceColors[i],
  }));

  return (
    <section
      id="services"
      className="relative section-padding"
      aria-labelledby="services-heading"
    >
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-400/4 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={s.eyebrow}
          title={s.title}
          highlight={s.highlight}
          subtitle={s.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, color, tag }, i) => (
            <motion.article
              key={title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={i}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative glass-card rounded-2xl p-7 cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${color}10 0%, transparent 70%)`,
                }}
                aria-hidden="true"
              />

              {/* Top border accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${color}70, transparent)` }}
                aria-hidden="true"
              />

              {/* Tag badge */}
              {tag && (
                <div
                  className="absolute top-5 right-5 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: `${color}18`, color, border: `1px solid ${color}30` }}
                >
                  {tag}
                </div>
              )}

              {/* Icon */}
              <div
                className="relative w-13 h-13 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{
                  backgroundColor: `${color}14`,
                  border: `1px solid ${color}30`,
                  width: '52px',
                  height: '52px',
                  boxShadow: 'none',
                }}
              >
                <Icon
                  className="w-5 h-5 transition-colors duration-300"
                  style={{ color }}
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-200">
                {title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{description}</p>

              {/* Arrow indicator */}
              <div
                className="mt-5 flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200"
                style={{ color }}
              >
                <span>{s.learnMore}</span>
                <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
