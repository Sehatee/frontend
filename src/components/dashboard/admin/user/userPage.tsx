"use client";

import { useState } from "react";
import GenericTableRows from "../person-card/personCard"; 
import GenericUserModal from "../popup/pop"

type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: string;
  employed: string;
};

export default function UsersPageClient({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const statusClass = (status: string) =>
    status === "نشط"
      ? "bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold"
      : "bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-xs font-semibold";

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">جدول المستخدمين</h1>
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="min-w-full text-right">
          <thead>
            <tr className="text-gray-500 text-xs uppercase border-b">
              <th className="px-4 py-3">المستخدم</th>
              <th className="px-4 py-3">البريد الإلكتروني</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">تاريخ التسجيل</th>
              <th className="px-4 py-3">تعديل</th>
            </tr>
          </thead>
          <tbody>
          <GenericTableRows
            data={users}
            statusClass={statusClass}
            handleEdit={handleEdit}
            columns={[
              { key: "name", label: "المستخدم" },
              { key: "email", label: "البريد الإلكتروني" },
              { key: "status", label: "الحالة" },
              { key: "employed", label: "تاريخ التسجيل" },
              { key: "edit", label: "تعديل" },
            ]}
          />

          </tbody>
        </table>
      </div>

      {selectedUser && (
       <GenericUserModal
        avatar={selectedUser.avatar}
        name={selectedUser.name}
        subtitle={selectedUser.email}
        title="تعديل المستخدم"
        headerColorFrom="blue"
        headerColorTo="cyan"
        primaryActionLabel="تعديل المعلومات"
        secondaryActionLabel="حذف الحساب"
        closeModal={closeModal}
      />
      )}

    </div>
  );
}