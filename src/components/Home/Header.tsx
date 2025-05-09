import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Header = () => {
  const t = useTranslations("Header");
  return (
    <div className="flex relative lg:justify-between justify-start bg-[url('/imgs/header/shape1.png')]  bg-bg h-[700px]  bg-no-repeat">
      {/* title */}
      {/* className="flex flex-col lg:justify-start justify-center w-full  lg:items-start items-center lg:gap-7 gap-5  lg:ml-20 ml-10" */}
      <div className="mr-20 mt-12">
        {/*  className="lg:text-5xl text-3xl font-bold lg:w-[600px] w-[400px] leading-loose" */}
        
        <h1 className="text-6xl w-[600px] font-bold text-ft leading-[5.5rem]">
          {t("headText1")}
        </h1>
      {/* className="lg:text-xl text-base text-textSecondary lg:w-[600px] w-[400px] mt-2" */}
      
        <p className="text-xl mt-12 w-[560px] text-ft2">
          {t("headText2")}
        </p>
        <p className="text-xl  mt-3 text-ft2">
          {t("headText3")}
        </p>
        <button className="mt-24 mr-20">
          <span className="text-lg text-white font-bold  px-10 py-4 rounded-xl mt-4  hoverBtn bg-main shadow-lg shadow-[#a2c5f6]">
            {t("btnText")}
          </span>
        </button>
      </div>
      {/* imgs */}
      

      <div className="absolute bottom-0 left-5 w-[687px]">
        <Image
          width={1400}
          height={1400}
          alt="docImg"
          src={"/imgs/header/doctor.png"}
        />
      </div>
    </div>
  );
};

export default Header;
