"use client";
import { applyAppintment } from "@/types/Appointment";
import { User as userType } from "@/types/User";
import { Calendar, FileText, Mail, Phone, User, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { applyAppointment } from "@/lib/api/appointment";
import { useRouter } from "next/navigation";

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
    <form className="space-y-4" onSubmit={handleSubmit}>
      {!user && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-4 z-10">
          <h3 className="text-white text-xl font-semibold text-center">
            {t("loginRequired")}
          </h3>
          <p className="text-white/90 text-center mb-4">{t("loginMessage")}</p>
          <div className="flex gap-4">
            <Link
              href={`/login?callBackUrl=/appointment/${doctorId}`}
              className="px-6 py-2 bg-main text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {t("login")}
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-white text-main rounded-md hover:bg-gray-100 transition-colors"
            >
              {t("signup")}
            </Link>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <div className="flex justify-between gap-3">
          <div className="relative w-full">
            <label className="block text-gray-600 mb-1">{t("fullName")}</label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={user ? user.username : "username"}
                disabled
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <User className="w-5 h-5 text-main absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="relative w-full">
            <label className="block text-gray-600 mb-1">{t("phone")}</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={user ? user.phone : "phone"}
                disabled
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Phone className="w-5 h-5 text-main absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div className="relative">
          <label className="block text-gray-600 mb-1">{t("email")}</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={user ? user.email : "email"}
              disabled
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Mail className="w-5 h-5 text-main absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-gray-600 mb-1">
            {t("appointmentDate")}
          </label>
          <div className="relative">
            <input
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
              disabled
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Calendar className="w-5 h-5 text-main absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="relative">
        <label className="block text-gray-600 mb-1">{t("reason")}</label>
        <div className="relative">
          <textarea
            name="notes"
            value={formData.notes}
            required
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            placeholder={t("reasonPlaceholder")}
          />
          <FileText className="w-5 h-5 text-main absolute left-3 top-3" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
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
