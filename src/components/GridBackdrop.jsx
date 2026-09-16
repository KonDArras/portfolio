import { useRef } from "react";

export default function GridBackdrop() {
  const ref = useRef(null);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", `${e.clientX}px`);
    el.style.setProperty("--my", `${e.clientY}px`);
  }

  return <div className="grid-bg" ref={ref} onPointerMove={handleMove} aria-hidden="true" />;
}
