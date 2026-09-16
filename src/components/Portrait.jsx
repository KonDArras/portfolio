import { useRef, useState } from "react";

const REDUCE_MOTION = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Portrait() {
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);

  function handleMove(e) {
    if (REDUCE_MOTION()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(400px) rotateY(${px * 16}deg) rotateX(${-py * 16}deg)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }

  return (
    <div className="portrait" ref={ref} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <span className="portrait-tick portrait-tick-tl" aria-hidden="true" />
      <span className="portrait-tick portrait-tick-br" aria-hidden="true" />
      {!failed ? (
        <img
          src={`${import.meta.env.BASE_URL}profile.jpg`}
          alt="Christos Karagiannis"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="portrait-fallback" aria-hidden="true">
          CK
        </span>
      )}
    </div>
  );
}
