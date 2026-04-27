export default function ImpactBar() {
  const stats = [
    { value: '$2M+', label: 'Revenue generated for clients' },
    { value: '50+', label: 'Projects shipped' },
    { value: '7', label: 'Countries served' },
    { value: '< 14 days', label: 'Average delivery time' },
  ];

  return (
    <div style={{
      padding: '28px 24px',
      background: 'rgba(34,211,238,0.03)',
      borderTop: '1px solid rgba(34,211,238,0.07)',
      borderBottom: '1px solid rgba(34,211,238,0.07)',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(32px, 6vw, 80px)' }}>
        {stats.map(({ value, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, letterSpacing: '-0.04em', background: 'linear-gradient(135deg,#22d3ee,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{value}</div>
            <div style={{ fontSize: 12, color: '#475569', marginTop: 4, letterSpacing: '0.03em' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
