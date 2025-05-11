import React from "react";
import { Phone, Calendar, MessageSquareText } from "lucide-react";
import Image from "next/image";
import RenderStars from "@/ui/RenderStars";
import { useTranslations } from "next-intl";

interface DoctorCardAppointmentProps {
  doctor: {
    name: string;
    specialty: string;
    rating: number;
    experience: string;
    languages: string[];
    workDays: string;
    image: string;
  };
}

const DoctorCardAppointment: React.FC<DoctorCardAppointmentProps> = ({
  doctor,
}) => {
  const t = useTranslations("DoctorCard");

  return (
    <div className="bg-white rounded-lg p-4 shadow-md flex flex-col  gap-4">
      <div className="flex flex-col items-center  text-center">
        <div className="relative w-36 h-36 rounded-full overflow-hidden mb-3">
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full">
          <h3 className="text-4xl font-bold ">{doctor.name}</h3>
          <p className=" text-md text-main my-2">{doctor.specialty}</p>
          <div className="flex items-center justify-center gap-1">
            <RenderStars rating={doctor.rating} />
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <p className="text-textSecondary  text-md leading-7 ">
            {doctor.experience}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-gray-800">{t("workDays")} :</span>
            <span className="text-textSecondary">{doctor.workDays}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button className="flex items-center justify-center gap-2 border-main border text-main py-2 px-4 rounded-md hover:bg-blue-700 hover:text-white transition-colors w-full">
          <Phone className="w-4 h-4" />
          {t("schedule")}
        </button>
        <button className="flex items-center justify-center gap-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors w-full">
          <MessageSquareText className="w-4 h-4" />
          {t("callNow")}
        </button>
      </div>
    </div>
  );
};

export default DoctorCardAppointment;
