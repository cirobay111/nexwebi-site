import { useEffect } from 'react';

const catColors = { Strategy: '#22d3ee', Business: '#818cf8', Technical: '#34d399' };

const bodies = {
  'Why Your Website Is Costing You Customers': [
    { type: 'p', text: "You paid for a website. You launched it. And then... nothing. No calls, no inquiries, no sales. Here's the uncomfortable truth: most business websites actively repel customers instead of attracting them." },
    { type: 'h3', text: '1. It loads too slowly' },
    { type: 'p', text: "Google's data shows 53% of mobile users leave a site that takes more than 3 seconds to load. Every second of delay costs you roughly 7% in conversions. If your site takes 6 seconds, you've already lost a third of your visitors before they've seen a single word." },
    { type: 'h3', text: "2. There's no clear call-to-action" },
    { type: 'p', text: "Visitors don't browse — they scan. If they can't figure out what to do next within 5 seconds, they leave. One primary CTA per page, above the fold, in a color that contrasts with your background. That's it." },
    { type: 'h3', text: '3. It breaks on mobile' },
    { type: 'p', text: "Over 60% of web traffic is mobile. If your site was designed on a desktop and \"kind of works\" on a phone, you're handing customers to your competitors. Mobile-first isn't optional anymore — it's the baseline." },
    { type: 'h3', text: '4. You have no trust signals' },
    { type: 'p', text: "Would you hand money to a stranger with no reviews, no address, and no face? Neither will your visitors. Client logos, testimonials, case studies, a real email address — these aren't decorations, they're conversion tools." },
    { type: 'h3', text: "5. Google can't find you" },
    { type: 'p', text: "A beautiful website that ranks on page 4 is invisible. Basic SEO — title tags, meta descriptions, heading structure, page speed — should be built in from day one, not bolted on as an afterthought." },
    { type: 'p', text: "The good news: all five of these problems are fixable. Most of them within a week. If your site has any of these issues, fix them before spending another cent on ads or social media." },
  ],
  'The Real Cost of a Cheap Website': [
    { type: 'p', text: "We've seen it dozens of times. A business owner finds a $300 template, spends a weekend setting it up, and feels like they got a great deal. Then 6 months pass and the site has generated exactly zero leads." },
    { type: 'h3', text: 'The opportunity cost nobody talks about' },
    { type: 'p', text: "A website that converts at 1% instead of 3% doesn't just feel worse — it literally cuts your revenue by two thirds. If you're getting 500 visitors a month and your average sale is $500, that's a difference of $5,000 per month. Every month." },
    { type: 'h3', text: 'Templates destroy your SEO' },
    { type: 'p', text: "Page builders like Wix and Squarespace generate bloated HTML that Google struggles to index efficiently. Hundreds of unused CSS classes, render-blocking scripts, and unoptimized images mean your Core Web Vitals score tanks — and so does your ranking." },
    { type: 'h3', text: "You don't own anything" },
    { type: 'p', text: "With most website builders, the moment you stop paying, your site disappears. You can't export your design, your data is locked in their system, and you have zero flexibility to add custom features." },
    { type: 'h3', text: 'Maintenance becomes a nightmare' },
    { type: 'p', text: "Template sites depend on plugins — and plugins break. Security vulnerabilities go unpatched. Updates conflict with each other. A site that cost $300 to build ends up costing $200/month in developer time to keep from falling apart." },
    { type: 'p', text: "A custom-built site is an asset. A template is a liability dressed up as a bargain. Invest once in something that works — and actually grows your business." },
  ],
  "How We Cut a Client's Load Time by 80%": [
    { type: 'p', text: "The client came to us frustrated. They had a car rental platform in Marrakech — beautiful design, real inventory, legitimate business — but almost no online bookings. After the first audit, we understood why: the site was loading in 11.4 seconds on a standard mobile connection." },
    { type: 'h3', text: 'The diagnosis' },
    { type: 'p', text: "Using Lighthouse and WebPageTest, we identified three main culprits. First: 47 unoptimized images, some over 4MB each, loading all at once. Second: no CDN — every asset was being served from a single origin server in Europe. Third: all JavaScript was loading synchronously, blocking the first paint entirely." },
    { type: 'h3', text: 'What we changed' },
    { type: 'p', text: "We rebuilt the image pipeline using WebP format with automatic quality adjustment, cutting image payload from 18MB to 2.1MB. We implemented lazy loading so only above-the-fold images load immediately. We moved all static assets to a CDN with edge nodes in Africa and Europe, cutting latency by 60%." },
    { type: 'h3', text: 'The results' },
    { type: 'p', text: "Load time dropped from 11.4 seconds to 1.9 seconds — an 83% improvement. Bounce rate fell from 74% to 31%. And within 30 days of the new site going live, monthly bookings tripled. Same traffic, same prices, same product — just a site that actually loads." },
    { type: 'p', text: "Performance isn't a developer obsession. It's a revenue lever. Every 100ms of improvement increases conversion rates by roughly 1%. If your site is slow, you're leaving money on the table every single day." },
  ],
};

export default function ArticleModal({ article, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!article) return null;
  const color = catColors[article.cat] || '#22d3ee';
  const body = bodies[article.title] || [];

  const scrollToContact = () => {
    onClose();
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(2,8,23,0.85)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px', overflowY: 'auto',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 700,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <span style={{ padding: '3px 12px', borderRadius: 100, background: `${color}12`, color, border: `1px solid ${color}25`, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>{article.cat}</span>
            <span style={{ fontSize: 12, color: '#334155' }}>{article.time}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 32 }}>{article.title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {body.map((block, i) => (
              block.type === 'h3'
                ? <h3 key={i} style={{ fontSize: 17, fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.02em', marginTop: 8 }}>{block.text}</h3>
                : <p key={i} style={{ fontSize: 15, color: '#64748b', lineHeight: 1.8, margin: 0 }}>{block.text}</p>
            ))}
          </div>
          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'center' }}>
            <button onClick={scrollToContact} style={{
              padding: '13px 28px', borderRadius: 100,
              background: '#22d3ee', color: '#020817', border: 'none',
              cursor: 'pointer', fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
              boxShadow: '0 0 24px rgba(34,211,238,0.4)',
            }}>Start Your Project →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
