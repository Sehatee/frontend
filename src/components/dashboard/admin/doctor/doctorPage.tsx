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
  const statusClass = (status: boolean) =>
    status
      ? "bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold"
      : "bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-xs font-semibold";

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Link
          href={"/dashboard/admin"}
          className="hover:text-main transition duration-200"
        >
          لوحة التحكم
        </Link>
        <span className="text-gray-400">/</span>
        <span>الأطباء</span>
      </div>
      <h1 className="text-2xl font-bold mb-8 text-gray-800">جدول الأطباء</h1>
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="min-w-full text-right">
          <thead>
            <tr className="text-gray-500 text-xs uppercase border-b">
              <th className="px-4 py-3">الطبيب</th>
              <th className="px-4 py-3">البريد الإلكتروني</th>
              <th className="px-4 py-3">التخصص</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">تاريخ التوظيف</th>
              <th className="px-4 py-3">تعديل</th>
            </tr>
          </thead>
          <tbody>
            <GenericTableRows
              data={doctors}
              statusClass={statusClass}
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
          headerColorFrom="blue"
          headerColorTo="indigo"
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
