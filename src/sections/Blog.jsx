import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ArticleModal from '../components/ArticleModal';
import { useLanguage } from '../context/LanguageContext';

const catColors = { Strategy: '#22d3ee', Business: '#818cf8', Technical: '#34d399' };

function BlogCard({ cat, catKey, time, title, excerpt, onRead, readLabel }) {
  const [hovered, setHovered] = useState(false);
  const color = catColors[catKey] || catColors[cat] || '#22d3ee';
  return (
    <div onClick={() => onRead && onRead({ cat, time, title })} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      position: 'relative', borderRadius: 20, padding: '28px 26px', cursor: 'pointer',
      background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(16px)',
      border: hovered ? '1px solid rgba(34,211,238,0.18)' : '1px solid rgba(255,255,255,0.07)',
      boxShadow: hovered ? '0 16px 50px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.1)',
      transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      transition: 'all 0.25s cubic-bezier(0.25,0.1,0.25,1)',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: hovered ? `linear-gradient(90deg, transparent, ${color}60, transparent)` : 'transparent', transition: 'background 0.3s' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ padding: '3px 10px', borderRadius: 100, background: `${color}12`, color, border: `1px solid ${color}25`, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em' }}>{cat}</span>
        <span style={{ fontSize: 11.5, color: '#334155' }}>{time}</span>
      </div>
      <h3 style={{ fontSize: 16.5, fontWeight: 700, color: hovered ? '#a5f3fc' : '#f1f5f9', marginBottom: 12, letterSpacing: '-0.02em', lineHeight: 1.35, transition: 'color 0.2s' }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.7, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{excerpt}</p>
      <div style={{ marginTop: 18, fontSize: 12.5, fontWeight: 600, color, opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(4px)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 4 }}>
        {readLabel} <span style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.2s', display: 'inline-block' }}>→</span>
      </div>
    </div>
  );
}

export default function Blog() {
  const { t } = useLanguage();
  const b = t.blog;
  const [activeArticle, setActiveArticle] = useState(null);
  return (
    <section id="blog" style={{ padding: 'clamp(64px,7vw,96px) 24px' }}>
      <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
        <SectionHeader eyebrow={b.eyebrow} title={b.title} highlight={b.highlight} subtitle={b.sub} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {b.articles.map(a => <BlogCard key={a.title} cat={b.categories[a.catKey] || a.catKey} catKey={a.catKey} time={`${a.time} ${b.timeUnit}`} title={a.title} excerpt={a.excerpt} onRead={setActiveArticle} readLabel={b.readArticle} />)}
        </div>
      </div>
      {activeArticle && <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />}
    </section>
  );
}
