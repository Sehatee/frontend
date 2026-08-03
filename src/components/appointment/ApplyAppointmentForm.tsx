"use client";
import { applyAppintment } from "@/types/Appointment";
import { User as userType } from "@/types/User";
import { Calendar, FileText, Loader2, Mail, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { applyAppointment } from "@/lib/api/appointment";
import { useRouter } from "next/navigation";
import Field from "@/ui/Field";

const ApplyAppointmentForm = ({
  user,
  doctorId,
}: {
  user: userType;
  doctorId: string;
}) => {
  const t = useTranslations("Appointment");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];
  const [formData, setFormData] = useState<applyAppintment>({
    doctorId,
    date: tomorrowStr,
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const token: string | undefined = Cookies.get("token");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await applyAppointment(formData, token);
      if (res) {
        router.push("/dashboard/patient/appointments");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {!user && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 rounded-3xl bg-ft/40 p-6 text-center">
          <h3 className="font-display text-xl font-bold text-white">
            {t("loginRequired")}
          </h3>
          <p className="max-w-sm text-white/90">{t("loginMessage")}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/login?callBackUrl=/appointment/${doctorId}`}
              className="btn-primary"
            >
              {t("login")}
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-main transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-secondary"
            >
              {t("signup")}
            </Link>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t("fullName")}
          icon={User}
          name="username"
          value={user ? user.username : "username"}
          disabled
          onChange={handleChange}
          id="username"
        />

        <Field
          label={t("phone")}
          icon={Phone}
          type="tel"
          name="phone"
          value={user ? user.phone : "phone"}
          disabled
          onChange={handleChange}
          id="phone"
        />
      </div>

      <Field
        label={t("email")}
        icon={Mail}
        type="email"
        name="email"
        value={user ? user.email : "email"}
        disabled
        onChange={handleChange}
        id="email"
      />

      <Field
        label={t("appointmentDate")}
        icon={Calendar}
        type="date"
        name="date"
        value={formData.date}
        required
        onChange={handleChange}
        min={new Date().toISOString().split("T")[0]}
        max={
          new Date(new Date().getFullYear(), 11, 31)
            .toISOString()
            .split("T")[0]
        }
        pattern="\d{2}/\d{2}/\d{4}"
        placeholder="mm/dd/yyyy"
        id="appointmentDate"
      />

      <div>
        <label
          htmlFor="notes"
          className="mb-1.5 block text-sm font-medium text-ft"
        >
          {t("reason")}
        </label>
        <div className="relative">
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            required
            onChange={handleChange}
            className="h-28 w-full rounded-xl border border-secondary bg-bg py-3 ps-10 pe-4 text-ft placeholder:text-ft2/70 focus:border-main focus:outline-none focus:ring-2 focus:ring-main/30 transition"
            placeholder={t("reasonPlaceholder")}
          />
          <FileText className="pointer-events-none absolute start-3 top-3 size-5 text-main" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          t("submit")
        )}
      </button>
    </form>
  );
};

export default ApplyAppointmentForm;
