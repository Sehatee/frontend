"use client";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, HeartPulse } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ADS = () => {
  const t = useTranslations("MyServices");
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canAnimate = mounted && !reduce;

  const services = t.raw("services") as { title: string }[];

  const title = t("ADS.title");
  const words = title.trim().split(/\s+/);
  const last = words.length > 0 ? words[words.length - 1] : "";
  const punct = last.match(/[؟?.!]+$/)?.[0] ?? "";
  const accentWord = last.slice(0, last.length - punct.length);
  const titleStart = words.length > 1 ? words.slice(0, -1).join(" ") : "";

  const motionProps = (delay: number) =>
    canAnimate
      ? {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            delay,
          },
        }
      : { initial: false };

  return (
    <section className="my-20 md:my-28">
      <div className="relative overflow-hidden rounded-3xl bg-main px-6 py-14 sm:px-10 md:px-16 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -end-24 h-72 w-72 rounded-full bg-white/5"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -start-20 h-80 w-80 rounded-full bg-accent/15"
        />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <motion.div {...motionProps(0.1)} className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-black/10">
                <HeartPulse size={28} />
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white">
                {t("ADS.eyebrow")}
              </span>
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold leading-[1.2] text-white sm:text-4xl md:text-5xl">
              {titleStart && <>{titleStart} </>}
              <span className="text-accent">{accentWord}</span>
              {punct}
            </h2>
            <p className="mt-5 max-w-[55ch] leading-relaxed text-white/80 md:text-lg">
              {t("ADS.text")}
            </p>
            <Link
              href="/support"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t("ADS.btnText")}
            </Link>
          </motion.div>

          <motion.ul {...motionProps(0.3)} className="grid gap-3 lg:max-w-sm">
            {services.slice(0, 3).map((service, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-4 text-white/85"
              >
                <CheckCircle2 size={22} className="shrink-0 text-accent" />
                <span className="font-medium">{service.title}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default ADS;
