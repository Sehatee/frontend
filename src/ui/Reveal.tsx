"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** entrance offset on Y axis (px) */
  y?: number;
  /** entrance offset on X axis (px) */
  x?: number;
  /** delay in seconds (use for stagger) */
  delay?: number;
  /** duration in seconds */
  duration?: number;
  /** animate once when scrolled into view */
  once?: boolean;
}

/**
 * Usage: <Reveal delay={i*0.1}>...</Reveal>
 *
 * Hydration-safe scroll reveal. Respects prefers-reduced-motion: when the user
 * prefers reduced motion (or before mount on the server) it renders a plain
 * <div> with no animation — only transform + opacity are animated.
 */
const Reveal = ({
  children,
  className,
  y = 24,
  x = 0,
  delay = 0,
  duration = 0.6,
  once = true,
}: RevealProps) => {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canAnimate = mounted && !reduce;

  if (!canAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
