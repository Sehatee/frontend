"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Loader2, Lock, Mail, Phone, Upload, User } from "lucide-react";
import Image from "next/image";
import { handleSignup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import showToast from "@/utils/showToast";
import Field from "@/ui/Field";
import AuthBrandPanel from "@/ui/AuthBrandPanel";

const Signup = () => {
  const t = useTranslations("Signup");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    file: null as File | null,
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await handleSignup(formData);
      if (res) {
        showToast("success", "تم تسجيل حسابك بنجاح ، سجل دخول للإكمال من فضلك");
        router.push("/login");
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
        <AuthBrandPanel ns="Signup" />

        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-secondary bg-white p-8 shadow-sm sm:p-10">
            <span className="eyebrow">{t("brandEyebrow")}</span>
            <h1 className="mt-5 text-3xl font-bold text-ft sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-2 text-ft2">{t("subtitle")}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="flex flex-col items-center">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border border-secondary bg-secondary">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Avatar preview"
                      width={150}
                      height={150}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Upload className="size-8 text-main" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-3 cursor-pointer text-sm font-medium text-main transition hover:text-mainLight"
                >
                  {t("uploadAvatar")}
                </label>
              </div>

              <Field
                label={t("name")}
                icon={User}
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <Field
                label={t("phone")}
                icon={Phone}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Field
                label={t("email")}
                icon={Mail}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Field
                label={t("password")}
                icon={Lock}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Field
                label={t("confirmPassword")}
                icon={Lock}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                  }}
                  required
                  className="mt-1 h-4 w-4 shrink-0 rounded border-secondary accent-main focus:ring-main/30"
                />
                <label className="ms-2 block text-sm text-ft2">
                  <span>
                    {[
                      t("acceptTerms").split(" ")[0],
                      t("acceptTerms").split(" ")[1],
                    ].join(" ")}
                  </span>{" "}
                  <Link
                    href={"/terms"}
                    target="_blank"
                    className="text-main hover:underline"
                  >
                    {[
                      t("acceptTerms").split(" ")[2],
                      t("acceptTerms").split(" ")[3],
                    ].join(" ")}{" "}
                    <span className="text-main hover:underline">
                      {t("acceptTerms").split(" ")[4] || ""}
                    </span>
                  </Link>{" "}
                </label>
              </div>

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

            <div className="mt-6 w-full text-center">
              <Link href={"/login"} className="text-sm text-main hover:underline">
                {t("haveAccount")} {t("login")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
