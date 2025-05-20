"use client";

import { useState } from "react";
import GenericTableRows from "../person-card/personCard"; 
import GenericUserModal from "../popup/pop"

type Doctor = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: string;
  employed: string;
  specialty: string;
};

export default function DoctorsPageClient({ doctors }: { doctors: Doctor[] }) {
  const [selectedDoctor, setSelectedDoctor] = useState<null | Doctor>(null);

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
  };

  const statusClass = (status: string) =>
    status === "نشط"
      ? "bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold"
      : "bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-xs font-semibold";

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
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
              { key: "name", label: "الطبيب" },
              { key: "email", label: "البريد الإلكتروني" },
              { key: "specialty", label: "التخصص" },
              { key: "status", label: "الحالة" },
              { key: "employed", label: "تاريخ التوظيف" },
              { key: "edit", label: "تعديل" },
            ]}
          />
          </tbody>
        </table>
      </div>

      {selectedDoctor && (
        <GenericUserModal
          avatar={selectedDoctor.avatar.replace("/avatars/", "/imgs/doctorsteam/")}
          name={selectedDoctor.name}
          subtitle={selectedDoctor.specialty}
          title="تعديل الطبيب"
          headerColorFrom="blue"
          headerColorTo="indigo"
          primaryActionLabel="حظر الحساب"
          secondaryActionLabel="حذف الحساب"
          closeModal={closeModal}
        />
      )}    
      </div>
  );
}