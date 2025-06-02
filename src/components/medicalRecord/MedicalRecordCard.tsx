"use client";
import React, { useState } from "react";
import { Trash2, Pencil, Eye, X, FileText } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { MedicalRecordDoctor } from "@/types/MedicalRecord";
import {
  deleteMedicalrecord,
  updateMedicalRecord,
} from "@/lib/api/medicalRecord";
import Cookies from "js-cookie";
function MedicalRecordCard({
  medicalRecords,
}: {
  medicalRecords: MedicalRecordDoctor[];
}) {
  const t = useTranslations("MedicalRecord");
  const [records, setRecords] = useState(medicalRecords);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<
    Partial<MedicalRecordDoctor>
  >({ diagnosis: "", treatment: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const token = Cookies.get("token");
  const handleEdit = (
    id: string,
    currentDiagnosis: string,
    currentTreatment: string
  ) => {
    setEditId(id);
    setEditingRecord({
      diagnosis: currentDiagnosis,
      treatment: currentTreatment,
    });
    setIsModalOpen(true);
  };
  const handleSave = async (id: string) => {
    const updatedRecord = {
      diagnosis: editingRecord.diagnosis,
      treatment: editingRecord.treatment,
    };
    await updateMedicalRecord(updatedRecord, token || "", id);
    setRecords(
      records.map((record) =>
        record._id === id
          ? {
              ...record,
              diagnosis: editingRecord.diagnosis || "",
              treatment: editingRecord.treatment || "",
            }
          : record
      )
    );
    setIsModalOpen(false);
    setEditingRecord({ diagnosis: "", treatment: "" });
    setEditId(null);
  };

  const handleDeleteClick = (id: string) => {
    setRecordToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteMedicalrecord(token || "", recordToDelete || "");
    setRecords(records.filter((record) => record._id !== recordToDelete));
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };

  return (
    <div className="rtl min-h-screen pt-10 pb-20 px-4 md:px-14 mx-auto bg-[#f7fafd]">
      <h2 className="text-[#174ea6] text-[2.1rem] font-bold md:mb-2 text-center">
        {t("patientRecord")}
      </h2>
      <p className="text-[#666] md:text-[1.1rem] text-sm mb-16 text-center">
        {t("patientRecord2")}
      </p>

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
                    src={record.patientId.picture || ""}
                    alt="Medical Record"
                    width={56}
                    height={56}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {record.patientId.username}
                  </h3>
                  <div className="text-xs text-[#888] mt-1">
                    {record.createdAt.split("T")[0]}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={() =>
                      handleEdit(record._id, record.diagnosis, record.treatment)
                    }
                    className="p-2 rounded-full hover:bg-[#e3edfa] text-[#2d6cdf] tooltip"
                    title={t("edit")}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(record._id)}
                    className="p-2 rounded-full hover:bg-[#e3edfa] text-[#e57373] tooltip"
                    title={t("delete")}
                  >
                    <Trash2 size={20} />
                  </button>
                  <Link
                    href={`/dashboard/doctor/medical-record/${record._id}`}
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
            لم يتم العثور على سجلات طبية
          </h3>
          <p className="text-[#666] text-center max-w-md mb-8">
            لا توجد حاليًا أي سجلات طبية متاحة لهذا المريض.{" "}
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r bg-main text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Eye size={18} />
            لعودة إلى الصفحة الرئيسية
          </Link>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#174ea6]">
                {t("editRecord")}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("diagnosis")}
                </label>
                <textarea
                  value={editingRecord.diagnosis}
                  onChange={(e) =>
                    setEditingRecord({
                      ...editingRecord,
                      diagnosis: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("treatment")}
                </label>
                <textarea
                  value={editingRecord.treatment}
                  onChange={(e) =>
                    setEditingRecord({
                      ...editingRecord,
                      treatment: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => handleSave(editId as string)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#2d6cdf] rounded-md hover:bg-blue-600"
                >
                  {t("save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("confirmDelete")}
              </h3>
              <p className="text-sm text-gray-500 mb-6">{t("deleteWarning")}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicalRecordCard;
