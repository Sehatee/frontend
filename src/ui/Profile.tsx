import { fetchUser } from "@/lib/fetchUser";
import SideBarDashboards from "@/ui/SideBarDashboards";
import { getTranslations } from "next-intl/server";
import React from "react";
import ProfileCard from "./ProfileCard";

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
      <div className="flex flex-col md:flex-row gap-6">
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

          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">
                  {t("personalInfo.fullName")}
                </label>
                <input
                  type="text"
                  placeholder="محمد احمد"
                  className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">
                  {t("personalInfo.email")}
                </label>
                <input
                  type="email"
                  placeholder="mohamed.ahmed@gmail.com"
                  className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">
                  {t("personalInfo.phone")}
                </label>
                <input
                  type="tel"
                  placeholder="0599255555"
                  className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                />
              </div>

              {/* Birth Date */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">
                  {t("personalInfo.birthDate")}
                </label>
                <input
                  type="date"
                  className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm text-gray-600">
                  {t("personalInfo.address")}
                </label>
                <input
                  type="text"
                  placeholder="رفح الغربية"
                  className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
