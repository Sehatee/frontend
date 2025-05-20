import { fetchUser } from "@/lib/fetchUser";
import SideBarDashboards from "@/ui/SideBarDashboards";
import { getTranslations } from "next-intl/server";
import React from "react";
import ProfileCard from "./ProfileCard";
import FormUpdateUser from "./FormUpdateUser";

const Profile = async () => {
  const t = await getTranslations("Profile");
  const links = t.raw("links");
  const user = await fetchUser();

  return (
    <div className="flex flex-col gap-6  h-full p-6">
      <h1 className="w-1/3  text-2xl font-bold text-gray-900">{t("title")}</h1>

      <SideBarDashboards
        links={[
          {
            name: links.l1,
            href: `/dashboard/${user.role}/profile/info`,
          },
          {
            name: links.l2,
            href: `/dashboard/${user.role}/profile/medicalinfo`,
          },
        ]}
      />
      <div className="bg-red-400 flex flex-col md:flex-row gap-6">
        {/* Profile Card */}
        <ProfileCard />
        {/* Personal Information Form */}
        <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t("personalInfo.title")}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {t("personalInfo.subtitle")}
          </p>

          <FormUpdateUser user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
