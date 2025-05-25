"use client";
import { useTranslations } from "next-intl";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import React, { FormEvent, useState } from "react";
import SideBarDashboards from "@/ui/SideBarDashboards";
import { updatePassword } from "@/lib/api/profile";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/user";
export const Account = () => {
  const t = useTranslations("Settings");
  const links = t.raw("links");

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = Cookies.get("token");
  const { setUser } = useUserStore();
  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await updatePassword(data, token || "");

      if (res && res.user) {
        setUser(res.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen p-4">
      {/* ✅ Sidebar الأفقي + ثابت في الأعلى */}

      {/* ✅ المحتوى */}
      <div className="mt-6 flex flex-col gap-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <div className="sticky top-20  z-10 ">
          <SideBarDashboards
            links={[
              {
                name: links.l1,
                href: "/dashboard/patient/settings/account",
              },
              {
                name: links.l2,
                href: "/dashboard/patient/settings/notifications",
              },
            ]}
          />
        </div>
        {/* Change Password */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-main" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t("changePassword.title")}
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            {t("changePassword.subtitle")}
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleUpdatePassword}>
            {/* current */}
            <div className="relative">
              <label className="text-sm text-gray-600 mb-1 block">
                {t("changePassword.currentPassword")}
              </label>
              <div className="relative">
                <input
                  onChange={(e) => {
                    setData((oldData) => {
                      return {
                        ...oldData,
                        oldPassword: e.target.value,
                      };
                    });
                  }}
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* new */}
            <div className="relative">
              <label className="text-sm text-gray-600 mb-1 block">
                {t("changePassword.newPassword")}
              </label>
              <div className="relative">
                <input
                  onChange={(e) => {
                    setData((oldData) => {
                      return {
                        ...oldData,
                        newPassword: e.target.value,
                      };
                    });
                  }}
                  type={showNewPassword ? "text" : "password"}
                  className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* confirm */}
            <div className="relative">
              <label className="text-sm text-gray-600 mb-1 block">
                {t("changePassword.confirmPassword")}
              </label>
              <div className="relative">
                <input
                  onChange={(e) => {
                    setData((oldData) => {
                      return {
                        ...oldData,
                        confirmPassword: e.target.value,
                      };
                    });
                  }}
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-main text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full"
            >
              {t("changePassword.submit")}
            </button>
          </form>
        </div>

        {/* Delete account */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-1 text-xl font-bold text-red-500 mb-2">
                <AlertCircle className="mt-1" size={24} />
                <h1>{t("deleteAccount.title")}</h1>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {t("deleteAccount.description")}
              </p>
              <button className="text-red-500 border border-red-500 py-2 px-4 rounded-md hover:bg-red-50 transition-colors">
                {t("deleteAccount.button")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
