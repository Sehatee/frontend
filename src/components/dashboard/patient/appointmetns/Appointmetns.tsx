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
  console.log(appointments);
  console.log(token);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6">{t("myAppointments")}</h2>

      {appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>{t("noAppointments")}</p>
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
