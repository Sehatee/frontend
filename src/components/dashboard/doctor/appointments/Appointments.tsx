"use client";

import { useTranslations } from "next-intl";
import AppointmentCard from "./AppointmentCard";
import { useState } from "react";
import { X, FileText, User } from "lucide-react";
import { Appointment } from "@/types/Appointment";

const Appointments = () => {
  const t = useTranslations("Appointments");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Sample appointments data
  const appointments: Appointment[] = [
    {
      _id: "1",
      patientId: {
        _id: "patient1",
        username: "imad",
        email: "imad@example.com",
        role: "patient",
        avgRatings: 0,
        active: true,
        description: "",
        createdAt: new Date(),
        reviews: []
      },
      doctorId: "doctor1",
      date: "2024-02-20",
      notes: "Regular checkup",
      status: "upcoming",
      createdAt: "2024-02-19"
    },
    {
      _id: "2",
      patientId: {
        _id: "patient2",
        username: "imad",
        email: "imad@example.com",
        role: "patient",
        avgRatings: 0,
        active: true,
        description: "",
        createdAt: new Date(),
        reviews: []
      },
      doctorId: "doctor1",
      date: "2024-02-20",
      notes: "Follow-up appointment",
      status: "upcoming",
      createdAt: "2024-02-19"
    }
  ];

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>

      <div className="space-y-8">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            onClick={() => setSelectedAppointment(appointment)}
          >
            <AppointmentCard appointment={appointment} />
          </div>
        ))}
      </div>

      {/* Patient Information Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
            <button
              onClick={() => setSelectedAppointment(null)}
              className="absolute  right-4 top-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-start space-x-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  {t("appointmentDetails")}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="w-5 h-5" />
                    <span>
                      {t("patient")}: {selectedAppointment.patientId.username}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FileText className="w-5 h-5" />
                    <span>
                      {t("date")}: {selectedAppointment.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FileText className="w-5 h-5" />
                    <span>
                      {t("status")}: {selectedAppointment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
