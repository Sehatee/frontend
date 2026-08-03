import React from "react";
import DoctorCardAppointment from "./DoctorCardAppointment";
import { getDoctor } from "@/lib/api/doctor";
import { User as userType } from "@/types/User";
import { getTranslations } from "next-intl/server";
import { fetchUser } from "@/lib/fetchUser";
import ApplyAppointmentForm from "./ApplyAppointmentForm";
import TextHeader from "@/ui/TextHeader";

const ApplyAppointment = async ({ doctorId }: { doctorId: string }) => {
  const t = await getTranslations("Appointment");
  const response = await getDoctor(doctorId);
  const doctor: userType = response;
  const user = await fetchUser();

  return (
    <div className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <TextHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subTitle={t("subTitle")}
          align="start"
          accent
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <DoctorCardAppointment doctor={doctor} />

          <div className="relative rounded-3xl border border-secondary bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
            <ApplyAppointmentForm user={user} doctorId={doctorId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyAppointment;
