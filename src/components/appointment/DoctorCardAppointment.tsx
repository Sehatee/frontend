import React from "react";
import { Phone, Calendar, MessageSquareText } from "lucide-react";
import Image from "next/image";
import RenderStars from "@/ui/RenderStars";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { User } from "@/types/User";

interface DoctorCardAppointmentProps {
  doctor: User;
}

const DoctorCardAppointment: React.FC<DoctorCardAppointmentProps> = ({
  doctor,
}) => {
  const t = useTranslations("DoctorCard");
  const translateDay = useTranslations("Doctor");
  //extract the days
  const days = doctor.availableHours?.map((day) => {
    return translateDay(`days.${day.day.toLowerCase()}`);
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-between gap-6">
      <div className="flex flex-col items-center  text-center">
        <div className="relative w-36 h-36 rounded-full overflow-hidden mb-3">
          <Image
            src={doctor.picture || "imgs/doctorsteam/doctor2.png"}
            alt={doctor.username}
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full">
          <h3 className="text-4xl font-bold ">{doctor.username}</h3>
          <p className=" text-md text-main my-2">{doctor.specialization}</p>
          <div className="flex items-center justify-center gap-1">
            <RenderStars rating={doctor.avgRatings} />
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <p className="text-textSecondary  text-md leading-7 ">
            {doctor.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-gray-800">{t("workDays")} :</span>
            <span className="text-textSecondary">{days?.join(" - ")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <Link
          href={"/coominsoon"}
          className="flex items-center justify-center gap-2 border-main border text-main py-2 px-4 rounded-md hover:bg-blue-700 hover:text-white transition-colors w-full"
        >
          <Phone className="w-4 h-4" />
          {t("schedule")}
        </Link>
        <Link
          href={"/coominsoon"}
          className="flex items-center justify-center gap-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors w-full"
        >
          <MessageSquareText className="w-4 h-4" />
          {t("callNow")}
        </Link>
      </div>
    </div>
  );
};

export default DoctorCardAppointment;
