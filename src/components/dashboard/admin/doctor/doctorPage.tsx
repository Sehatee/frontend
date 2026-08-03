"use client";

import { useState } from "react";
import GenericTableRows from "../person-card/personCard";
import GenericUserModal from "../popup/pop";
import { User } from "@/types/User";
import Cookies from "js-cookie";
import { activeOrDeleteUser } from "@/lib/api/admin";
import Link from "next/link";

export default function DoctorsPageClient({
  doctors: initialDoctors,
}: {
  doctors: User[];
}) {
  const [doctors, setDoctors] = useState<User[]>(initialDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<null | User>(null);
  const token = Cookies.get("token");

  const handleEdit = (doctor: User) => {
    setSelectedDoctor(doctor);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
  };

  const handleUserUpdated = async (doctorId: string, active: boolean) => {
    try {
      await activeOrDeleteUser(doctorId, active, token || "");
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === doctorId ? { ...doctor, active: !active } : doctor
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };
  const statusVariant = (active: boolean) =>
    active ? "active" : "neutral";

  return (
    <div className="min-h-screen bg-bg p-6" dir="rtl">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-sm text-ft2 mb-4">
        <Link
          href={"/dashboard/admin"}
          className="hover:text-main transition duration-200"
        >
          لوحة التحكم
        </Link>
        <span className="text-ft2/60">/</span>
        <span>الأطباء</span>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-ft">جدول الأطباء</h2>
      <div className="bg-white rounded-2xl border border-secondary overflow-x-auto">
        <table className="min-w-full text-start">
          <thead>
            <tr className="bg-secondary text-ft text-xs uppercase tracking-wide">
              <th className="px-4 py-3">الطبيب</th>
              <th className="px-4 py-3">البريد الإلكتروني</th>
              <th className="px-4 py-3">التخصص</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">تاريخ التوظيف</th>
              <th className="px-4 py-3">تعديل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary">
            <GenericTableRows
              data={doctors}
              statusVariant={statusVariant}
              handleEdit={handleEdit}
              columns={[
                { key: "username", label: "الطبيب" },
                { key: "email", label: "البريد الإلكتروني" },
                { key: "specialization", label: "التخصص" },
                { key: "active", label: "الحالة" },
                { key: "createdAt", label: "تاريخ التوظيف" },
                { key: "edit", label: "تعديل" },
              ]}
            />
          </tbody>
        </table>
      </div>

      {selectedDoctor && (
        <GenericUserModal
          picture={selectedDoctor.picture || ""}
          username={selectedDoctor.username}
          subtitle={selectedDoctor.specialization}
          title="تعديل الطبيب"
          secondaryActionLabel="حذف الحساب"
          primaryActionLabel=""
          onSecondaryAction={() =>
            handleUserUpdated(selectedDoctor._id, selectedDoctor.active)
          }
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
