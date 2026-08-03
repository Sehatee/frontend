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
    <div className="flex h-full flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-ft">{t("title")}</h1>

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

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Profile Card */}
        <ProfileCard />

        {/* Personal Information Form */}
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-ft">{t("personalInfo.title")}</h2>
          <p className="mb-6 mt-1 text-sm text-ft2">{t("personalInfo.subtitle")}</p>

          <FormUpdateUser user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
