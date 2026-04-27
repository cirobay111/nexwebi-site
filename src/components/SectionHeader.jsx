export default function SectionHeader({ eyebrow, title, highlight, subtitle, id }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', marginBottom: 64 }}>
      <div style={{
        display: 'inline-block', padding: '4px 14px', borderRadius: 100,
        background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)',
        fontSize: 11, fontWeight: 700, color: '#22d3ee',
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20,
      }}>{eyebrow}</div>
      <h2 id={id} style={{
        fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800,
        letterSpacing: '-0.04em', lineHeight: 1.08, color: '#f8fafc', marginTop: 0, marginBottom: 16,
      }}>
        {title}{' '}
        <span style={{ background: 'linear-gradient(135deg,#22d3ee,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{highlight}</span>
      </h2>
      <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, marginTop: 0, marginBottom: 0, fontWeight: 400 }}>{subtitle}</p>
    </div>
  );
}
