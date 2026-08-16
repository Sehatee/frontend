"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

// دالة العد التصاعدي بدون مكتبات — نفس نمط Home/LastFeatures.tsx
const useCountUp = (end: number, duration: number, start: boolean) => {
  const [count, setCount] = useState(0);
  const increment = end / (duration * 60); // 60 إطار في الثانية

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        clearInterval(interval);
        setCount(end);
      } else {
        setCount(current);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [start]);

  return count;
};

function Card({
  title,
  value,
  href,
  icon: Icon,
}: {
  title: string;
  value: number;
  href: string;
  icon: LucideIcon;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const isNumeric = typeof value === "number" && Number.isFinite(value);
  const count = useCountUp(isNumeric ? value : 0, 0.9, inView && isNumeric);
  const display = isNumeric ? Math.round(count) : value;

  return (
    <div ref={ref}>
      <Link href={href} className="block">
        <div className="flex items-center gap-4 bg-white rounded-2xl border border-secondary p-6 shadow-sm cursor-pointer transition-all duration-300 ease-out-quart hover:-translate-y-1 hover:shadow-lg">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main transition-transform duration-300 hover:scale-105">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-ft2 truncate">{title}</h3>
            <p className="mt-1 text-3xl font-bold text-ft">{display}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
