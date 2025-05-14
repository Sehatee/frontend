import { Calendar, Clock, MapPin, MoreVertical } from "lucide-react";
import Image from "next/image";
import React from "react";

const AppointmentCard = ({
  appointment,
}: {
  appointment: {
    id: number;
    avatar: string;
    patientName: string;
    date: string;
    time: string;
    location: string;
    status: string;
  };
}) => {
  return (
    <div
      key={appointment.id}
      className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12">
            <Image
              src={appointment.avatar}
              alt={appointment.patientName}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-blue-600">
              {appointment.patientName}
            </h3>
            <div className="flex items-center space-x-4 mt-2 text-textSecondary">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{appointment.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{appointment.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{appointment.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600">
            {appointment.status}
          </span>
          <button className="text-textSecondary hover:text-blue-600 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
