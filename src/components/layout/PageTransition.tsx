"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Route transition: a red→blue curtain wipes across while the
 * incoming page fades up. Skipped entirely under reduced motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* curtain */}
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] origin-left"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.72, ease: [0.83, 0, 0.17, 1] }}
          style={{
            background:
              "linear-gradient(100deg, var(--color-signal-700) 0%, var(--color-ink-950) 45%, var(--color-brand-800) 100%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
