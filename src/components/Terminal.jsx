import { useEffect, useRef, useState } from "react";

// Types out a scripted deploy sequence, line by line, looping forever.
// Falls back to the static finished transcript under reduced motion.
export default function Terminal({ script }) {
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLines(script.flatMap((s) => [{ type: "cmd", text: s.cmd }, ...s.out.map((o) => ({ type: "out", text: o }))]));
      return;
    }

    let cancelled = false;
    let timer;
    const wait = (ms) => new Promise((r) => (timer = setTimeout(r, ms)));

    async function play() {
      while (!cancelled) {
        for (const { cmd, out } of script) {
          setTyping("");
          for (let i = 1; i <= cmd.length; i++) {
            if (cancelled) return;
            setTyping(cmd.slice(0, i));
            await wait(28);
          }
          await wait(280);
          if (cancelled) return;
          setLines((prev) => [...prev, { type: "cmd", text: cmd }]);
          setTyping("");
          for (const line of out) {
            if (cancelled) return;
            await wait(200);
            setLines((prev) => [...prev, { type: "out", text: line }]);
          }
          await wait(500);
        }
        await wait(2200);
        if (cancelled) return;
        setLines([]);
      }
    }

    play();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [script]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing]);

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot-r" />
        <span className="terminal-dot terminal-dot-y" />
        <span className="terminal-dot terminal-dot-g" />
        <span className="terminal-title">christos@prod — deploy.sh</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((l, i) =>
          l.type === "cmd" ? (
            <div className="terminal-cmd" key={i}>
              <span className="terminal-prompt">$</span> {l.text}
            </div>
          ) : (
            <div className="terminal-out" key={i}>
              {l.text}
            </div>
          )
        )}
        {typing && (
          <div className="terminal-cmd">
            <span className="terminal-prompt">$</span> {typing}
            <span className="terminal-caret" />
          </div>
        )}
      </div>
    </div>
  );
}
