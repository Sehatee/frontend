"use client";
import { Appointment } from "@/types/Appointment";
import { CreateMedicalRecord } from "@/types/MedicalRecord";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Modal from "@/ui/Modal";

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

  return (
    <Modal open={isOpen} onClose={onClose} title={t("titleCreate")}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="diagnosis" className="text-sm font-medium text-ft">
            {t("form.diagnosis.label")}
          </label>
          <textarea
            id="diagnosis"
            className="w-full rounded-xl border border-secondary bg-bg p-3 text-ft placeholder:text-ft2/70 transition focus:border-main focus:outline-none focus:ring-2 focus:ring-main/30"
            value={formData.diagnosis}
            onChange={(e) =>
              setFormData({ ...formData, diagnosis: e.target.value })
            }
            rows={3}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="treatment" className="text-sm font-medium text-ft">
            {t("form.treatment.label")}
          </label>
          <textarea
            id="treatment"
            className="w-full rounded-xl border border-secondary bg-bg p-3 text-ft placeholder:text-ft2/70 transition focus:border-main focus:outline-none focus:ring-2 focus:ring-main/30"
            value={formData.treatment}
            onChange={(e) =>
              setFormData({ ...formData, treatment: e.target.value })
            }
            rows={3}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="attachments" className="text-sm font-medium text-ft">
            {t("form.attachments.label")}
          </label>
          <input
            id="attachments"
            type="file"
            multiple
            onChange={(e) => {
              setSelectedFiles(e.target.files);
            }}
            className="w-full rounded-xl border border-secondary bg-bg p-2.5 text-sm text-ft2 file:me-2 file:rounded-lg file:border-0 file:bg-main file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-mainLight"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <p className="text-xs text-ft2">{t("form.attachments.helpText")}</p>
        </div>
        <div className="mt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-main px-5 py-2.5 text-sm font-semibold text-main transition hover:bg-secondary"
          >
            {t("form.buttons.cancel")}
          </button>
          <button
            type="submit"
            className="btn-primary px-6 py-2.5 text-sm"
          >
            {t("form.buttons.create")}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MedicalRecordModal;
