"use client";
import React, { useState } from "react";
import { Mail, Phone, Download, FileText, AlertCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { MedicalRecordPateint } from "@/types/MedicalRecord";
import Image from "next/image";

const MedicalRecordPatient = ({
  medicalRecord,
}: {
  medicalRecord: MedicalRecordPateint;
}) => {
  const locale = useLocale();
  const t = useTranslations("MedicalRecord");

  const [record] = useState<MedicalRecordPateint>(medicalRecord);
  if (!record._id) {
    return (
      <div className="rtl min-h-screen pt-6 pb-20 px-4 md:px-14 mx-auto bg-[#f7fafd]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2
              className={`text-[#174ea6] text-[2.1rem] font-bold mb-2 ${
                locale === "en" ? "text-left" : "text-center md:text-right"
              }`}
            >
              {t("title")}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-10 shadow-md shadow-[#e3edfa] flex flex-col items-center justify-center text-center">
          <div className="bg-[#f7fafd] rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <AlertCircle size={32} className="text-[#e57373]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Medical Record Not Found
          </h3>
          <p className="text-[#666] mb-6">
            The requested medical record could not be found or may have been
            deleted.
          </p>
          <button
            className="bg-[#2d6cdf] text-white rounded-lg px-6 py-2 hover:bg-[#174ea6] transition-colors duration-200"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  const medicalFiles = record.attachments.map((file) => {
    return file;
  });
  return (
    <div className="rtl min-h-screen pt-6 pb-20 px-4 md:px-14 mx-auto bg-[#f7fafd]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2
            className={`text-[#174ea6] text-[2.1rem] font-bold mb-2 ${
              locale === "en" ? "text-left" : "text-center md:text-right"
            }`}
          >
            {t("title")}
          </h2>
          <p
            className={`text-[#666] text-[1.1rem] mt-0 mb-4 ${
              locale === "en" ? "text-left" : "text-center md:text-right"
            }`}
          >
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-10 shadow-md shadow-[#e3edfa] flex flex-col md:flex-row gap-6 items-center">
        <div className="bg-[#e3edfa] rounded-full w-24 h-24 flex items-center justify-center text-4xl text-[#2d6cdf] font-bold">
          <Image
            src={record.doctorId.picture || ""}
            width={100}
            height={100}
            alt={`img ${record.doctorId.username}`}
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2 items-center md:items-start">
          <h3 className="text-xl font-semibold">{record.doctorId.username}</h3>

          <div className="flex gap-4 mt-2 text-[#888] text-sm flex-wrap items-center justify-center md:justify-start">
            <span className="flex items-center gap-1">
              <Phone size={18} className="text-[#2d6cdf]" />
              {record.doctorId.phone}
            </span>
            <span className="flex items-center gap-2">
              <Mail size={18} className="text-[#2d6cdf]" />
              {record.doctorId.email}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-md shadow-[#e3edfa] border border-[#e3edfa]">
          <h4 className="text-[#2d6cdf] text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-[#e57373] text-3xl">♡</span>
            {t("currentDiagnosis")}
          </h4>
          <div className="flex flex-col gap-4">
            {record.diagnosis.split(",").map((disease, i) => {
              const words = disease.trim().split(" ");
              return (
                <div
                  key={i}
                  className="bg-[#f7fafd] rounded-lg p-4 hover:bg-[#e3edfa] transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#2d6cdf] text-2xl font-bold">
                      {words[0]}
                    </span>
                    <span className="text-xl">{words.slice(1).join(" ")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md shadow-[#e3edfa] border border-[#e3edfa]">
          <h4 className="text-[#2d6cdf] text-lg font-semibold mb-2 flex items-center gap-2">
            <FileText size={20} className="text-[#2d6cdf]" />
            {t("medicalFilesTitle")}
          </h4>
          <p className="text-[#888] text-sm mb-3">{t("medicalFilesDesc")}</p>
          <div className="flex flex-col gap-2">
            {medicalFiles.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-[#f7fafd] rounded-lg px-3 py-2"
              >
                <span className="flex items-center gap-2">
                  <FileText size={18} />
                  ملف
                </span>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#e3edfa] hover:bg-[#d6e4fa] rounded p-1"
                  title="تحميل"
                >
                  <Download size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="bg-white rounded-xl p-4 shadow-md shadow-[#e3edfa] border border-[#e3edfa] relative">
          <h4 className="text-[#2d6cdf] text-lg font-semibold mb-2 flex items-center gap-2">
            <span className="text-[#388e3c]">💊</span>
            {t("treatmentPlan")}
          </h4>
          <div className="mb-2 text-xs text-[#888]">
            {t("lastUpdateTitle")} {record.updatedAt}
          </div>
          <div>
            <div className="text-sm">{record.treatment}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordPatient;
