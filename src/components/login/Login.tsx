"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { handleLogin } from "@/lib/auth";
import showToast from "@/utils/showToast";
import { useUserStore } from "@/stores/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Field from "@/ui/Field";
import AuthBrandPanel from "@/ui/AuthBrandPanel";

const Login = ({ callBackUrl }: { callBackUrl?: string }) => {
  const t = useTranslations("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await handleLogin(email, password);

      if (res) {
        setUser(res.user);
        showToast("success", "تم تسجيل الدخول بنجاح");
        if (callBackUrl) {
          router.push(callBackUrl);
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-bg">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-12 lg:py-12">
        <AuthBrandPanel ns="Login" />

        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-secondary bg-white p-8 shadow-sm sm:p-10">
            <span className="eyebrow">{t("brandEyebrow")}</span>
            <h1 className="mt-5 text-3xl font-bold text-ft sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-2 text-ft2">{t("subtitle")}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Field
                label={t("email")}
                icon={Mail}
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder={t("email")}
              />
              <Field
                label={t("password")}
                icon={Lock}
                endIcon={showPassword ? EyeOff : Eye}
                onEndIconClick={() => setShowPassword((s) => !s)}
                type={showPassword ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder={t("password")}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {t("loading")}
                  </>
                ) : (
                  t("btnText")
                )}
              </button>
            </form>

            <div className="mt-5 text-center">
              <a href="#" className="text-sm text-main hover:underline">
                {t("forgotPassword")}
              </a>
            </div>
            <div className="mt-2 text-center">
              <Link href="/signup" className="text-sm text-main hover:underline">
                {t("noAccount")} {t("signup")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
