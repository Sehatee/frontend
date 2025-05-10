import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

interface DoctorCardProps {
  name: string;
  specialty: string;
  description: string;
  img: string;
}

const DoctorCard = ({ name, specialty, description, img }: DoctorCardProps) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div
      className={`relative bg-[#3F89F0] flex w-full max-w-[520px] ${
        isRTL ? "pr-[180px]" : "pl-[180px]"
      } mt-20 rounded-2xl mx-auto sm:mx-0`}
    >
      <div
        className={`absolute ${isRTL ? "-right-32" : "-left-32"} bottom-0 ${
          !isRTL ? "scale-x-[-1]" : ""
        } hidden sm:block`}
      >
        <Image
          width={350}
          height={350}
          alt="docImg"
          src={img}
          className="w-[280px] md:w-[320px] lg:w-[350px] h-auto"
        />
      </div>
      <div
        className={`text-bg pt-6 ${
          isRTL ? "pl-4 sm:pl-10 mr-4 sm:mr-6" : "pr-4 sm:pr-10 ml-4 sm:ml-6"
        } w-full sm:w-auto`}
      >
        <h1 className="text-xl sm:text-2xl font-bold">
          {name}
          <span className="block mt-2 text-sm font-light">{specialty}</span>
        </h1>

        <p className="text-[13px] w-full sm:w-[270px] mt-4 leading-loose">
          {description}
        </p>

        <button
          className={`flex gap-2 my-6 ${
            isRTL ? "mr-4 sm:mr-6" : "ml-4 sm:ml-6"
          } px-4 py-1 border-2 rounded-lg font-semibold shadow-[0_0_10px_2px_#a2c5f646] hover:bg-[#5b94e3] hover:shadow-[#7cc0be84] transition duration-300`}
        >
          <p>{isRTL ? "اتصل الان" : "Call Now"}</p>
          <img src="/imgs/doctorsteam/phone.png" className="w-[24px]" />
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
