import { useCallback, useEffect, useRef, useState } from "react";

// Cycles through `words`, typing and deleting one character at a time.
export function useTypewriter(words, { typeMs = 55, deleteMs = 30, holdMs = 1600 } = {}) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }
    const current = words[wordIndex % words.length];
    let delay = deleting ? deleteMs : typeMs;

    if (!deleting && text === current) {
      delay = holdMs;
    }

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
        return;
      }
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words, typeMs, deleteMs, holdMs]);

  return text;
}

// Adds a "visible" class once an element scrolls into view, then leaves it alone.
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

// Tracks which section id is currently in view, for nav highlighting.
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// Tracks pointer position within an element as CSS vars, driving a
// cursor-following highlight (see .spotlight in index.css). Cheap: pure CSS
// custom-property writes, no re-render per move.
export function useSpotlight() {
  const onPointerMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  }, []);

  return { onPointerMove };
}

// Types out `texts` one at a time, oldest (index 0) first, only starting
// once `start` is true. Returns how many are fully typed (`shownCount`) and
// the in-progress text of whichever one is currently being typed.
export function useSequentialTyping(texts, start) {
  const [shownCount, setShownCount] = useState(0);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShownCount(texts.length);
      return;
    }

    let cancelled = false;
    let timer;
    const wait = (ms) => new Promise((resolve) => (timer = setTimeout(resolve, ms)));

    async function run() {
      for (let i = 0; i < texts.length; i++) {
        setTyping("");
        for (let c = 1; c <= texts[i].length; c++) {
          if (cancelled) return;
          setTyping(texts[i].slice(0, c));
          await wait(26);
        }
        if (cancelled) return;
        await wait(250);
        if (cancelled) return;
        setShownCount(i + 1);
        setTyping("");
        await wait(350);
      }
    }

    run();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [start, texts]);

  return { shownCount, typing };
}

// Counts a number up from 0 once it scrolls into view.
export function useCountUp(target, visible, durationMs = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, target, durationMs]);

  return value;
}
