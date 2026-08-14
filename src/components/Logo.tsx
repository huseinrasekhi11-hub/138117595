export default function Logo({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D9488" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="logoGrad2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#logoGrad)" />
      {/* kinematic skeleton nodes */}
      <circle cx="24" cy="14" r="3.5" fill="white" />
      <circle cx="14" cy="22" r="2.5" fill="white" />
      <circle cx="34" cy="22" r="2.5" fill="white" />
      <circle cx="10" cy="30" r="2" fill="white" opacity="0.8" />
      <circle cx="38" cy="30" r="2" fill="white" opacity="0.8" />
      <circle cx="8" cy="36" r="1.8" fill="white" opacity="0.6" />
      <circle cx="40" cy="36" r="1.8" fill="white" opacity="0.6" />
      <circle cx="18" cy="30" r="2.5" fill="white" />
      <circle cx="30" cy="30" r="2.5" fill="white" />
      <circle cx="16" cy="38" r="3" fill="#22D3EE" />
      <circle cx="32" cy="38" r="3" fill="#22D3EE" />
      <circle cx="15" cy="44" r="1.8" fill="white" opacity="0.7" />
      <circle cx="33" cy="44" r="1.8" fill="white" opacity="0.7" />
      {/* connecting lines */}
      <g stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.9">
        <line x1="24" y1="14" x2="14" y2="22" />
        <line x1="24" y1="14" x2="34" y2="22" />
        <line x1="14" y1="22" x2="10" y2="30" />
        <line x1="34" y1="22" x2="38" y2="30" />
        <line x1="10" y1="30" x2="8" y2="36" />
        <line x1="38" y1="30" x2="40" y2="36" />
        <line x1="14" y1="22" x2="34" y2="22" />
        <line x1="18" y1="30" x2="30" y2="30" />
        <line x1="14" y1="22" x2="18" y2="30" />
        <line x1="34" y1="22" x2="30" y2="30" />
      </g>
      <g stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round">
        <line x1="18" y1="30" x2="16" y2="38" />
        <line x1="30" y1="30" x2="32" y2="38" />
        <line x1="16" y1="38" x2="15" y2="44" />
        <line x1="32" y1="38" x2="33" y2="44" />
      </g>
      <path d="M6 24 L16 24 L19 18 L22 30 L25 14 L28 32 L31 22 L42 22" stroke="url(#logoGrad2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
    </svg>
  );
}
