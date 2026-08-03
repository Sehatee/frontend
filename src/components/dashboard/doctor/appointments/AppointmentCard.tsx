"use client";
import { Appointment } from "@/types/Appointment";
import { Calendar, FileText, Plus, Trash2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState, useRef } from "react";
import MedicalRecordModal from "./MedicalRecordModal";
import Cookies from "js-cookie";
import { createMedicalRecord } from "@/lib/api/medicalRecord";
import { deleteAppointment } from "@/lib/api/appointment";
import StatusBadge, { statusVariant } from "@/ui/StatusBadge";
import Modal from "@/ui/Modal";
import Image from "next/image";

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const t = useTranslations("Appointment");
  const [showActions, setShowActions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreatingRecord, setIsCreatingRecord] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const token = Cookies.get("token");

  const statusKey = appointment.status.toLowerCase();
  const statusLabel =
    t(statusKey) === statusKey ? appointment.status : t(statusKey);

  const patient = appointment.patientId;
  const initials = (patient.username ?? "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  const handleCreateMedicalRecord = async (data: FormData) => {
    setIsCreatingRecord(true);
    try {
      await createMedicalRecord(data, token || "");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating medical record:", error);
    } finally {
      setIsCreatingRecord(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAppointment(appointment._id, token || "");
      setShowDeleteModal(false);

      if (cardRef.current) {
        cardRef.current.style.transition = "all 0.3s ease-out";
        cardRef.current.style.opacity = "0";
        cardRef.current.style.transform = "translateX(-20px)";

        setTimeout(() => {
          if (cardRef.current?.parentElement) {
            cardRef.current.parentElement.remove();
          }
        }, 300);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        key={appointment._id}
        className="relative w-full rounded-2xl border border-secondary bg-white p-6 transition-shadow hover:shadow-md"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-main text-white">
              {patient.picture ? (
                <Image
                  src={patient.picture}
                  alt={patient.username}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <span className="text-lg font-bold">{initials || "P"}</span>
              )}
            </span>

            <div className="min-w-0">
              <h3 className="truncate font-semibold text-ft">
                <span className="text-ft2">{t("patientName")}:</span>{" "}
                {patient.username}
              </h3>

              <div className="mt-1.5 flex flex-col gap-1.5 text-ft2 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-1.5 text-sm">
                  <Calendar className="h-4 w-4 flex-shrink-0 text-main" />
                  <span>{appointment.date}</span>
                </div>

                {appointment.notes && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <FileText className="h-4 w-4 flex-shrink-0 text-main" />
                    <span className="break-all">{appointment.notes}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <StatusBadge variant={statusVariant(appointment.status)}>
              {statusLabel}
            </StatusBadge>

            {showActions && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  title={t("actions.createMedicalRecord")}
                  disabled={isCreatingRecord}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-main px-4 py-2 text-sm font-semibold text-white transition hover:bg-mainLight hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCreatingRecord ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  {t("actions.createMedicalRecord")}
                </button>
                <button
                  onClick={handleDelete}
                  title={t("actions.deleteAppointment")}
                  disabled={isDeleting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  {t("actions.deleteAppointment")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MedicalRecordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={appointment}
        onSubmit={handleCreateMedicalRecord}
      />

      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={t("deleteConfirmation.title")}
      >
        <p className="text-ft2">{t("deleteConfirmation.message")}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="text-sm font-medium text-ft2 transition-colors hover:text-ft"
            disabled={isDeleting}
          >
            {t("deleteConfirmation.cancel")}
          </button>
          <button
            onClick={confirmDelete}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("deleteConfirmation.confirm")}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AppointmentCard;
