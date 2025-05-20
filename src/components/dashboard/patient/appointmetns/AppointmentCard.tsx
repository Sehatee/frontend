"use client";
import { Appointment } from "@/types/Appointment";
import { Calendar, Clock, FileText, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import moment from "moment";
import "moment/locale/ar";

import React from "react";

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const t = useTranslations("Appointment");
  const locale = useLocale();

  // Set moment locale based on current language
  moment.locale(locale);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-main" />
          <span className="font-medium">
            {moment(appointment.date).format("DD MMMM YYYY")}
          </span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            appointment.status
          )}`}
        >
          {t(appointment.status.toLowerCase())}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-4 h-4" />
          <span>
            {t("doctor")} {appointment.doctorId.username}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{moment(appointment.date).format("LT")}</span>
        </div>

        {appointment.notes && (
          <div className="flex items-start gap-2 text-gray-600">
            <FileText className="w-4 h-4 mt-1" />
            <p className="text-sm">
              <span className="font-medium">{t("notes")}:</span>{" "}
              {appointment.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
