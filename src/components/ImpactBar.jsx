import { useLanguage } from '../context/LanguageContext';

export default function ImpactBar() {
  const { t } = useLanguage();
  const labels = t.impactBar.stats;
  const values = t.impactBar.values;

  return (
    <div style={{
      padding: '28px 24px',
      background: 'rgba(34,211,238,0.03)',
      borderTop: '1px solid rgba(34,211,238,0.07)',
      borderBottom: '1px solid rgba(34,211,238,0.07)',
    }}>
      <div style={{ maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(32px, 6vw, 80px)' }}>
        {values.map((value, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, letterSpacing: '-0.04em', background: 'linear-gradient(135deg,#22d3ee,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{value}</div>
            <div style={{ fontSize: 12, color: '#475569', marginTop: 4, letterSpacing: '0.03em' }}>{labels[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
