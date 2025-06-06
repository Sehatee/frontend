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

      <div className=" mt-20 mx-20 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
        {services.map(
          (
            feature: { title: string; text: string; img: string },
            index: number
          ) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              data-aos-anchor-placement="center-bottom"
              className="flex flex-col md:items-center p-4  rounded-lg "
            >
              <Image
                src={feature.img}
                alt={feature.title}
                width={110}
                height={110}
                className="self-center md:self-start w-30 h-30 object-contain mb-4 bg-bg p-4 rounded-2xl shadow-lg shadow-[#cfe2fda8]"
              />
              <h2 className="self-center md:self-start text-xl md:text-2xl font-bold text-ft mt-8 max-[340px]:text-base whitespace-nowrap">
                {feature.title}
              </h2>
              <p className="self-center text-center md:text-start md:self-start md:text-lg text-base  md:leading-loose leading-loose  text-textSecondary mt-3 w-[280px]">
                {feature.text}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Services;
