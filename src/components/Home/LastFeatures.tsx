import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";
import "aos/dist/aos.css";

const LastFeatures = () => {
  const t = useTranslations("lastFeatures");

  const numOfPatients = 2500;
  const numOfDoctors = 37;
  const numOfRatings = 4.9;
  return (
    <div className="bg-bg flex flex-col items-center">
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start  w-full px-4 md:px-8 py-10 md:py-20 gap-10 md:gap-14 2xl:gap-20">
        <div className="flex flex-col w-full md:w-1/2 my-auto">
          <h1 className="xl:text-5xl lg:mr-4 text-4xl md:text-start text-center font-bold text-ft">
            {t("title")}
          </h1>
          <p className=" md:text-start lg:mr-4 text-center xl:text-[28px] lg:text-[25px] md:text-[22px] text-ft2 mt-6 lg:mb-0 mb-4 lg:mt-10 lg:leading-loose leading-[1.8] font-medium 2xl:w-[640px] w-full line-clamp-4">
            {t("subTitle")}
          </p>
          <div className="flex flex-col sm:flex-row  justify-center  gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-28 lg:py-8 py-4">
            <p
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="200"
              data-aos-offset="0"
              className="text-2xl  sm:text-3xl text-center font-bold text-main"
            >
              {numOfPatients}
              <span className="text-ft2 mt-2 text-base sm:text-xl block font-normal">
                {t("patientsCount")}
              </span>
            </p>
            <p
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
              data-aos-offset="0"
              className="text-2xl sm:text-3xl text-center font-bold text-main"
            >
              {numOfDoctors}
              <span className="block text-base sm:text-xl mt-2 text-ft2 font-normal">
                {t("doctorsCount")}
              </span>
            </p>
            <p
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="400"
              data-aos-offset="0"
              className="text-2xl sm:text-3xl text-center font-bold text-main"
            >
              {numOfRatings}/5
              <span className="text-yellow-400 text-2xl sm:text-3xl mr-1">
                ★
              </span>
              <span className="block text-base sm:text-xl mt-2 text-ft2 font-normal">
                {t("ratings")}
              </span>
            </p>
          </div>
          <button className="mt-8 sm:mt-10 w-full sm:w-auto">
            <span className="block text-lg sm:text-2xl 2xl:text-3xl text-white font-semibold px-8 sm:px-20 2xl:px-40 py-3 sm:py-[14px] rounded-xl hoverBtn bg-[#3D87F2] shadow-lg shadow-[#a2c5f6]">
              {t("btnText")}
            </span>
          </button>
        </div>
        <div className="flex justify-center w-full md:w-1/2 mb-8 md:mb-0">
          <Image
            width={400}
            height={400}
            alt="docImg"
            src={"/imgs/lastFeatures/building.png"}
            className="w-full  max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LastFeatures;
