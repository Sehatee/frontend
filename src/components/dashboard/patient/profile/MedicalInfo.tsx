import SideBarDashboards from "@/ui/SideBarDashboards";
import { useTranslations } from "next-intl";
import { Activity, Droplets, Ruler, Weight } from "lucide-react";
import React from "react";

export const MedicalInfo = () => {
  const t = useTranslations("MedicalInfo");
  const t2 = useTranslations("Profile");

  const links = t2.raw("links");

  const items = [
    { icon: Ruler, label: t("height"), value: "175" },
    { icon: Weight, label: t("weight"), value: "75" },
    { icon: Droplets, label: t("bloodType"), value: "A+" },
    { icon: Activity, label: t("chronicDiseases"), value: "—" },
  ];

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-ft">{t("title")}</h1>
      <SideBarDashboards
        links={[
          {
            name: links.l1,
            href: "/dashboard/patient/profile/info",
          },
          {
            name: links.l2,
            href: "/dashboard/patient/profile/medicalinfo",
          },
        ]}
      />
      <div className="flex-1 rounded-3xl border border-secondary bg-white p-8">
        <h2 className="text-xl font-bold text-ft">{t("title")}</h2>
        <p className="mb-8 mt-1 text-sm text-ft2">{t("subtitle")}</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl bg-secondary p-6">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-main shadow-sm">
                <Icon className="h-6 w-6" />
              </span>
              <p className="text-sm text-ft2">{label}</p>
              <p className="mt-1 text-lg font-semibold text-ft">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
