"use client";
import { useTranslations } from "next-intl";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import React, { FormEvent, useState } from "react";
import SideBarDashboards from "@/ui/SideBarDashboards";
import { updatePassword, updateUserProfile } from "@/lib/api/profile";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/user";
import { useRouter } from "next/navigation";

export const Account = () => {
  const t = useTranslations("Settings");
  const links = t.raw("links");
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = Cookies.get("token");
  const { user, setUser, clearUser } = useUserStore();
  const router = useRouter();
  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await updatePassword(data, token || "");

      if (res && res.user) {
        setUser(res.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handalDisActiveAccount = async () => {
    setIsDeactivating(true);
    try {
      const data = new FormData();
      const active = false;
      // Ensure active is always appended as a boolean value
      data.append("active", String(active));
      await updateUserProfile(data, token || "");
      clearUser();
      router.push("/login");
      setShowConfirmModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeactivating(false);
    }
  };
  return (
    <div className="min-h-screen p-4">
      {/* ✅ Sidebar الأفقي + ثابت في الأعلى */}

      {/* ✅ المحتوى */}
      <div className="mt-6 flex flex-col gap-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>

        <SideBarDashboards
          links={[
            {
              name: links.l1,
              href: `/dashboard/${user?.role}/settings/account`,
            },
            {
              name: links.l2,
              href: `/dashboard/${user?.role}/settings/notifications`,
            },
          ]}
        />

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
              disabled={isLoading}
              className="bg-main text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
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
              <button
                onClick={() => setShowConfirmModal(true)}
                className="text-red-500 border border-red-500 py-2 px-4 rounded-md hover:bg-red-50 transition-colors"
                disabled={isDeactivating}
              >
                {isDeactivating && <Loader2 className="w-4 h-4 animate-spin" />}
                {t("deleteAccount.button")}
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t("deleteAccount.confirmTitle")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("deleteAccount.confirmDescription")}
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={isDeactivating}
                >
                  {t("deleteAccount.cancel")}
                </button>
                <button
                  onClick={handalDisActiveAccount}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
                  disabled={isDeactivating}
                >
                  {isDeactivating && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {t("deleteAccount.confirm")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
