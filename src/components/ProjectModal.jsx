import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }) {
  const [current, setCurrent] = useState(0);
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Save previous focus, lock body scroll, focus modal
  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    // Focus first focusable element in modal
    const timer = setTimeout(() => {
      const el = panelRef.current?.querySelector(FOCUSABLE);
      el?.focus();
    }, 50);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, []);

  // Keyboard: Escape, arrows, focus trap
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % project.images.length);
      if (e.key === 'ArrowLeft') setCurrent(c => (c - 1 + project.images.length) % project.images.length);

      // Focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = Array.from(panelRef.current.querySelectorAll(FOCUSABLE));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project.images.length, onClose]);

  const prev = () => setCurrent(c => (c - 1 + project.images.length) % project.images.length);
  const next = () => setCurrent(c => (c + 1) % project.images.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" aria-hidden="true" />

        {/* Panel */}
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-5xl glass-card rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(34,211,238,0.2)', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
            <div>
              <h2 id="modal-title" className="font-bold text-white text-lg">{project.title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{project.category}</p>
            </div>
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 transition-all"
                >
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  View Live
                </a>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                aria-label="Close project gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main image */}
          <div className="relative bg-black/40 overflow-hidden flex-shrink-0" style={{ height: '55vh' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={project.images[current]}
                alt={`${project.title} — screenshot ${current + 1} of ${project.images.length}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full object-contain"
              />
            </AnimatePresence>

            {/* Nav arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-xs text-white" aria-live="polite">
              {current + 1} / {project.images.length}
            </div>
          </div>

          {/* Thumbnails */}
          {project.images.length > 1 && (
            <div className="flex gap-2 px-4 py-3 overflow-x-auto border-t border-white/6 flex-shrink-0" role="list" aria-label="Screenshot thumbnails">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  role="listitem"
                  onClick={() => setCurrent(i)}
                  className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                    i === current ? 'border-cyan-400' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                  aria-label={`View screenshot ${i + 1}`}
                  aria-pressed={i === current}
                >
                  <img src={img} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          {/* Info footer */}
          <div className="px-6 py-4 border-t border-white/6 overflow-y-auto">
            <p className="text-sm text-slate-400 leading-relaxed mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs text-slate-500 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/8">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
