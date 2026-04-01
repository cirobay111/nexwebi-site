import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock } from 'lucide-react';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const categoryColors = {
  Strategy:  { bg: '#22d3ee18', text: '#22d3ee', border: '#22d3ee30' },
  Business:  { bg: '#f59e0b18', text: '#f59e0b', border: '#f59e0b30' },
  Technical: { bg: '#818cf818', text: '#818cf8', border: '#818cf830' },
  Stratégie: { bg: '#22d3ee18', text: '#22d3ee', border: '#22d3ee30' },
  Technique: { bg: '#818cf818', text: '#818cf8', border: '#818cf830' },
};

const defaultColor = { bg: '#64748b18', text: '#94a3b8', border: '#64748b30' };

export default function ArticleModal({ article, minRead, onClose }) {
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);
  const color = categoryColors[article.category] || defaultColor;

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      panelRef.current?.querySelector(FOCUSABLE)?.focus();
    }, 50);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
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
  }, [onClose]);

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
        aria-labelledby="article-modal-title"
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" aria-hidden="true" />

        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-2xl glass-card rounded-2xl overflow-hidden flex flex-col"
          style={{ border: '1px solid rgba(34,211,238,0.15)', maxHeight: '90vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-white/8 flex-shrink-0">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                >
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {article.readTime} {minRead}
                </span>
              </div>
              <h2 id="article-modal-title" className="text-xl font-bold text-white leading-snug">
                {article.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 overflow-y-auto">
            {article.body.map((block, i) => {
              if (block.type === 'h3') {
                return (
                  <h3 key={i} className="text-base font-bold text-white mt-6 mb-2 first:mt-0" style={{ color: color.text }}>
                    {block.text}
                  </h3>
                );
              }
              return (
                <p key={i} className="text-sm text-slate-400 leading-relaxed mb-4">
                  {block.text}
                </p>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
