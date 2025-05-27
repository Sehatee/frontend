"use client";
import { Appointment } from "@/types/Appointment";
import { Calendar, FileText, Trash, Plus, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState, useRef } from "react";
import MedicalRecordModal from "./MedicalRecordModal";
import Cookies from "js-cookie";
import { createMedicalRecord } from "@/lib/api/medicalRecord";
import { deleteAppointment } from "@/lib/api/appointment";

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const t = useTranslations("Appointment");
  const [showActions, setShowActions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreatingRecord, setIsCreatingRecord] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const token = Cookies.get("token");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
        className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 hover:shadow-md transition-shadow relative w-full"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex flex-col space-y-2 w-full sm:w-auto">
            <div>
              <h3 className="font-medium text-blue-600 text-sm sm:text-base">
                {t("patientName")}: {appointment.patientId.username}
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-textSecondary">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{appointment.date}</span>
              </div>

              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm break-all">
                  {appointment.notes}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
            <span
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-blue-50 text-blue-600 ${getStatusColor(
                appointment.status
              )}`}
            >
              {t(appointment.status.toLowerCase())}
            </span>

            {showActions && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-1 text-green-600 hover:text-green-800 transition-colors relative group"
                  title={t("actions.createMedicalRecord")}
                  disabled={isCreatingRecord}
                >
                  {isCreatingRecord ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {t("actions.createMedicalRecord")}
                  </span>
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-red-600 hover:text-red-800 transition-colors"
                  title={t("actions.deleteAppointment")}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
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

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium mb-4">
              {t("deleteConfirmation.title")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("deleteConfirmation.message")}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isDeleting}
              >
                {t("deleteConfirmation.cancel")}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                {t("deleteConfirmation.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentCard;
