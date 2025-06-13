import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import "aos/dist/aos.css";
import Link from "next/link";
import { Phone } from "lucide-react";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  description: string;
  img: string;
}

const DoctorCard = ({ id,name, specialty, description, img }: DoctorCardProps) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      data-aos-duration="800"
      className={`relative bg-[#3F89F0] flex w-full max-w-[520px]  s:pt-4 pt-[140px] ${
        isRTL ? "pr-[180px]" : "pl-[180px]"
      } min-[1296px]:mt-20 mt-4 rounded-2xl mx-auto sm:mx-0`}
    >
      <div
        className={`absolute ${
          isRTL ? "md:-right-32 xs:-right-12" : "md:-left-32 xs:-left-12"
        } bottom-0 ${!isRTL ? "scale-x-[-1]" : ""}  sm:block`}
      >
        <Image
          width={350}
          height={350}
          alt="docImg"
          src={img}
          className="md:w-[350px] h-auto sm:w-[280px] xs:w-[260px] "
        />
      </div>
      <div
        className={`text-bg sm:pt-6 xs-0 ${
          isRTL ? "pl-4 sm:pl-10 mr-4 sm:mr-6" : "pr-4 sm:pr-10 ml-4 sm:ml-6"
        } w-full sm:w-auto`}
      >
        <h1 className="text-xl sm:text-2xl font-bold s:static absolute top-5 right-24">
          {name}
          <span className="block  text-sm mt-1 font-light">{specialty}</span>
        </h1>

        <p
          className={`text-[13px] line-clamp-5 w-full sm:w-[270px] s:mt-4 s:static relative -top-10 ${
            isRTL ? "-right-3" : "right-3"
          } leading-loose`}
        >
          {description}
        </p>

        <Link
          href={`/doctor/${id}`}
          className={`w-fit flex gap-2 my-6 text-base ${
            isRTL ? "mr-4 sm:mr-6" : "ml-4 sm:ml-6"
          } px-4 py-1 border-2 rounded-lg font-semibold shadow-[0_0_10px_2px_#a2c5f646] hover:bg-[#47bbff78] hover:shadow-[#7cc0be84] transition duration-300`}
        >
          <p>{isRTL ? "اتصل الان" : "Call Now"}</p>
          <Phone className="s:w-5 w-0 stroke-none fill-white" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
