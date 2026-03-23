import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/index.jsx';

export default function ImpactBar() {
  const { t } = useLanguage();
  const stats = t.impactBar;

  return (
    <div className="relative border-y border-white/6 overflow-hidden bg-[#020817]">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-white/6">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center justify-center text-center px-4"
            >
              <span className="text-xl font-black gradient-text leading-none">{value}</span>
              <span className="text-xs text-slate-500 mt-1 tracking-wide">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
