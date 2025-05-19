import React from "react";
import DoctorCardAppointment from "./DoctorCardAppointment";
import { getDoctor } from "@/lib/api/doctor";
import { User as userType } from "@/types/User";
import { getTranslations } from "next-intl/server";
import { fetchUser } from "@/lib/fetchUser";
import ApplyAppointmentForm from "./ApplyAppointmentForm";

const ApplyAppointment = async ({ doctorId }: { doctorId: string }) => {
  const t = await getTranslations("Appointment");
  const response = await getDoctor(doctorId);
  const doctor: userType = response;
  const user = await fetchUser();

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1  gap-6  p-6">
      <DoctorCardAppointment doctor={doctor} />

      <div className="bg-white rounded-lg p-6 shadow-md lg:col-span-2 relative">
        <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>

        {/* form  */}
        <ApplyAppointmentForm user={user} doctorId={doctorId} />
      </div>
    </div>
  );
};

export default ApplyAppointment;
