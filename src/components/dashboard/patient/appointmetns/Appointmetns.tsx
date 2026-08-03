import React from "react";
import { getTranslations } from "next-intl/server";
import { getAllAppintmentsByPatient } from "@/lib/api/appointment";
import { cookies } from "next/headers";
import { Appointment } from "@/types/Appointment";
import AppointmentCard from "./AppointmentCard";
import { Calendar } from "lucide-react";

const Appointments = async () => {
  const t = await getTranslations("Appointment");
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const appointments: Appointment[] = await getAllAppintmentsByPatient(
    token || ""
  );

  return (
    <div className="space-y-4">
      <h2 className="mb-6 text-2xl font-bold text-ft">{t("myAppointments")}</h2>

      {appointments.length === 0 ? (
        <div className="rounded-3xl border border-secondary bg-white px-6 py-14 text-center">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-main">
            <Calendar className="h-8 w-8" />
          </span>
          <p className="text-ft2">{t("noAppointments")}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment: Appointment) => (
            <AppointmentCard appointment={appointment} key={appointment._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
