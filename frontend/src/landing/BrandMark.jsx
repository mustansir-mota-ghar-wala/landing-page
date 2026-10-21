import { useId } from "react";

export default function BrandMark() {
  const uid = useId().replace(/:/g, "");
  const globe = `${uid}-globe`;
  const land = `${uid}-land`;
  const shine = `${uid}-shine`;
  const ring = `${uid}-ring`;
  const ball = `${uid}-ball`;
  const front = `${uid}-front`;

  return (
    <svg className="cine-mark" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <radialGradient id={globe} cx="32%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#b8ecff" />
          <stop offset="32%" stopColor="#3b82f6" />
          <stop offset="68%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0b1b4a" />
        </radialGradient>
        <linearGradient id={land} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2f3ff" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
        <linearGradient id={ring} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="45%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
        <radialGradient id={shine} cx="30%" cy="24%" r="55%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <clipPath id={ball}>
          <circle cx="24" cy="24" r="13.4" />
        </clipPath>
        <clipPath id={front}>
          <rect x="0" y="24" width="48" height="24" transform="rotate(-22 24 24)" />
        </clipPath>
      </defs>
      <ellipse
        cx="24"
        cy="24.4"
        rx="21.2"
        ry="7"
        fill="none"
        stroke={`url(#${ring})`}
        strokeWidth="1.7"
        transform="rotate(-22 24 24)"
        opacity="0.42"
      />
      <circle cx="24" cy="24" r="13.4" fill={`url(#${globe})`} />
      <g clipPath={`url(#${ball})`} fill={`url(#${land})`}>
        <path d="M14.8 19.2c2.2-1.4 4.6-1.1 6.1.5 1.3 1.4 3.2.5 4.6 1.3 1.2.7 2.4 2.1 1.6 3.5-.9.9-2.4.3-3.5.8-1.5.7-2.3 2.2-4 1.7-2-.5-2.6-2.6-3.4-4.3-.5-1.2-.8-2.4-1.4-3.5Z" />
        <path d="M27.6 28.2c1.8.2 3.6 1.3 3.9 3 .4 1.7-1 3-2.6 3.4-1.5.4-2.8-.5-3.6-1.6-.9-1.3-.4-3 .5-3.8.6-.6 1.2-1 1.8-1Z" />
        <path d="M18.8 32.2c1.6.9 3.4.6 4.6-.3.5 1.3-.2 2.6-1.5 3-1.5.5-2.8-.4-3.2-1.5Z" />
        <path d="M29.2 17.4c1.1.2 1.8 1.1 1.5 2-.4.8-1.4.9-2.2.5-.7-.4-.9-1.3-.5-1.9.3-.5.7-.7 1.2-.6Z" />
      </g>
      <circle cx="24" cy="24" r="13.4" fill={`url(#${shine})`} />
      <circle cx="24" cy="24" r="13.4" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="0.7" />
      <ellipse
        cx="24"
        cy="24.4"
        rx="21.2"
        ry="7"
        fill="none"
        stroke={`url(#${ring})`}
        strokeWidth="2.15"
        transform="rotate(-22 24 24)"
        clipPath={`url(#${front})`}
      />
    </svg>
  );
}
