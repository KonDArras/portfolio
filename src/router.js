import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/";
}

// Hash-based routing needs no server rewrite rules, so it works on a plain
// S3 bucket without CloudFront error-document configuration. Page swaps use
// the native View Transitions API where the browser supports it.
export function useRoute() {
  const [route, setRoute] = useState(currentRoute());

  useEffect(() => {
    const onHashChange = () => {
      const next = currentRoute();
      transition(() => setRoute(next));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function transition(apply, originEvent) {
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const x = originEvent?.clientX ?? window.innerWidth / 2;
      const y = originEvent?.clientY ?? window.innerHeight / 2;
      document.documentElement.style.setProperty("--vt-x", `${x}px`);
      document.documentElement.style.setProperty("--vt-y", `${y}px`);
      document.startViewTransition(() => flushSync(apply));
    } else {
      apply();
    }
  }

  function navigate(path, originEvent) {
    if (path === route) return;
    transition(() => {
      window.history.pushState(null, "", `#${path}`);
      setRoute(path);
    }, originEvent);
  }

  return [route, navigate];
}
