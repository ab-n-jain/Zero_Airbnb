// Placeholder illustrations. The reply's `art` field picks the picture.

function Machiya() {
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Townhouse illustration">
      <rect width="400" height="220" fill="#fbdcd6" />
      <circle cx="312" cy="58" r="30" fill="#ff9a76" />
      <rect y="180" width="400" height="40" fill="#e9b9ac" />
      <rect x="62" y="150" width="6" height="34" fill="#7a4a3a" />
      <circle cx="65" cy="138" r="24" fill="#f58aa5" />
      <polygon points="110,112 200,62 290,112" fill="#4a2f2a" />
      <rect x="122" y="112" width="156" height="72" fill="#7a4a3a" />
      <rect x="136" y="124" width="30" height="46" fill="#ffd98a" />
      <rect x="174" y="124" width="30" height="46" fill="#ffd98a" />
      <rect x="226" y="124" width="38" height="60" fill="#4a2f2a" />
      <path d="M151 124v46M189 124v46M136 147h68" stroke="#7a4a3a" strokeWidth="3" />
    </svg>
  );
}

function Tea() {
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Tea bowl illustration">
      <rect width="200" height="200" fill="#c5ebe2" />
      <circle cx="100" cy="100" r="78" fill="#a3ddd0" />
      <path d="M40 96h120a60 60 0 0 1-120 0z" fill="#1f3a36" />
      <ellipse cx="100" cy="96" rx="60" ry="14" fill="#6fae4f" />
      <ellipse cx="100" cy="96" rx="44" ry="8" fill="#8cc765" />
      <rect x="80" y="156" width="40" height="8" rx="4" fill="#1f3a36" />
    </svg>
  );
}

function Ramen() {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Ramen bowl illustration">
      <rect width="200" height="200" fill="#ffe7b8" />
      <circle cx="100" cy="100" r="84" fill="#fff6e0" />
      <circle cx="100" cy="100" r="62" fill="#2b2320" />
      <circle cx="100" cy="100" r="52" fill="#e0a04a" />
      <path d="M62 92q12-12 24 0t24 0 24 0M66 110q12-12 24 0t24 0 20 0" fill="none" stroke="#f6dc9a" strokeWidth="5" strokeLinecap="round" />
      <circle cx="122" cy="80" r="13" fill="#fff" />
      <circle cx="122" cy="80" r="6" fill="#f2a01f" />
      <rect x="68" y="118" width="26" height="14" rx="3" fill="#2f5d3a" />
      <path d="M150 34l-34 62M164 42l-40 58" stroke="#8a5a2b" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function Fallback() {
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Placeholder illustration">
      <rect width="200" height="200" fill="#ebe7e4" />
      <circle cx="100" cy="100" r="40" fill="#d6d0cb" />
    </svg>
  );
}

const PICTURES: Record<string, () => React.JSX.Element> = {
  machiya: Machiya,
  tea: Tea,
  ramen: Ramen,
};

export default function Art({ name }: { name: string }) {
  const Picture = PICTURES[name] ?? Fallback;
  return <Picture />;
}
