"use client";
import { useTranslations } from "next-intl";
import { AlertCircle, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import React, { FormEvent, useState } from "react";
import SideBarDashboards from "@/ui/SideBarDashboards";
import { updatePassword, updateUserProfile } from "@/lib/api/profile";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/user";
import { useRouter } from "next/navigation";
import Field from "@/ui/Field";
import Modal from "@/ui/Modal";

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
      <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-6">
        <h1 className="text-2xl font-bold text-ft">{t("title")}</h1>

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
        <div className="rounded-3xl border border-secondary bg-white p-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-main" />
            <h2 className="text-lg font-bold text-ft">
              {t("changePassword.title")}
            </h2>
          </div>
          <p className="mb-6 text-sm text-ft2">
            {t("changePassword.subtitle")}
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleUpdatePassword}>
            <Field
              id="current-password"
              label={t("changePassword.currentPassword")}
              icon={Lock}
              type={showPassword ? "text" : "password"}
              value={data.oldPassword}
              onChange={(e) => {
                setData((oldData) => {
                  return {
                    ...oldData,
                    oldPassword: e.target.value,
                  };
                });
              }}
              endIcon={showPassword ? EyeOff : Eye}
              onEndIconClick={() => setShowPassword(!showPassword)}
            />

            <Field
              id="new-password"
              label={t("changePassword.newPassword")}
              icon={Lock}
              type={showNewPassword ? "text" : "password"}
              value={data.newPassword}
              onChange={(e) => {
                setData((oldData) => {
                  return {
                    ...oldData,
                    newPassword: e.target.value,
                  };
                });
              }}
              endIcon={showNewPassword ? EyeOff : Eye}
              onEndIconClick={() => setShowNewPassword(!showNewPassword)}
            />

            <Field
              id="confirm-password"
              label={t("changePassword.confirmPassword")}
              icon={Lock}
              type={showConfirmPassword ? "text" : "password"}
              value={data.confirmPassword}
              onChange={(e) => {
                setData((oldData) => {
                  return {
                    ...oldData,
                    confirmPassword: e.target.value,
                  };
                });
              }}
              endIcon={showConfirmPassword ? EyeOff : Eye}
              onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("changePassword.submit")}
            </button>
          </form>
        </div>

        {/* Delete account */}
        <div className="rounded-3xl border border-secondary bg-white p-8">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-1 text-xl font-bold text-red-600">
                <AlertCircle className="mt-1" size={24} />
                <h2>{t("deleteAccount.title")}</h2>
              </div>
              <p className="mb-4 text-sm text-ft2">
                {t("deleteAccount.description")}
              </p>
              <button
                onClick={() => setShowConfirmModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-red-300 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                disabled={isDeactivating}
              >
                {isDeactivating && <Loader2 className="h-4 w-4 animate-spin" />}
                {t("deleteAccount.button")}
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        <Modal
          open={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title={t("deleteAccount.confirmTitle")}
        >
          <p className="text-ft2">{t("deleteAccount.confirmDescription")}</p>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="text-sm font-medium text-ft2 transition-colors hover:text-ft"
              disabled={isDeactivating}
            >
              {t("deleteAccount.cancel")}
            </button>
            <button
              onClick={handalDisActiveAccount}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              disabled={isDeactivating}
            >
              {isDeactivating && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("deleteAccount.confirm")}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Account;
