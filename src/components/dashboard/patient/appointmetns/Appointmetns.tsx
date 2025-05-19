"use client";
import { Appointment } from "@/types/Appointment";
import { Calendar} from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import AppointmentCard from "./AppointmentCard";

// Sample data for testing
const sampleAppointments: Appointment[] = [
  {
    _id: "1",
    patientId: "p123",
    doctorId: "John Smith",
    date: "2024-02-20T10:30:00.000Z",
    notes: "Regular checkup and blood pressure monitoring",
    status: "pending",
    createdAt: "2024-02-15T08:00:00.000Z",
  },
  {
    _id: "2",
    patientId: "p123",
    doctorId: "Sarah Johnson",
    date: "2024-02-22T14:15:00.000Z",
    notes: "Follow-up appointment for previous treatment",
    status: "approved",
    createdAt: "2024-02-16T09:30:00.000Z",
  },
  {
    _id: "3",
    patientId: "p123",
    doctorId: "Michael Brown",
    date: "2024-02-25T11:00:00.000Z",
    notes: "Annual physical examination",
    status: "rejected",
    createdAt: "2024-02-17T10:45:00.000Z",
  },
];

const Appointments = () => {
  const t = useTranslations("Appointment");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6">{t("myAppointments")}</h2>

      {sampleAppointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>{t("noAppointments")}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sampleAppointments.map((appointment) => (
            <AppointmentCard appointment={appointment} key={appointment._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
