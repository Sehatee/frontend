import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Header = () => {
  const t = useTranslations("Header");
  return (
    <div className="flex gap-5 lg:justify-between justify-start items-center my-24 ">
      {/* title */}
      <div className="flex flex-col lg:justify-start justify-center w-full  lg:items-start items-center lg:gap-7 gap-5  lg:ml-20 ml-10">
        <h1 className="lg:text-5xl text-3xl font-bold lg:w-[600px] w-[400px] leading-loose">
          {t("headText1")}
        </h1>

        <p className="lg:text-xl text-base text-textSecondary lg:w-[600px] w-[400px] mt-2">
          {t("headText2")}
        </p>
        <button>
          <span className="text-lg text-white  px-4 py-2 rounded-md mt-4  hoverBtn bg-main shadow-2xl shadow-main">
            {t("btnText")}
          </span>
        </button>
      </div>
      {/* imgs */}

      <div className="hidden lg:flex justify-center items-center relative lg:w-[800px] w-[400px] lg:mr-20 mr-10">
        {/* موجة أولى ناعمة */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full -z-20 "
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#E0E7FF"
            fillOpacity="1"
            d="M0,160 C360,320 1080,0 1440,160 L1440,320 L0,320 Z"
          />
        </svg>
        {/* موجة ثانية أصغر فوق الأولى */}
        <svg
          className="absolute bottom-0 left-0 w-full h-80 -z-10  "
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#0B62DE"
            fillOpacity="1"
            d="M0,160 C360,320 1080,0 1440,160 L1440,320 L0,320 Z"
          />
        </svg>{" "}
        <Image
          width={2500}
          height={2500}
          alt="docImg"
          src={"/imgs/header/doctor.png"}
          className=""
        />
      </div>
    </div>
  );
};

export default Header;
