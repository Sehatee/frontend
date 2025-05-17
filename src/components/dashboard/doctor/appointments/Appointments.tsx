"use client";

import { useTranslations } from "next-intl";
import AppointmentCard from "./AppointmentCard";
import { useState } from "react";
import { X, Phone, Mail, FileText, User } from "lucide-react";
import Image from "next/image";

const Appointments = () => {
  const t = useTranslations("Appointments");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      patientName: "John go",
      date: "2024-02-20",
      time: "10:00 AM",
      location: "Clinic A",
      status: "upcoming",
      avatar: "/imgs/navbar/user.png",
    },
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-02-20",
      time: "10:00 AM",
      location: "Clinic A",
      status: "upcoming",
      avatar: "/imgs/navbar/user.png",
      phone: "+1234567890",
      email: "john@example.com",
      age: 35,
      gender: "Male",
      notes: "Regular checkup",
    },
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-02-20",
      time: "10:00 AM",
      location: "Clinic A",
      status: "upcoming",
      avatar: "/imgs/navbar/user.png",
    },
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-02-20",
      time: "10:00 AM",
      location: "Clinic A",
      status: "upcoming",
      avatar: "/imgs/navbar/user.png",
    },
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-02-20",
      time: "10:00 AM",
      location: "Clinic A",
      status: "upcoming",
      avatar: "/imgs/navbar/user.png",
    },
    // Add more appointments as needed
  ];

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>

      <div className="space-y-8">
        {appointments.map((appointment) => (
          <div key={appointment.id} onClick={() => setSelectedAppointment(appointment)}>
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
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-start space-x-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={selectedAppointment.avatar}
                  alt={selectedAppointment.patientName}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  {selectedAppointment.patientName}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <User className="w-5 h-5" />
                      <span>{t("age")}: {selectedAppointment.age}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <User className="w-5 h-5" />
                      <span>{t("gender")}: {selectedAppointment.gender}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-5 h-5" />
                      <span>{selectedAppointment.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-5 h-5" />
                      <span>{selectedAppointment.email}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FileText className="w-5 h-5" />
                      <span>{t("notes")}:</span>
                    </div>
                    <p className="text-gray-600 ml-7">{selectedAppointment.notes}</p>
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
