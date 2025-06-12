import { useTranslations } from "next-intl";
import React from "react";
import Link from "next/link";

const ADS = () => {
  const t = useTranslations('MyServices')

  return (
    <div className="my-20 bg-main rounded flex sm:flex-row flex-col justify-between items-center px-4 py-2 gap-5">
      {/* text */}
      <div className=" h-full flex flex-col gap-3 ">
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-white ">
          {t('ADS.title')}
        </h1>
        <p className="text-sm line-clamp-2  sm:text-base md:text-lg font-medium text-white  mt-2">
        {t('ADS.text')}
        </p>
      </div>
      {/* button */}
      <div className="flex justify-center items-center mt-7 mb-10">
        <Link href="/support" className="text-base w-36  bg-white text-main text-center px-4 py-2 rounded-md mt-4 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-95">
          {t('ADS.btnText')}
        </Link>
      </div>
    </div>
  );
};

export default ADS;
