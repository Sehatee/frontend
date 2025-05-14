import TextHeader from "@/ui/TextHeader";
import React from "react";
import DoctorCard from "./cards/DoctorCard";
import { getAllDoctors } from "@/lib/api/doctors";
import { User } from "@/types/User";
import { getTranslations } from "next-intl/server";
import SerchBar from "./SerchBar";

const Doctors = async () => {
  const t = await getTranslations("Doctors");
  const response = await getAllDoctors();
  const doctors: User[] = response;
  console.log("docs", doctors);

  return (
    <div className="my-36">
      {/* main text */}
      <TextHeader title={t("title")} subTitle={t("subTitle")} />
      {/* side bar to search */}
      <SerchBar />
      {/* doctors cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-5 px-4 md:px-8">
        {doctors ? (
          doctors.map((doctor) => {
            return (
              <DoctorCard
                key={doctor._id}
                id={doctor._id}
                name={doctor.username}
                rating={doctor.avgRatings}
                totalRatings={12}
                specialization={doctor.specialization || ""}
                experience={doctor.description}
                languages={["ar"]}
                workDays={[{ day: "Sunday" }]}
                imageUrl={doctor.picture || ""}
              />
            );
          })
        ) : (
          <div className="min-h-[400px] flex items-center justify-center">
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
