import React from "react";
import { useTranslations } from "next-intl";
import { User, Phone, Mail, Calendar, FileText } from "lucide-react";
import DoctorCardAppointment from "./DoctorCardAppointment";

const ApplyAppointment = () => {
  const t = useTranslations("Appointment");
  const doctor = {
    name: "د. محمد أحمد",
    specialty: "أخصائي الباطنة العامة",
    rating: 4.5,
    experience:
      "استشاري الطب الباطي والجهاز الهضمي. حاصل على البورد الأمريكي والزمالة البريطانية خبرة أكثر من 15 عاما في تشخيص وعلاج أمراض الباطة والجهاز الهضمي.",
    languages: ["العربية", "الإنجليزية"],
    workDays: "الأحد - الخميس",
    image: "/imgs/doctorsteam/doctor3.png",
  };
  return (
    <div className="grid md:grid-cols-3 grid-cols-1  gap-6  p-6">
      <DoctorCardAppointment doctor={doctor} />

      <div className="bg-white rounded-lg p-6 shadow-md md:col-span-2 ">
        <h2 className="text-xl font-semibold mb-6">{t("title")}</h2>

        <form className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-gray-600 mb-1">
                {t("fullName")}
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-600 mb-1">{t("phone")}</label>
              <div className="relative">
                <input
                  type="tel"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-600 mb-1">{t("email")}</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-600 mb-1">
                {t("appointmentDate")}
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="block text-gray-600 mb-1">{t("reason")}</label>
            <div className="relative">
              <textarea
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                placeholder={t("reasonPlaceholder")}
              />
              <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyAppointment;
