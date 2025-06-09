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
    <div className="bg-bg flex flex-col items-center py-5" ref={ref}>
      <div className="flex flex-col-reverse md:flex-row items-center w-full px-4 md:px-8 py-10 gap-7 lg:gap-14 2xl:gap-20">
        <div className="flex flex-col w-full md:w-1/2 my-auto">
          <h1 className="xl:text-5xl lg:mr-4 text-4xl md:text-start text-center font-bold text-ft">
            {t("title")}
          </h1>
          <p className=" md:text-start lg:mr-4 text-center lg:text-2xl text-xl text-ft2 mt-6 lg:mb-10  lg:leading-9 leading-8 2xl:w-[640px] w-full">
            {t("subTitle")}
          </p>
          <div className="flex flex-col sm:flex-row  justify-center  gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-28 lg:py-8 py-4">
            <p className="text-2xl lg:text-3xl text-center font-bold text-main">
              {Math.round(numOfPatients)}
              <span className="text-ft2 mt-2 text-base sm:text-xl block font-normal">
                {t("patientsCount")}
              </span>
            </p>

            <p className="text-2xl lg:text-3xl text-center font-bold text-main">
              {Math.round(numOfDoctors)}
              <span className="block text-base sm:text-xl mt-2 text-ft2 font-normal">
                {t("doctorsCount")}
              </span>
            </p>

            <p className="text-2xl lg:text-3xl text-center font-bold text-main">
              {numOfRatings.toFixed(1)}/5
              <span className="text-yellow-400 text-2xl sm:text-3xl mr-1">
                ★
              </span>
              <span className="block text-base sm:text-xl mt-2 text-ft2 font-normal">
                {t("ratings")}
              </span>
            </p>
          </div>
            
          <Link href="/pricing"
           className="mt-6 w-full sm:w-auto">
            <span className="block text-lg text-center sm:text-2xl 2xl:text-3xl text-white font-semibold px-8 sm:px-20 2xl:px-40 py-3 sm:py-[14px] rounded-xl hoverBtn bg-[#3D87F2] shadow-lg shadow-[#a2c5f6]">
              {t("btnText")}
            </span>
          </Link>
        </div>

        <div className="md:block hidden mt-6 w-full md:w-1/2">
          <Image
            width={400}
            height={400}
            alt="docImg"
            src={"/imgs/lastFeatures/building.png"}
            className="mx-auto md:w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LastFeatures;
