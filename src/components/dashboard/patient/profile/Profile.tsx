import SideBarDashboards from "@/ui/SideBarDashboards";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Profile = () => {
  const t = useTranslations("Profile");
  const links = t.raw('links')

  return (
    <div className="flex flex-col gap-6  h-full p-6">
      <h1 className="w-1/3  text-2xl font-bold text-gray-900">{t("title")}</h1>

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
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Card */}
        <div className="w-full  md:w-80 bg-white rounded-lg p-6 shadow-sm ">
          <div className="flex flex-col justify-between h-full items-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src="/imgs/navbar/user.png"
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-bold md:text-xl sm:text-lg text-gray-900 text-center ">
                محمد احمد
              </h3>
              <div className="flex items-center gap-2">
                <Mail size={16} color="#0B62DE" className="text-gray-500" />
                <p className="text-sm text-gray-500">mohamed.ahmed@gmail.com</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} color="#0B62DE" className="text-gray-500" />
                <p className="text-sm text-gray-500">0599255555</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} color="#0B62DE" className="text-gray-500" />
                <p className="text-sm text-gray-500">رفح</p>
              </div>
            </div>

            <button className="w-full bg-main text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              {t("editProfile")}
            </button>
          </div>
        </div>
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
