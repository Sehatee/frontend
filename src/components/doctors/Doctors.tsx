import TextHeader from "@/ui/TextHeader";
import React from "react";
import DoctorCard from "./cards/DoctorCard";
import { getAllDoctors } from "@/lib/api/doctors";
import { User } from "@/types/User";
import { getTranslations } from "next-intl/server";
import SerchBar from "./SerchBar";
import { SearchX, Users } from "lucide-react";
import Link from "next/link";
interface DoctorsProps {
  searchParams: {
    search?: string;
    specialization?: string;
  };
}
const Doctors = async ({ searchParams }: DoctorsProps) => {
  const t = await getTranslations("Doctors");
  const { search, specialization } = searchParams;

  const response = await getAllDoctors(specialization, search);
  const doctors: User[] = response;
  const optionsSpecializationS = Array.from(
    new Set(
      doctors.map((doctor) => {
        return doctor.specialization;
      })
    )
  );

  return (
    <div className="my-16 md:my-24">
      {/* hero */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-4 md:flex-row md:items-end md:justify-between md:px-8 lg:px-12">
        <div className="w-full max-w-2xl">
          <TextHeader
            title={t("title")}
            subTitle={t("subTitle")}
            eyebrow={t("eyebrow")}
            align="start"
            accent
          />
        </div>
        <div className="flex shrink-0 items-center gap-3 rounded-full bg-main px-6 py-3 shadow-lg shadow-main/25">
          <Users className="size-5 text-white/80" />
          <span className="font-display text-xl font-bold text-white">
            {doctors.length}
          </span>
          <span className="text-sm text-white/80">{t("doctorsCount")}</span>
        </div>
      </div>

      {/* side bar to search */}
      <SerchBar options={optionsSpecializationS} />

      {/* doctors cards */}
      <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
        {doctors.length > 0 ? (
          doctors.map((doctor) => {
            return <DoctorCard doctor={doctor} key={doctor._id} />;
          })
        ) : (
          <div className="col-span-1 flex min-h-[400px] items-center justify-center md:col-span-2 lg:col-span-3">
            <div className="w-full max-w-md rounded-3xl border border-secondary bg-white p-12 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                <SearchX className="size-10 text-main" />
              </div>
              <span className="eyebrow">{t("noDoctorsEyebrow")}</span>
              <h3 className="mt-5 font-display text-2xl font-bold text-ft">
                {t("noDoctorsFound")}
              </h3>
              <p className="mt-2 text-ft2">{t("tryAdjustingFilters")}</p>
              <Link href="/doctors" className="btn-primary mt-8">
                {t("resetFilters")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
