import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ExternalLink } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ProjectModal from '../components/ProjectModal';

const projects = [
  {
    title: 'Find a Home',
    subtitle: 'Real Estate Platform',
    description:
      'A luxury real estate platform for Marrakech — featuring property listings with interactive map, advanced filters, bilingual support (FR/AR), and an admin panel for managing properties.',
    category: 'Website',
    accent: '#d4a843',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Leaflet Maps', 'Node.js'],
    images: [
      '/portfolio/fah-1.png',
      '/portfolio/fah-2.png',
      '/portfolio/fah-3.png',
      '/portfolio/fah-4.png',
      '/portfolio/fah-5.png',
      '/portfolio/fah-6.png',
    ],
    coverImage: '/portfolio/fah-1.png',
    result: 'Bilingual · Interactive Map · Admin Panel',
  },
  {
    title: 'Atlas Luxury Cars',
    subtitle: 'Car Rental Platform',
    description:
      'A premium car rental platform for Marrakech — featuring a curated fleet of luxury vehicles, real-time availability, instant booking, and 24/7 support. Built for seamless reservations with full insurance coverage.',
    category: 'Website',
    accent: '#d4a020',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Node.js'],
    images: [
      '/portfolio/atlas-hero.png',
      '/portfolio/atlas-cars.png',
      '/portfolio/atlas-features.png',
      '/portfolio/atlas-reviews.png',
      '/portfolio/atlas-contact.png',
    ],
    coverImage: '/portfolio/atlas-hero.png',
    result: 'Instant Booking · Fleet Management · 24/7 Support',
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="portfolio" className="relative section-padding" aria-labelledby="portfolio-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-cyan-400/3 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our Work"
          title="Real Projects,"
          highlight="Real Results"
          subtitle="Every project we ship is production-ready, fully custom, and built to perform. Here's what we've built."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setSelectedProject(project)}
              className="group glass-card rounded-2xl overflow-hidden cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`View ${project.title} project`}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
            >
              {/* Cover image — taller for real projects */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay always visible at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a1628] to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                    style={{ backgroundColor: '#22d3ee', color: '#020817' }}
                  >
                    <Eye className="w-4 h-4" />
                    View {project.images.length} Screenshots
                  </div>
                </div>

                {/* Screenshot count */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-white border border-white/10 backdrop-blur-sm">
                  {project.images.length} screenshots
                </div>

                {/* Category badge */}
                <div
                  className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{ backgroundColor: `${project.accent}25`, color: project.accent, border: `1px solid ${project.accent}40` }}
                >
                  {project.subtitle}
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <ExternalLink
                    className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors duration-200 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-5">{project.description}</p>

                {/* Result highlight */}
                <div
                  className="text-xs font-medium px-3 py-1.5 rounded-lg mb-5 inline-block"
                  style={{ backgroundColor: `${project.accent}12`, color: project.accent, border: `1px solid ${project.accent}25` }}
                >
                  ✓ {project.result}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-slate-500 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/8"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* More work note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 text-sm text-slate-500"
        >
          More projects available upon request —{' '}
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
          >
            get in touch
          </button>
        </motion.p>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
