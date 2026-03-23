import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../i18n/index.jsx';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO · CloudVenture Inc.',
    feedback:
      'NexWebi transformed our vision into a world-class SaaS platform. Their technical depth, attention to detail, and speed of execution are genuinely remarkable. We launched 40% under budget.',
    rating: 5,
    avatar: 'SM',
    accent: '#22d3ee',
    featured: true,
  },
  {
    name: 'James Okafor',
    role: 'CTO · Logix Automation',
    feedback:
      'The automation systems they built eliminated 70% of our manual work overnight. The team understood our business logic deeply and delivered something that feels tailor-made.',
    rating: 5,
    avatar: 'JO',
    accent: '#818cf8',
    featured: false,
  },
  {
    name: 'Elena Marchetti',
    role: 'Founder · LuxRetail Group',
    feedback:
      "Our e-commerce revenue increased 3x in the first quarter after launch. NexWebi didn't just build a store — they engineered a conversion machine. Exceptional quality.",
    rating: 5,
    avatar: 'EM',
    accent: '#34d399',
    featured: false,
  },
  {
    name: 'David Park',
    role: 'Head of Product · Nexus Digital',
    feedback:
      'Working with NexWebi felt like having a senior engineering team embedded in our company. Fast communication, zero compromises on quality.',
    rating: 5,
    avatar: 'DP',
    accent: '#f59e0b',
    featured: false,
  },
  {
    name: 'Amara Diallo',
    role: 'Operations Director · Scale AI Labs',
    feedback:
      'The AI integration they built for our platform is genuinely cutting-edge. They navigated complex ML infrastructure as if it were second nature.',
    rating: 5,
    avatar: 'AD',
    accent: '#fb7185',
    featured: false,
  },
];

const trustStats = [
  { value: '5.0', label: 'Average Rating' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '0', label: 'Missed Deadlines' },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

export default function Testimonials() {
  const { t } = useLanguage();
  const tm = t.testimonials;
  const featured = testimonials.find((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <section
      id="testimonials"
      className="relative section-padding overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-cyan-400/3 blur-[130px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={tm.eyebrow}
          title={tm.title}
          highlight={tm.highlight}
          subtitle={tm.subtitle}
        />

        {/* Trust summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {tm.trustStats.map(({ value, label }) => (
            <div
              key={label}
              className="glass-card rounded-xl px-4 py-4 text-center hover:border-cyan-400/20 transition-all duration-300"
            >
              <div className="text-2xl font-black gradient-text mb-0.5">{value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Featured card — tall, left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:row-span-2 relative glass-card rounded-2xl p-8 flex flex-col overflow-hidden"
            style={{ border: `1px solid ${featured.accent}30`, boxShadow: `0 0 50px ${featured.accent}08` }}
          >
            {/* Top glow line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${featured.accent}60, transparent)` }}
              aria-hidden="true"
            />

            {/* Large quote icon */}
            <div className="absolute top-6 right-6 opacity-10" style={{ color: featured.accent }} aria-hidden="true">
              <Quote className="w-16 h-16" />
            </div>

            <StarRating rating={featured.rating} />

            <blockquote className="flex-1 mt-6 text-lg text-slate-200 leading-relaxed font-light italic">
              &ldquo;{featured.feedback}&rdquo;
            </blockquote>

            {/* Result badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mt-6 mb-4 w-fit"
              style={{ backgroundColor: `${featured.accent}15`, color: featured.accent, border: `1px solid ${featured.accent}25` }}
            >
              {tm.badge}
            </div>

            <div className="flex items-center gap-4 pt-5 border-t border-white/8">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: `${featured.accent}18`, color: featured.accent, border: `1px solid ${featured.accent}35` }}
                aria-hidden="true"
              >
                {featured.avatar}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{featured.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{featured.role}</div>
              </div>
            </div>
          </motion.div>

          {/* 4 smaller cards — right 2 columns */}
          {rest.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
              className="relative glass-card rounded-2xl p-6 flex flex-col overflow-hidden group"
            >
              {/* Top glow line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${t.accent}50, transparent)` }}
                aria-hidden="true"
              />

              <div className="flex items-start justify-between mb-4">
                <StarRating rating={t.rating} />
                <Quote className="w-5 h-5 opacity-10" style={{ color: t.accent }} aria-hidden="true" />
              </div>

              <blockquote className="flex-1 text-sm text-slate-300 leading-relaxed">
                &ldquo;{t.feedback}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/6">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: `${t.accent}15`, color: t.accent, border: `1px solid ${t.accent}30` }}
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
