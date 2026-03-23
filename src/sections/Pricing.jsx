import { motion } from 'framer-motion';
import { Check, Zap, ShieldCheck } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../i18n/index.jsx';

const planPrices = ['399', '999', '2,500'];
const planPriceNotes = [null, null, '+ custom'];
const planRecommended = [false, true, false];
const planAccents = ['#64748b', '#22d3ee', '#818cf8'];
const plans = [
  {
    name: 'Starter',
    price: '399',
    period: 'project',
    tagline: 'Landing pages & small business sites',
    recommended: false,
    accent: '#64748b',
    features: [
      'Up to 5 pages',
      'Responsive design (mobile-first)',
      'Basic SEO setup',
      'Contact form integration',
      'Google Analytics setup',
      'Fast loading & optimized images',
      'Free 30-min discovery call',
      '7-day delivery',
      '30-day post-launch support',
    ],
    cta: 'Start Project',
  },
  {
    name: 'Growth',
    price: '999',
    period: 'project',
    tagline: 'Full websites & web apps for growing businesses',
    recommended: true,
    accent: '#22d3ee',
    features: [
      'Up to 15 pages / full web app',
      'Custom UI/UX design system',
      'Advanced SEO + Core Web Vitals',
      'User authentication & roles',
      'Third-party API integrations',
      'Admin dashboard',
      'CI/CD deployment pipeline',
      'Free 30-min discovery call',
      '14-day delivery',
      '90-day post-launch support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Scale',
    price: '2,500',
    priceNote: '+ custom',
    period: 'starting from',
    tagline: 'SaaS platforms, automation & complex systems',
    recommended: false,
    accent: '#818cf8',
    features: [
      'Unlimited scope & pages',
      'SaaS or multi-tenant architecture',
      'AI / automation integrations',
      'Payment processing (Stripe etc.)',
      'Microservices or headless setup',
      'Security audit & hardening',
      'Cloud infrastructure (AWS / GCP)',
      'Free 30-min discovery call',
      '21-day delivery',
      '6-month priority support',
    ],
    cta: 'Book a Call',
  },
];

export default function Pricing() {
  const { t } = useLanguage();
  const p = t.pricing;
  const localPlans = p.plans.map((plan, i) => ({
    ...plan,
    price: planPrices[i],
    priceNote: planPriceNotes[i],
    recommended: planRecommended[i],
    accent: planAccents[i],
  }));

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="pricing"
      className="relative section-padding overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/3 w-[450px] h-[350px] bg-purple-500/4 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-cyan-400/4 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={p.eyebrow}
          title={p.title}
          highlight={p.highlight}
          subtitle={p.subtitle}
        />

        {/* Guarantee bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-12"
        >
          {p.guarantees.map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-slate-400">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {localPlans.map(({ name, price, priceNote, period, tagline, recommended, accent, features, cta }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: recommended ? -4 : -6 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                recommended
                  ? 'glass border-2 border-cyan-400/50'
                  : 'glass-card'
              }`}
              style={recommended ? { boxShadow: '0 0 50px rgba(34,211,238,0.14)' } : {}}
              aria-label={`${name} plan`}
            >
              {/* Recommended badge */}
              {recommended && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
                  style={{ backgroundColor: '#22d3ee', color: '#020817' }}
                >
                  <Zap className="w-3 h-3" aria-hidden="true" />
                  {p.mostPopular}
                </div>
              )}

              {/* Top border accent */}
              {!recommended && (
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }}
                  aria-hidden="true"
                />
              )}

              {/* Header */}
              <div className="mb-6">
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: accent }}
                >
                  {name}
                </span>
                <div className="mt-3 flex items-end gap-1 flex-wrap">
                  <span className="text-sm text-slate-400 mb-1.5">$</span>
                  <span className="text-5xl font-black text-white leading-none">{price}</span>
                  {priceNote && (
                    <span className="text-base font-semibold mb-1.5" style={{ color: accent }}>{priceNote}</span>
                  )}
                  <span className="text-slate-500 mb-1.5 text-sm">/ {period}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{tagline}</p>
              </div>

              {/* Divider */}
              <div
                className="h-px mb-6"
                style={{ background: `linear-gradient(90deg, ${accent}25, transparent)` }}
                aria-hidden="true"
              />

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-8" aria-label={`${name} plan features`}>
                {features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: `${accent}18` }}
                      aria-hidden="true"
                    >
                      <Check className="w-3 h-3" style={{ color: accent }} />
                    </div>
                    <span className={`text-sm ${(feat.startsWith('Free') || feat.startsWith('Appel')) ? 'text-cyan-400 font-medium' : 'text-slate-300'}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToContact}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  recommended
                    ? 'hover:opacity-90 hover:scale-[1.02]'
                    : 'glass border border-white/12 text-slate-300 hover:border-cyan-400/30 hover:text-cyan-400'
                }`}
                style={
                  recommended
                    ? {
                        backgroundColor: '#22d3ee',
                        color: '#020817',
                        boxShadow: '0 0 24px rgba(34,211,238,0.4)',
                      }
                    : {}
                }
              >
                {cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-400/20 text-green-400 text-xs">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            {p.footerNote}
          </div>
          <p className="text-sm text-slate-500">
            {p.needCustom}{' '}
            <button
              onClick={scrollToContact}
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
            >
              {p.letsTalk}
            </button>{' '}
            {p.anyBudget}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
