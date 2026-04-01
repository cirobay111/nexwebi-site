import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  lastUpdated: 'April 1, 2026',
  sections: [
    {
      heading: '1. Who We Are',
      text: 'NexWebi ("we", "us", "our") is a web agency operating at nexwebi.com. We build websites, SaaS platforms, and automation systems for clients worldwide. For any privacy-related questions, contact us at nexwebi4@gmail.com.',
    },
    {
      heading: '2. Information We Collect',
      text: 'We collect information you voluntarily provide through our contact form: your name, email address, and message. We do not collect any information automatically beyond what Google Analytics provides (see section 4).',
    },
    {
      heading: '3. How We Use Your Information',
      text: 'We use the information you submit through our contact form solely to respond to your inquiry and discuss potential projects. We do not use your information for marketing without your consent, and we never sell your data to third parties.',
    },
    {
      heading: '4. Google Analytics',
      text: 'We use Google Analytics to understand how visitors interact with our website. This collects anonymized data such as pages visited, time spent, and general geographic location (country level). No personally identifiable information is collected by Google Analytics. You can opt out by installing the Google Analytics Opt-out Browser Add-on.',
    },
    {
      heading: '5. Data Retention',
      text: 'Contact form submissions are retained in our email inbox and are not stored in any database. We retain emails for as long as they are relevant to our business relationship with you.',
    },
    {
      heading: '6. Your Rights',
      text: 'You have the right to request access to, correction of, or deletion of any personal data we hold about you. To exercise these rights, email us at nexwebi4@gmail.com and we will respond within 30 days.',
    },
    {
      heading: '7. Cookies',
      text: 'We use only essential cookies and Google Analytics cookies. We do not use advertising or tracking cookies. By using our site, you consent to this limited use of cookies.',
    },
    {
      heading: '8. Changes to This Policy',
      text: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the new policy.',
    },
  ],
};

const TERMS_OF_SERVICE = {
  title: 'Terms of Service',
  lastUpdated: 'April 1, 2026',
  sections: [
    {
      heading: '1. Acceptance of Terms',
      text: 'By accessing nexwebi.com, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.',
    },
    {
      heading: '2. Services',
      text: 'NexWebi provides web design, web development, SaaS development, automation, and related digital services. All services are provided under separate client agreements that take precedence over these general terms.',
    },
    {
      heading: '3. Intellectual Property',
      text: 'All content on this website — including text, graphics, logos, and code — is the property of NexWebi unless otherwise stated. You may not reproduce or distribute any content without our written permission. For client projects, ownership of deliverables is defined in the individual project agreement.',
    },
    {
      heading: '4. No Warranties',
      text: 'This website is provided "as is" without any warranties of any kind. We do not guarantee that the site will be error-free, uninterrupted, or free of harmful components. We are not responsible for any damages resulting from your use of this site.',
    },
    {
      heading: '5. Limitation of Liability',
      text: 'NexWebi shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or our services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.',
    },
    {
      heading: '6. Contact Form',
      text: 'Submitting a message through our contact form does not constitute a binding contract or guarantee of service. All engagements are formalized through a separate written agreement.',
    },
    {
      heading: '7. Governing Law',
      text: 'These terms are governed by applicable law. Any disputes shall be resolved through good-faith negotiation before pursuing formal legal action.',
    },
    {
      heading: '8. Changes to Terms',
      text: 'We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated date. Continued use of the site constitutes acceptance.',
    },
  ],
};

export const LEGAL_DOCS = { privacy: PRIVACY_POLICY, terms: TERMS_OF_SERVICE };

export default function LegalModal({ type, onClose }) {
  const doc = LEGAL_DOCS[type];
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

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

  if (!doc) return null;

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
        aria-labelledby="legal-modal-title"
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
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 flex-shrink-0">
            <div>
              <h2 id="legal-modal-title" className="text-lg font-bold text-white">{doc.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Last updated: {doc.lastUpdated}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 overflow-y-auto space-y-5">
            {doc.sections.map((section, i) => (
              <div key={i}>
                <h3 className="text-sm font-bold text-cyan-400 mb-1.5">{section.heading}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{section.text}</p>
              </div>
            ))}
            <p className="text-xs text-slate-600 pt-2 border-t border-white/6">
              For questions, contact us at{' '}
              <a href="mailto:nexwebi4@gmail.com" className="text-cyan-400 hover:underline">
                nexwebi4@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
