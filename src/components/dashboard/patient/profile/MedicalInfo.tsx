import SideBarDashboards from "@/ui/SideBarDashboards";
import { useTranslations } from "next-intl";
import React from "react";

export const MedicalInfo = () => {
  const t = useTranslations("MedicalInfo");
  const t2 = useTranslations("Profile");

  const links = t2.raw("links");

  return (
    <div className="flex flex-col gap-6  h-full ">
      <h1 className="w-1/3  text-2xl font-bold text-gray-900">{t("title")}</h1>
      <SideBarDashboards
        links={[
          {
            name: links.l1 ,
            href: "/dashboard/patient/profile/info",
          },
          {
            name: links.l2,
            href: "/dashboard/patient/profile/medicalinfo",
          },
        ]}
      />
      <div className=" flex-1 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {t("title")}
        </h2>
        <p className="text-sm text-gray-500 mb-6">{t("subtitle")}</p>

        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Height */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">{t("height")}</label>
              <input
                type="number"
                placeholder="175"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>

            {/* Weight */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">{t("weight")}</label>
              <input
                type="number"
                placeholder="75"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>

            {/* Blood Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">{t("bloodType")}</label>
              <input
                type="text"
                placeholder="A+"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>

            {/* Chronic Diseases */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">
                {t("chronicDiseases")}
              </label>
              <input
                type="text"
                placeholder="-"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
