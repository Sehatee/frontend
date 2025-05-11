import { useTranslations, useLocale} from "next-intl";
import Image from "next/image";
import React from "react";

const Header = () => {
  const t = useTranslations("Header");
  const locale = useLocale();
  return (
    <div className={` flex relative lg:justify-between justify-start bg-[url('/imgs/header/${locale === 'en' ? 'shape2' : 'shape1'}.png')] bg-cover bg-center bg-no-repeat w-full h-[700px]`}>
      <div className={`${locale === 'en' ? 'lg:ml-20 ml-6' : 'lg:mr-20 mr-6'} mt-12`}>
        <h1 className="lg:text-6xl line-clamp-3 md:text-5xl text-4xl lg:w-[600px] md:w-[500px] w-[300px] font-bold text-ft lg:leading-[5.5rem] leading-[4rem]">
          {t("headText1")}
        </h1>
        <p className="lg:text-xl text-lg lg:w-[560px] md:w-[460px] w-[280px] text-ft2 mt-12 leading-8">
          {t("headText2")}
        </p>
        <button className={`mt-24 ${locale === 'en' ? 'lg:ml-20 ml-6' : 'lg:mr-20 mr-6'}`}>
          <span className="text-lg text-white font-bold px-10 py-4 rounded-xl mt-4 hoverBtn bg-main shadow-lg shadow-[#a2c5f6]">
            {t("btnText")}
          </span>
        </button>
      </div>

      <div className={`absolute bottom-0 ${locale === 'en' ? 'right-5' : 'left-5'} lg:w-[687px] md:w-[500px] w-[300px] hidden md:block`}>
        <Image
          width={1400}
          height={1400}
          alt="docImg"
          src={"/imgs/header/doctor.png"}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Header;