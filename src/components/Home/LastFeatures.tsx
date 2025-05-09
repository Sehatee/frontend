import Image from "next/image";
import { useTranslations } from "next-intl";

import React from "react";

const LastFeatures = () => {
  const t = useTranslations("lastFeatures");

  const numOfPatients = 2500;
  const numOfDoctors = 37;
  const numOfRatings = 4.9;
  return (
    <div className="bg-bg flex flex-col items-center">
     
      <div className=" flex 2xl:gap-20 lg:gap-14  lg:pr-20 lg:pl-3 pt-20">
             
        <div className="2xl:mt-24 xl:mt-24 lg:mt-20 flex flex-col">
          <h1 className="2xl:text-[54px] xl:text-[46px] text-[46px] font-bold text-ft">
            {t("title")}
          </h1>
      
          <p className="2xl:text-[28px] 2xl:leading-loose 2xl:font-medium text-ft2 2xl:w-[640px] w-[600px] 2xl:mt-10 xl:text-2xl xl:mt-6 xl:leading-loose xl:font-medium text-xl mt-4 leading-loose" >
            {t("subTitle")}
          </p>
          
          <button className="text-end mt-20">
            <span className="2xl:text-3xl text-2xl text-white font-semibold px-16 py-[14px] rounded-[20px] mt-4  hoverBtn bg-main shadow-lg shadow-[#a2c5f6]">
              {t("btnText")}
            </span>
          </button>
          
        </div>

          <div>
            <Image
                width={600}
                height={600}
                alt="docImg"
                src={"/imgs/lastFeatures/building.png"}
              />
          </div>

      </div>
      
     <div className="inline-flex gap-20 py-8 px-36 rounded-3xl bg-white shadow-md  shadow-gray-300 -mt-20 mb-40 lg:-mt-10">

        <p className="text-3xl text-center font-bold">
          {numOfPatients}
          <span className="text-ft2 text-xl block font-normal">{t("patientsCount")}</span>
        </p>

        <p className="text-center text-3xl font-bold">
          {numOfDoctors}
          <span className="block text-xl text-ft2 font-normal">{t("doctorsCount")}</span>
        </p>
        
        
        <div className="flex items-center">
         <p className="text-ft2 text-xl"> {t("ratings")}
          <span className="m-2 text-2xl text-black font-bold">{numOfRatings}/5</span>
         </p>
          <Image
            width={20}
            height={20}
            alt="star"
            src={"/imgs/lastFeatures/star.png"}/>
        </div>

      </div> 


    </div>
  );
};

export default LastFeatures;
