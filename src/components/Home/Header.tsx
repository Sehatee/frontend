"use client";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
const Header = () => {
  const t = useTranslations("Header");
  const locale = useLocale();

  // Track screen width
  const [isUnderM, setIsUnderM] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsUnderM(window.innerWidth < 520);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex relative lg:justify-between justify-start w-full xl:h-[700px] lg:h-[600px] md:h-[530px] m:h-[420px] h-[530px]">
      <Image
        src={
          isUnderM
            ? `/imgs/header/${locale === "ar" ? "shape3.svg" : "shape4.svg"}`
            : `/imgs/header/${locale === "ar" ? "shape1.svg" : "shape2.svg"}`
        }
        alt="background shape"
        fill
        className="object-cover object-center -z-10"
        priority
      />
      <div
        className={`${
          locale === "en" ? "lg:ml-20 ml-6" : "lg:mr-20 mr-6"
        } m:mt-14 mt-8`}
      >
        <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl xl:w-[600px] lg:w-[500px] sm:w-[400px] w-[300px] xl:leading-[5.5rem] lg:leading-[4.5rem] md:leading-[4rem] leading-normal font-bold text-ft ">
          {t("headText1")}
        </h1>
        <p className="text-lg line-clamp-2 sm:line-clamp-0 md:text-lg xl:w-[560px] md:w-[420px] w-[250px]  lg:leading-10 md:leading-8 text-ft2 xl:mt-12 lg:mt-6 mt-4">
          {t("headText2")}
        </p>
        <div className={`sm:mt-24 mt-20 ${
            locale === "en" ? "lg:ml-20 ml-6" : "lg:mr-20 sm:mr-6 mr-0" }`}>
        <Link href="/doctors">
          <span className="sm:text-lg  text-white sm:font-bold font-semibold sm:px-10 px-8 sm:py-4 py-2 rounded-xl mt-4 hoverBtn bg-[#3D87F2] shadow-lg shadow-[#a2c5f6]">
            {t("btnText")}
          </span>
        </Link>
        </div>
      </div>

      <div
        className={`absolute bottom-0 ${
          locale === "en" ? "xl:right-5 right-0" : "xl:left-5 left-0"
        } xl:w-[687px] lg:w-[600px] md:w-[500px] hidden md:block`}
      >
        <Image
          width={687}
          height={687}
          alt="docImage"
          src={"/imgs/header/doctor.png"}
          className={`w-full h-auto object-contain  ${
            locale === "en" ? "scale-x-[-1]" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Header;
