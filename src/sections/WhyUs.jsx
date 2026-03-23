import { motion } from 'framer-motion';
import {
  Rocket,
  Layers,
  TrendingUp,
  Workflow,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../i18n/index.jsx';

const advantageIcons = [Rocket, Layers, TrendingUp, Workflow, ShieldCheck, HeartHandshake];
const advantageAccents = ['#22d3ee', '#818cf8', '#34d399', '#f59e0b', '#fb7185', '#a78bfa'];

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Tailwind CSS',
  'OpenAI', 'Stripe', 'Framer Motion', 'GraphQL', 'Vercel',
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-widest text-slate-600 mb-6">
            {w.techLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                className="px-4 py-2 rounded-full text-xs font-medium text-slate-400 border border-white/8 bg-white/3 hover:border-cyan-400/35 hover:text-cyan-400 hover:bg-cyan-400/8 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
