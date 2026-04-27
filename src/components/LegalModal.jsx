import { useEffect } from 'react';

export default function LegalModal({ type, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!type) return null;
  const isPrivacy = type === 'privacy';

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(2,8,23,0.85)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px', overflowY: 'auto',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 680,
        background: 'rgba(12,20,40,0.97)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24,
        boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
        position: 'relative', overflow: 'hidden',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.4), transparent)' }} />
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, zIndex: 10,
          width: 32, height: 32, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          color: '#64748b', cursor: 'pointer', fontSize: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s', fontFamily: 'inherit',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#f1f5f9'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#64748b'; }}>
          ✕
        </button>
        <div style={{ overflowY: 'auto', flex: 1, padding: '48px 40px 40px' }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#22d3ee', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{isPrivacy ? 'Privacy Policy' : 'Terms of Service'}</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.03em', marginBottom: 28 }}>{isPrivacy ? 'Privacy Policy' : 'Terms of Service'}</h2>

          {isPrivacy ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                ['Data We Collect', 'We collect information you provide directly — name, email, project details via our contact form. We also collect usage analytics (via Google Analytics) to improve our service.'],
                ['How We Use It', 'Your data is used solely to respond to your inquiry and deliver our services. We never sell, rent, or share your personal information with third parties for marketing purposes.'],
                ['Data Retention', 'We retain your data for as long as necessary to provide our services and comply with legal obligations. You may request deletion at any time by emailing nexwebi4@gmail.com.'],
                ['Cookies', 'We use essential cookies for site functionality and analytics cookies (Google Analytics) to understand how visitors use our site. You can opt out via your browser settings.'],
                ['Contact', 'For any privacy concerns, contact us at nexwebi4@gmail.com. We respond within 48 hours.'],
              ].map(([title, text]) => (
                <div key={title}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.75, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                ['Services', 'NexWebi provides web development, SaaS development, automation, and related digital services. All work is delivered per the agreed project scope.'],
                ['Payment', '50% deposit required before work begins. Remaining 50% due upon project delivery. For milestone-based projects, payments align with deliverable completion.'],
                ['Intellectual Property', 'Upon final payment, you receive full ownership of all custom code, designs, and assets created for your project. Open-source libraries retain their respective licenses.'],
                ['Revisions', 'Each plan includes a defined number of revision rounds. Additional revisions beyond scope are billed at our hourly rate, agreed upon in advance.'],
                ['Limitation of Liability', 'NexWebi is not liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount paid for the specific service.'],
                ['Governing Law', 'These terms are governed by applicable law. Disputes will be resolved through good-faith negotiation first, then binding arbitration if necessary.'],
              ].map(([title, text]) => (
                <div key={title}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.75, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          )}
          <p style={{ marginTop: 32, fontSize: 12, color: '#334155', textAlign: 'center' }}>Last updated: April 2026 · nexwebi4@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
