import { motion } from 'framer-motion';
import {
  Rocket,
  Layers,
  TrendingUp,
  Workflow,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
  SiPostgresql, SiRedis, SiDocker, SiTailwindcss,
  SiOpenai, SiStripe, SiFramer, SiGraphql, SiVercel, SiMongodb,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../i18n/index.jsx';

const advantageIcons = [Rocket, Layers, TrendingUp, Workflow, ShieldCheck, HeartHandshake];
const advantageAccents = ['#22d3ee', '#818cf8', '#34d399', '#f59e0b', '#fb7185', '#a78bfa'];

const techStack1 = [
  { icon: SiReact,            name: 'React',         color: '#61DAFB' },
  { icon: SiNextdotjs,        name: 'Next.js',       color: '#ffffff' },
  { icon: SiTypescript,       name: 'TypeScript',    color: '#3178C6' },
  { icon: SiNodedotjs,        name: 'Node.js',       color: '#339933' },
  { icon: SiPython,           name: 'Python',        color: '#3776AB' },
  { icon: SiPostgresql,       name: 'PostgreSQL',    color: '#4169E1' },
  { icon: SiRedis,            name: 'Redis',         color: '#DC382D' },
  { icon: SiDocker,           name: 'Docker',        color: '#2496ED' },
];
const techStack2 = [
  { icon: FaAws,               name: 'AWS',           color: '#FF9900' },
  { icon: SiTailwindcss,       name: 'Tailwind CSS',  color: '#06B6D4' },
  { icon: SiOpenai,            name: 'OpenAI',        color: '#ffffff' },
  { icon: SiStripe,            name: 'Stripe',        color: '#635BFF' },
  { icon: SiFramer,            name: 'Framer Motion', color: '#0055FF' },
  { icon: SiGraphql,           name: 'GraphQL',       color: '#E10098' },
  { icon: SiVercel,            name: 'Vercel',        color: '#ffffff' },
  { icon: SiMongodb,           name: 'MongoDB',       color: '#47A248' },
];

export default function WhyUs() {
  const { t } = useLanguage();
  const w = t.whyUs;
  const advantages = w.items.map((item, i) => ({
    ...item,
    icon: advantageIcons[i],
    accent: advantageAccents[i],
  }));

  return (
    <section
      id="why-us"
      className="relative section-padding overflow-hidden"
      aria-labelledby="why-us-heading"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/3 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/4 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={w.eyebrow}
          title={w.title}
          highlight={w.highlight}
          subtitle={w.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 sm:mb-20">
          {advantages.map(({ icon: Icon, title, description, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex gap-4 p-6 glass-card rounded-2xl transition-all duration-300"
            >
              <div
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}28` }}
              >
                <Icon className="w-5 h-5" style={{ color: accent }} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-widest text-slate-600 mb-6 text-center">
            {w.techLabel}
          </p>

          {/* Row 1 — scrolls left */}
          <div className="relative overflow-hidden mb-4">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #020817, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #020817, transparent)' }} />
            <div className="marquee-track">
              {[...techStack1, ...techStack1].map(({ icon: Icon, name, color }, i) => (
                <div
                  key={i}
                  className="mx-2 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl bg-white/3 border border-white/8 hover:border-white/20 hover:bg-white/6 transition-all duration-200 cursor-default w-24 flex-shrink-0"
                >
                  <Icon style={{ color }} className="w-7 h-7" aria-hidden="true" />
                  <span className="text-xs text-slate-400 font-medium text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #020817, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #020817, transparent)' }} />
            <div className="marquee-track-reverse">
              {[...techStack2, ...techStack2].map(({ icon: Icon, name, color }, i) => (
                <div
                  key={i}
                  className="mx-2 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl bg-white/3 border border-white/8 hover:border-white/20 hover:bg-white/6 transition-all duration-200 cursor-default w-24 flex-shrink-0"
                >
                  <Icon style={{ color }} className="w-7 h-7" aria-hidden="true" />
                  <span className="text-xs text-slate-400 font-medium text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
