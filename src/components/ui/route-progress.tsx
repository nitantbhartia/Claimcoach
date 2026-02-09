"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin progress bar at the top of the page during route changes.
 * Purely CSS-driven — no external dependencies.
 */
export function RouteProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPathname = useRef(pathname);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(() => {
    setProgress(0);
    setVisible(true);
    // Quick jump to ~30%, then slow crawl
    setTimeout(() => setProgress(30), 50);
    timer.current = setTimeout(() => setProgress(60), 300);
  }, []);

  const finish = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  }, []);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      start();
      // Complete quickly since the page has already loaded
      const done = setTimeout(finish, 150);
      prevPathname.current = pathname;
      return () => clearTimeout(done);
    }
  }, [pathname, start, finish]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none"
      role="progressbar"
      aria-valuenow={progress}
    >
      <div
        className="h-full bg-coral transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? "200ms" : "400ms",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
