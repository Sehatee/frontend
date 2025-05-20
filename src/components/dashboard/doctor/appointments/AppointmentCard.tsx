import { Appointment } from "@/types/Appointment";
import { Calendar, FileText } from "lucide-react";
import React from "react";

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
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
          <span className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600">
            {appointment.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
