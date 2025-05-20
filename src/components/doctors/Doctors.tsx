import TextHeader from "@/ui/TextHeader";
import React from "react";
import DoctorCard from "./cards/DoctorCard";
import { getAllDoctors } from "@/lib/api/doctors";
import { User } from "@/types/User";
import { getTranslations } from "next-intl/server";
import SerchBar from "./SerchBar";
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
    <div className="my-36">
      {/* main text */}
      <TextHeader title={t("title")} subTitle={t("subTitle")} />
      {/* side bar to search */}
      <SerchBar options={optionsSpecializationS} />
      {/* doctors cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-5 px-4 md:px-8">
        {doctors.length > 0 ? (
          doctors.map((doctor) => {
            return <DoctorCard doctor={doctor} key={doctor._id} />;
          })
        ) : (
          <div className="min-h-[400px] col-span-1 lg:col-span-2 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 text-gray-400 mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t("noDoctorsFound")}
              </h3>
              <p className="text-gray-600">{t("tryAdjustingFilters")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
