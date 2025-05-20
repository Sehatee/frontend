import { Appointment } from "@/types/Appointment";
import { Calendar, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const t = useTranslations("Appointment");
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
    <div
      key={appointment._id}
      className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <div>
            <h3 className="font-medium text-blue-600">
              إسم المريض: {appointment.patientId.username}
            </h3>
          </div>
          <div className="flex items-center space-x-4 text-textSecondary">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{appointment.date}</span>
            </div>

            <div className="flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span className="text-sm">{appointment.notes}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <span
            className={`px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600 ${getStatusColor(
              appointment.status
            )}`}
          >
            {t(appointment.status.toLowerCase())}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
