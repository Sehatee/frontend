"use client";
import Aos from "aos";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect } from "react";
import "aos/dist/aos.css";

const Services = () => {
  const t = useTranslations("services");
  const services = t.raw("services");
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
      easing: "ease-in-out-back",
      offset: 100,
    });
  }, []);
  return (
    <div className="border-t border-secondary py-20 md:py-28">
      <div className="px-4 md:px-8 lg:px-16 2xl:px-24">
        {/* main text */}
        <div className="flex flex-col items-start gap-3 text-start">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-4 text-3xl font-bold text-ft sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-[60ch] text-ft2">{t("subTitle")}</p>
        </div>
        {/* features */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {services.map(
            (
              feature: { title: string; text: string; img: string },
              index: number
            ) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <div
                  className={`group relative flex flex-col gap-5 rounded-3xl border border-secondary/70 bg-white p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-main/10 ${
                    index === 1 ? "lg:translate-y-8" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute end-6 top-6 text-6xl font-bold text-main/10 transition-colors duration-300 group-hover:text-accent/20"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary transition-colors duration-300 group-hover:bg-accent/15">
                    <Image
                      src={feature.img}
                      alt={feature.title}
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mt-1 text-xl font-bold text-ft lg:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="max-w-[38ch] leading-relaxed text-ft2">
                    {feature.text}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
