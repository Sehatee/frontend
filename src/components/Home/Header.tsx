"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Stethoscope } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const t = useTranslations("Header");
  const nav = useTranslations("NavBar");
  const lf = useTranslations("lastFeatures");
  const locale = useLocale();
  const reduce = useReducedMotion();

  const [isUnderM, setIsUnderM] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsUnderM(window.innerWidth < 520);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const headline = t("headText1");
  const periodIndex = headline.indexOf(".");
  const splitHeadline =
    periodIndex > -1 && headline.slice(periodIndex + 1).trim().length > 0;
  const headlineStart = splitHeadline
    ? headline.slice(0, periodIndex + 1)
    : headline;
  const headlineAccent = splitHeadline ? headline.slice(periodIndex + 1) : "";

  const canAnimate = mounted && !reduce;
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
    <section className="relative overflow-hidden pt-6 sm:pt-10">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <Image
        src={
          isUnderM
            ? `/imgs/header/${locale === "ar" ? "shape3.svg" : "shape4.svg"}`
            : `/imgs/header/${locale === "ar" ? "shape1.svg" : "shape2.svg"}`
        }
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 pb-20 sm:px-6 md:pb-24 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:pb-28 xl:px-16">
        <motion.div
          {...motionProps(0.1)}
          className="relative isolate w-full max-w-xl lg:w-[55%]"
        >
          <div
            aria-hidden="true"
            className="absolute -start-20 -top-20 -z-10 h-80 w-80 rounded-full sm:h-96 sm:w-96"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.97 0.012 90), transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -z-10 bottom-0 end-4 h-48 w-48"
            style={{
              backgroundImage:
                "radial-gradient(oklch(0.52 0.165 256 / 0.08) 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(closest-side, black, transparent)",
              WebkitMaskImage:
                "radial-gradient(closest-side, black, transparent)",
            }}
          />

          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="mt-6 max-w-[17ch] text-4xl font-bold leading-[1.1] text-ft sm:text-5xl xl:text-6xl xl:leading-[1.12] 2xl:text-7xl">
            {headlineStart}
            {splitHeadline && (
              <span className="text-main">{headlineAccent}</span>
            )}
          </h1>
          <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-ft2 sm:text-lg xl:text-xl">
            {t("headText2")}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/doctors" className="btn-primary">
              {t("btnText")}
            </Link>
            <Link href="/about" className="btn-ghost">
              {nav("about")}
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill="currentColor"
                  className="fill-accent text-accent"
                />
              ))}
            </div>
            <span className="text-sm text-ft2">{t("trustLabel")}</span>
          </div>
        </motion.div>

        <motion.div
          {...motionProps(0.35)}
          className="relative isolate hidden w-full md:block lg:w-[45%]"
        >
          <div className="relative mx-auto w-full max-w-[440px]">
            <div
              aria-hidden="true"
              className="absolute -bottom-10 -start-8 -z-10 h-64 w-64 rounded-full bg-cream sm:h-80 sm:w-80"
            />
            <div
              aria-hidden="true"
              className="absolute -end-8 -top-8 -z-10 h-36 w-36 rounded-full border-2 border-accent sm:h-44 sm:w-44"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-secondary">
              <Image
                src="/imgs/header/doctor.png"
                alt="Doctor"
                width={687}
                height={687}
                priority
                className={`h-full w-full object-cover object-top ${
                  locale === "en" ? "scale-x-[-1]" : ""
                }`}
              />
            </div>
            <div
              className="absolute start-4 top-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-xl shadow-[oklch(0.23_0.025_256/0.12)]"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary">
                <Star
                  size={18}
                  fill="currentColor"
                  className="fill-accent text-accent"
                />
              </span>
              <span className="flex flex-col">
                <span className="text-xl font-bold text-ft">4.9</span>
                <span className="text-sm text-ft2">{lf("ratings")}</span>
              </span>
            </div>
            <div
              className="absolute bottom-6 end-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-xl shadow-[oklch(0.23_0.025_256/0.12)]"
              style={{ animation: "float 7s ease-in-out 1.2s infinite" }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary">
                <Stethoscope size={18} className="text-main" />
              </span>
              <span className="flex flex-col">
                <span className="text-xl font-bold text-ft">37</span>
                <span className="text-sm text-ft2">{lf("doctorsCount")}</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Header;
