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

  const initials = (doctor.username || "").trim().charAt(0) || "د";

  return (
    <div className="flex h-fit flex-col gap-6 rounded-3xl border border-secondary bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full bg-main ring-4 ring-secondary">
          {doctor.picture ? (
            <Image
              src={doctor.picture}
              alt={doctor.username}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-5xl font-bold text-white">
                {initials}
              </span>
            </div>
          )}
        </div>

        <div className="w-full">
          <h3 className="font-display text-2xl font-bold text-ft">
            {doctor.username}
          </h3>
          <p className="mt-1 text-main">{doctor.specialization}</p>
          <div className="mt-2 flex items-center justify-center gap-1">
            <RenderStars rating={doctor.avgRatings} />
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <p className="leading-7 text-ft2">{doctor.description}</p>
        <div className="flex items-start justify-center gap-2 rounded-2xl bg-bg px-4 py-3">
          <Calendar className="mt-0.5 size-4 shrink-0 text-main" />
          <span className="font-semibold text-ft">
            {t("workDays")} :
          </span>
          <span className="text-ft2">{days?.join(" - ")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Link href={"/directCall"} className="btn-ghost w-full">
          <Phone className="size-4" />
          {t("schedule")}
        </Link>
        <Link
          href={`/chat?doctorId=${doctor._id}`}
          className="btn-primary w-full"
        >
          <MessageSquareText className="size-4" />
          {t("callNow")}
        </Link>
      </div>
    </div>
  );
};

export default DoctorCardAppointment;
