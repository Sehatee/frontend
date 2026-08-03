"use client";
import { Appointment } from "@/types/Appointment";
import { Calendar, Clock, FileText } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import moment from "moment";
import "moment/locale/ar";
import Image from "next/image";
import React from "react";
import StatusBadge, { statusVariant } from "@/ui/StatusBadge";

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const t = useTranslations("Appointment");
  const locale = useLocale();

  moment.locale(locale);

  const statusKey = appointment.status.toLowerCase();
  const statusLabel =
    t(statusKey) === statusKey ? appointment.status : t(statusKey);

  const doctor = appointment.doctorId;
  const initials = (doctor.username ?? "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-secondary bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-main" />
          <span className="font-medium text-ft">
            {moment(appointment.date).format("DD MMMM YYYY")}
          </span>
        </div>
        <StatusBadge variant={statusVariant(appointment.status)}>
          {statusLabel}
        </StatusBadge>
      </div>

      <div className="flex items-center gap-4 border-y border-secondary py-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-main text-white">
          {doctor.picture ? (
            <Image
              src={doctor.picture}
              alt={doctor.username}
              width={56}
              height={56}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <span className="text-lg font-bold">{initials || "D"}</span>
          )}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-ft">
            <span className="text-ft2">{t("doctor")}</span> {doctor.username}
          </p>
          {doctor.specialization && (
            <p className="text-sm text-main">{doctor.specialization}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-ft2">
          <Clock className="h-4 w-4 text-main" />
          <span className="text-sm">
            {moment(appointment.date).format("LT")}
          </span>
        </div>

        {appointment.notes && (
          <div className="flex items-start gap-2 text-ft2">
            <FileText className="mt-0.5 h-4 w-4 text-main" />
            <p className="text-sm">
              <span className="font-medium text-ft">{t("notes")}:</span>{" "}
              {appointment.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
