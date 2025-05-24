"use client";
import { Appointment } from "@/types/Appointment";
import { CreateMedicalRecord } from "@/types/MedicalRecord";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface MedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
  onSubmit: (data: FormData) => void;
}

const MedicalRecordModal = ({
  isOpen,
  onClose,
  appointment,
  onSubmit,
}: MedicalRecordModalProps) => {
  const t = useTranslations("MedicalRecord");
  const [formData, setFormData] = useState<CreateMedicalRecord>({
    patientId: appointment.patientId._id,
    diagnosis: "",
    treatment: "",
    files: null,
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("patientId", formData.patientId);
    submitData.append("diagnosis", formData.diagnosis);
    submitData.append("treatment", formData.treatment);

    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        submitData.append(`files`, file);
      });
    }

    onSubmit(submitData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{t("titleCreate")}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("form.diagnosis.label")}
            </label>
            <textarea
              className="w-full border rounded-lg p-2"
              value={formData.diagnosis}
              onChange={(e) =>
                setFormData({ ...formData, diagnosis: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("form.treatment.label")}
            </label>
            <textarea
              className="w-full border rounded-lg p-2"
              value={formData.treatment}
              onChange={(e) =>
                setFormData({ ...formData, treatment: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("form.attachments.label")}
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => {
                setSelectedFiles(e.target.files);
              }}
              className="w-full p-2 border rounded-lg"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <p className="text-sm text-gray-500 mt-1">
              {t("form.attachments.helpText")}
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              {t("form.buttons.cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {t("form.buttons.create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordModal;
