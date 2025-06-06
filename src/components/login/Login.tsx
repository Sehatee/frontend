"use client";
import React, { useState } from "react";
import { Mail, Lock, EyeOff, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { handleLogin } from "@/lib/auth";
import showToast from "@/utils/showToast";
import { useUserStore } from "@/stores/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = ({ callBackUrl }: { callBackUrl?: string }) => {
  const t = useTranslations("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {t("title")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("email")}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-main" />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full pl-10 px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder={t("email")}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("password")}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-main" />
              <input
                type="password"
                required
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full pl-10 px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder={t("password")}
              />
              <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-main rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("loading")}
              </>
            ) : (
              t("btnText")
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
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
  );
};

export default Login;
