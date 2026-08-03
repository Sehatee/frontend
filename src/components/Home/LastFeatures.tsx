"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import "aos/dist/aos.css";
import Link from "next/link";

// دالة العد التصاعدي بدون مكتبات
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
        setCount(parseFloat(current.toFixed(1)));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [start]);

  return count;
};

const LastFeatures = () => {
  const t = useTranslations("lastFeatures");

  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const numOfPatients = useCountUp(2500, 1, inView);
  const numOfDoctors = useCountUp(37, 0.7, inView);
  const numOfRatings = useCountUp(4.9, 0.5, inView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-main py-20 md:py-28"
      ref={ref}
    >
      <div className="pointer-events-none absolute -top-32 -end-32 h-[420px] w-[420px] rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-40 -start-24 h-[380px] w-[380px] rounded-full bg-accent/15" />

      <div className="relative flex flex-col-reverse items-center gap-12 px-4 md:flex-row md:px-8 lg:gap-16 lg:px-16 2xl:px-24">
        <div className="flex w-full flex-col items-center md:w-[58%] md:items-start">
          <h1 className="text-center text-3xl sm:text-4xl md:text-start md:text-5xl font-bold text-white">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-[55ch] text-center leading-relaxed text-white/80 md:text-start lg:text-xl">
            {t("subTitle")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-10 md:justify-start lg:gap-14">
            <div className="text-center md:text-start">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                {Math.round(numOfPatients)}
              </h2>
              <span className="mt-1 block text-sm font-normal text-white/70 lg:text-base">
                {t("patientsCount")}
              </span>
            </div>

            <div className="text-center md:text-start">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                {Math.round(numOfDoctors)}
              </h2>
              <span className="mt-1 block text-sm font-normal text-white/70 lg:text-base">
                {t("doctorsCount")}
              </span>
            </div>

            <div className="text-center md:text-start">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                {numOfRatings.toFixed(1)}
                <span className="text-accent text-3xl lg:text-4xl">★</span>
              </h2>
              <span className="mt-1 block text-sm font-normal text-white/70 lg:text-base">
                {t("ratings")}
              </span>
            </div>
          </div>

          <Link
            href="/pricing"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-main transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-cream hover:shadow-xl hover:shadow-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t("btnText")}
          </Link>
        </div>

        <div className="hidden w-full max-w-[420px] md:block md:max-w-[480px]">
          <div className="rounded-[2rem] bg-white p-6 shadow-2xl shadow-black/20">
            <Image
              width={400}
              height={400}
              alt="building"
              src={"/imgs/lastFeatures/building.png"}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastFeatures;
