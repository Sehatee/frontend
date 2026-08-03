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

const DoctorCard = ({ id, name, specialty, description, img }: DoctorCardProps) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      data-aos-duration="800"
      className="relative flex w-full max-w-[560px] mx-auto flex-col overflow-hidden rounded-[2rem] bg-main md:flex-row"
    >
      <div className="pointer-events-none absolute -top-16 -end-16 h-48 w-48 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute bottom-6 start-6 h-3 w-3 rounded-full bg-accent" />

      <div
        className={`relative w-full p-5 sm:p-6 md:absolute md:inset-y-0 md:w-[46%] md:p-6 ${
          isRTL ? "md:end-0 md:ps-0" : "md:start-0 md:pe-0"
        }`}
      >
        <div className="h-52 xs:h-64 sm:h-72 md:h-full overflow-hidden rounded-[1.5rem] ring-2 ring-white/20">
          <Image
            src={img}
            alt={name}
            width={350}
            height={350}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>

      <div
        className={`relative flex flex-col items-start px-5 sm:px-6 pt-1 pb-8 sm:pb-10 md:pt-10 md:pb-12 ${
          isRTL ? "md:pe-[50%] md:ps-8" : "md:ps-[50%] md:pe-8"
        }`}
      >
        <h1 className="text-xl sm:text-2xl font-bold text-white">{name}</h1>
        <span className="mt-2 inline-block rounded-full bg-white/15 px-3 py-1 text-sm text-cream">
          {specialty}
        </span>
        <p className="mt-4 text-[13px] sm:text-sm leading-relaxed text-white/80">
          {description}
        </p>
        <Link
          href={`/doctor/${id}`}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-main transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-white"
        >
          <Phone className="h-4 w-4" />
          {isRTL ? "اتصل الان" : "Call Now"}
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
