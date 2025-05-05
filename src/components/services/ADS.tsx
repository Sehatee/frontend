import { useTranslations } from "next-intl";
import React from "react";

const ADS = () => {
  const t = useTranslations('MyServices')

  return (
    <div className="my-20 bg-main rounded flex justify-between items-center px-4 gap-5">
      {/* text */}
      <div className=" h-full flex flex-col gap-3">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white ">
          {t('ADS.title')}
        </h1>
        <p className="text-sm line-clamp-2  sm:text-base md:text-lg font-medium text-white  mt-2">
        {t('ADS.text')}
        </p>
      </div>
      {/* button */}
      <div className="flex justify-center items-center mt-5 mb-10">
        <button className="text-base w-36 hover:text-white bg-white text-main  px-4 py-2 rounded-md mt-4  hoverBtn ">
          {t('ADS.btnText')}
        </button>
      </div>
    </div>
  );
};

export default ADS;
