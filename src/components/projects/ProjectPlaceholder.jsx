function hueOf(name) {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360
  return h
}

export default function ProjectPlaceholder({ name, live, mobile }) {
  const h = hueOf(name)
  const a = 220 + (h % 60)
  const b = 300 + (h % 50)
  const addr = live || (mobile ? `${name} · mobile app` : `github.com/dheerajtp/${name}`)
  const text = addr.length > 34 ? `${addr.slice(0, 33)}…` : addr
  const gid = `g${h}`
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Placeholder preview for ${name}`}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`hsl(${a} 90% 62%)`} />
          <stop offset="1" stopColor={`hsl(${b} 90% 58%)`} />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${gid})`} />
      <rect x="28" y="22" width="264" height="168" rx="10" fill="#fff" opacity=".96" />
      <rect x="28" y="22" width="264" height="22" rx="10" fill="#e8eaf2" />
      <rect x="28" y="34" width="264" height="10" fill="#e8eaf2" />
      <circle cx="42" cy="33" r="3" fill="#ff6b6b" />
      <circle cx="52" cy="33" r="3" fill="#fbbf24" />
      <circle cx="62" cy="33" r="3" fill="#34d399" />
      <rect x="76" y="28" width="150" height="10" rx="5" fill="#fff" />
      <text x="82" y="36" fontSize="6.5" fill="#667" fontFamily="sans-serif">{text}</text>
      <rect x="44" y="58" width="110" height="10" rx="5" fill={`hsl(${a} 70% 40%)`} />
      <rect x="44" y="76" width="170" height="6" rx="3" fill="#d6d9e6" />
      <rect x="44" y="88" width="140" height="6" rx="3" fill="#d6d9e6" />
      <rect x="44" y="108" width="72" height="56" rx="6" fill={`hsl(${a} 85% 92%)`} />
      <rect x="124" y="108" width="72" height="56" rx="6" fill={`hsl(${b} 85% 92%)`} />
      <rect x="204" y="108" width="72" height="56" rx="6" fill={`hsl(${a} 85% 92%)`} />
    </svg>
  )
}
