type IconProps = { className?: string; style?: React.CSSProperties };

export const MoonIcon = (p: IconProps) => (
  <svg className={p.className} style={p.style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.5 14.2A8.2 8.2 0 1 1 9.8 3.5a6.4 6.4 0 0 0 10.7 10.7Z" fill="currentColor" stroke="none" opacity="0.92" />
    <circle cx="15.5" cy="7" r="0.9" fill="var(--bg)" stroke="none" />
  </svg>
);

export const ArrowR = (p: IconProps) => (
  <svg className={p.className} style={p.style} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowL = (p: IconProps) => (
  <svg className={p.className} style={p.style} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const SendIcon = (p: IconProps) => (
  <svg className={p.className} style={p.style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 3.5 11 14M21.5 3.5 15 21l-4-7-7-4 17.5-6.5Z" />
  </svg>
);

export const LinkIcon = (p: IconProps) => (
  <svg className={p.className} style={p.style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 15l6-6M10.5 6.5l1-1a4 4 0 0 1 6 6l-1 1M13.5 17.5l-1 1a4 4 0 0 1-6-6l1-1" />
  </svg>
);

export const MessageIcon = (p: IconProps) => (
  <svg className={p.className} style={p.style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.4 8.4 0 0 1-12 7.6L3 21l1.9-5.5A8.4 8.4 0 1 1 21 11.5Z" />
  </svg>
);

export const StoryIcon = (p: IconProps) => (
  <svg className={p.className} style={p.style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="3" width="12" height="18" rx="3" /><path d="M10 7h4" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg className={p.className} style={p.style} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <svg className={p.className} style={p.style} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg className={p.className} style={p.style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20s-7-4.3-9.3-8.6C1 8 2.8 4.7 6 4.7c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.2 0 5 3.3 3.3 6.7C19 15.7 12 20 12 20Z" />
  </svg>
);
