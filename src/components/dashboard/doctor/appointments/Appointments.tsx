"use client";

import { useTranslations } from "next-intl";
import AppointmentCard from "./AppointmentCard";

const Appointments = () => {
  const t = useTranslations("Appointments");

  // Sample appointments data
  const appointments = [
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold  mb-6">{t("title")}</h2>

      <div className="space-y-8">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

export default Appointments;
