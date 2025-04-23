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
      duration: 1000,
      once: false,
      easing: "ease-in-out-back",
      offset: 100,
      
    });
  }, []);
  return (
    <div className="my-24">
      {/* main text */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium text-textSecondary text-center mt-2">
          {t("subTitle")}
        </p>
      </div>
      {/* features */}

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map(
          (
            feature: { title: string; text: string; img: string },
            index: number
          ) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={`${index * 200}`}
              data-aos-anchor-placement="center-bottom"
              className="flex flex-col items-center text-center p-4  rounded-lg "
            >
              <Image
                src={feature.img}
                alt={feature.title}
                width={100}
                height={100}
                className="w-20 h-20 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold">{feature.title}</h2>
              <p className="text-sm text-textSecondary mt-2">{feature.text}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Services;
