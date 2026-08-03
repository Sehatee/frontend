import AppointmentCard from "./AppointmentCard";
import { Appointment } from "@/types/Appointment";
import { getTranslations } from "next-intl/server";
import { getAllAppintmentsByDoctor } from "@/lib/api/appointment";
import { cookies } from "next/headers";
import { CalendarX2 } from "lucide-react";

const Appointments = async () => {
  const t = await getTranslations("Appointments");
  const token = (await cookies()).get("token")?.value;
  const appointments: Appointment[] = await getAllAppintmentsByDoctor(
    token || ""
  );

  return (
    <div className="relative min-h-screen p-6">
      <h2 className="mb-6 text-2xl font-bold text-ft">{t("title")}</h2>

      <div className="space-y-6">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment._id} appointment={appointment} />
          ))
        ) : (
          <div className="rounded-3xl border border-secondary bg-white px-6 py-14 text-center">
            <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-main">
              <CalendarX2 className="h-8 w-8" />
            </span>
            <h1 className="text-main text-2xl font-semibold">
              لا توجد اي مواعيد لديك
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
