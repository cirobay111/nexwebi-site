import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const faqs = [
  {
    q: 'How long does it take to build a website?',
    a: 'It depends on the scope. A landing page or simple brochure site: 3–7 days. A full web app or SaaS platform: 3–8 weeks. We give you a precise timeline after the discovery call with weekly milestones.',
  },
  {
    q: 'Do I own the source code after the project?',
    a: 'Yes — 100%. You get full ownership of all source code, assets, and intellectual property once the final payment is processed. No lock-ins, no ongoing licensing fees.',
  },
  {
    q: 'What technologies do you use?',
    a: 'Our core stack is React / Next.js for frontend, Node.js / Python for backend, PostgreSQL / MongoDB for databases, and AWS / GCP for infrastructure. We recommend the best fit for your specific use case.',
  },
  {
    q: 'Can you work with an existing codebase?',
    a: 'Absolutely. We regularly audit, refactor, and extend existing projects. We\'ll review your codebase first and give you an honest assessment of what needs to change and why.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. We\'re happy to sign a mutual NDA before any discussions. Your business ideas and project details are always kept strictly confidential.',
  },
  {
    q: 'What\'s included in post-launch support?',
    a: 'All plans include a minimum 30-day post-launch window covering bug fixes, deployment issues, and minor adjustments. Ongoing retainers are available for continuous development and monitoring.',
  },
  {
    q: 'How do payments work?',
    a: 'We typically split payments: 50% upfront to start, 50% upon delivery. For larger projects we use milestone-based billing so you only pay as value is delivered.',
  },
  {
    q: 'Do you build mobile apps too?',
    a: 'We specialize in web-based products. For mobile, we build React Native or Progressive Web Apps (PWAs) that work beautifully on all devices. Native iOS/Android is available through our partner network.',
  },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  const id = `faq-answer-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-white/6 last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors duration-200 pr-4">
          {q}
        </span>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{
            backgroundColor: open ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.05)',
            border: open ? '1px solid rgba(34,211,238,0.35)' : '1px solid rgba(255,255,255,0.08)',
          }}
          aria-hidden="true"
        >
          <Plus
            className="w-4 h-4 transition-transform duration-300"
            style={{
              color: open ? '#22d3ee' : '#94a3b8',
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            aria-label={q}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-slate-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative section-padding"
      aria-labelledby="faq-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-1/3 w-[350px] h-[250px] bg-purple-500/4 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="FAQ"
          title="Common"
          highlight="Questions"
          subtitle="Everything you need to know before starting a project with us."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left sticky info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24"
            >
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  Still have questions?
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Can't find what you're looking for? Send us a message and we'll get back to you within a few hours.
                </p>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3 rounded-xl text-sm font-semibold bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 transition-all duration-200"
                >
                  Ask Us Directly
                </button>

                <div className="mt-6 pt-6 border-t border-white/6">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">
                    Average Response Time
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
                    <span className="text-sm text-slate-300 font-medium">Under 2 hours</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ list */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl px-8 py-2">
              {faqs.map((item, i) => (
                <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
