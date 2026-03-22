import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Code2, TestTube2, Rocket, HeartHandshake } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Discovery Call',
    description:
      'We start by understanding your goals, audience, and technical requirements. Free 30-minute consultation to scope your project.',
    accent: '#22d3ee',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design & Architecture',
    description:
      'Our designers craft pixel-perfect wireframes and UI prototypes. Our architects design a scalable, secure system blueprint.',
    accent: '#818cf8',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Development Sprints',
    description:
      'Agile 1-week sprints with daily updates. You see progress in real time and can give feedback at every milestone.',
    accent: '#34d399',
  },
  {
    number: '04',
    icon: TestTube2,
    title: 'QA & Security Testing',
    description:
      'Automated tests, cross-browser checks, performance audits, and OWASP security review before anything ships.',
    accent: '#f59e0b',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Launch & Deploy',
    description:
      'CI/CD pipeline, production deployment, DNS setup, SSL certificates, and monitoring dashboards — all handled.',
    accent: '#fb7185',
  },
  {
    number: '06',
    icon: HeartHandshake,
    title: 'Support & Growth',
    description:
      'Post-launch support, analytics review, and iterative improvements. We build long-term partnerships, not one-off projects.',
    accent: '#a78bfa',
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative section-padding overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-400/3 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="How We Work"
          title="Our Proven"
          highlight="Process"
          subtitle="Six clear steps from first conversation to long-term partnership — no surprises, no delays."
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.15) 20%, rgba(34,211,238,0.15) 80%, transparent)' }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map(({ number, icon: Icon, title, description, accent }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative glass-card rounded-2xl p-7 hover:border-white/15 transition-all duration-300"
              >
                {/* Step number */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${accent}12`, border: `1px solid ${accent}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} aria-hidden="true" />
                  </div>
                  <span
                    className="text-4xl font-black leading-none"
                    style={{ color: `${accent}18` }}
                    aria-hidden="true"
                  >
                    {number}
                  </span>
                </div>

                <h3
                  className="font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors duration-200"
                  id={`process-step-${number}`}
                >
                  {title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }}
                  aria-hidden="true"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-slate-500 text-sm mb-5">
            From discovery call to live product — typically <span className="text-cyan-400 font-semibold">2–6 weeks</span> depending on scope.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-xl text-sm font-semibold glass border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all duration-200"
          >
            Start the Process →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
