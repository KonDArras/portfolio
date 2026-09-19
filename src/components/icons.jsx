const common = { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };

export function IconMountain() {
  return (
    <svg {...common} aria-hidden="true">
      <path d="M2 16 L7.5 6 L11 11.5 L13 8.5 L18 16 Z" />
      <circle cx="14.5" cy="5" r="1.6" />
    </svg>
  );
}

export function IconStopwatch() {
  return (
    <svg {...common} aria-hidden="true">
      <circle cx="10" cy="11" r="6.5" />
      <path d="M10 11 L10 7.5 M8 2.5 h4 M15.5 5 l1 -1" />
    </svg>
  );
}

export function IconDice() {
  return (
    <svg {...common} aria-hidden="true">
      <path d="M10 2 L17 6 L17 14 L10 18 L3 14 L3 6 Z" />
      <path d="M10 2 V10 M3 6 L10 10 L17 6 M10 10 V18" />
    </svg>
  );
}

export function IconMug() {
  return (
    <svg {...common} aria-hidden="true">
      <path d="M4 6 h9 v8 a2 2 0 0 1 -2 2 H6 a2 2 0 0 1 -2 -2 Z" />
      <path d="M13 8 h2 a2 2 0 0 1 0 4 h-2" />
      <path d="M6 4 q1 -1.5 2 0 M9 4 q1 -1.5 2 0" />
    </svg>
  );
}

export function IconWave() {
  return (
    <svg {...common} aria-hidden="true">
      <path d="M2 9 q2 -3 4 0 t4 0 t4 0 t4 0" />
      <path d="M2 14 q2 -3 4 0 t4 0 t4 0 t4 0" />
    </svg>
  );
}
