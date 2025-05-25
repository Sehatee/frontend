"use client";
import React, { useState } from "react";
import { Eye, FileText } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { MedicalRecordPateint } from "@/types/MedicalRecord";

function MedicalRecordCardPatient({
  medicalRecords,
}: {
  medicalRecords: MedicalRecordPateint[];
}) {
  const t = useTranslations("MedicalRecord");
  const [records] = useState(medicalRecords);
  console.log(records)
  return (
    <div className="rtl min-h-screen pt-10 pb-20 px-4 md:px-14 mx-auto bg-[#f7fafd]">
      <h2 className="text-main text-[2.1rem] font-bold md:mb-2 text-center md:text-start">
        {t("patientRecord")}
      </h2>
      <p className="text-[#666] md:text-[1.1rem] text-sm mb-16 text-center md:text-start">
        {t("patientRecord2")}
      </p>
      <div className="grid grid-cols-1 gap-8">
        {records.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {records.map((record) => (
              <div
                key={record._id}
                className="bg-white rounded-2xl p-6 shadow-md shadow-[#e3edfa] border border-[#e3edfa] flex flex-col gap-2 relative transition duration-200 hover:shadow-sm hover:border-blue-500 group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#e3edfa] rounded-full w-14 h-14 min-w-[56px] overflow-hidden flex items-center justify-center">
                    <Image
                      src={record.doctorId.picture || ""}
                      alt="Medical Record"
                      width={56}
                      height={56}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {record.doctorId.username}
                    </h3>
                    <div className="text-xs text-[#888] mt-1">
                      {record.createdAt.split("T")[0]}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Link
                      href={`/dashboard/patient/medical-record/${record._id}`}
                      className="p-2 rounded-full hover:bg-[#e3edfa] text-[#4caf50] tooltip"
                      title={t("visit")}
                    >
                      <Eye size={20} />
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div>
                    <div className="text-sm text-[#333] font-bold">
                      {record.diagnosis}
                    </div>
                    <div className="text-xs text-[#888] mt-2">
                      {record.treatment}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-12 shadow-md shadow-[#e3edfa] border border-[#e3edfa]">
            <div className="bg-[#e3edfa] p-6 rounded-full mb-6">
              <FileText className="w-16 h-16 text-main" />
            </div>
            <h3 className="text-2xl font-semibold text-main mb-3">
              No Medical Records Found
            </h3>
            <p className="text-[#666] text-center max-w-md mb-8">
              There are currently no medical records available for this patient
            </p>
            <Link
              href="/dashboard/doctor"
              className="px-6 py-3 bg-gradient-to-r bg-main text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Eye size={18} />
              Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalRecordCardPatient;
