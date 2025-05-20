"use client";

import { useState } from "react";
import GenericTableRows from "../person-card/personCard"; 
import GenericUserModal from "../popup/pop"


type BannedUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: string;
  bannedDate: string;
  reason: string;
};

export default function BannedUsersPageClient({ bannedUsers }: { bannedUsers: BannedUser[] }) {
  const [selectedUser, setSelectedUser] = useState<null | BannedUser>(null);

  const handleEdit = (user: BannedUser) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const statusClass = (status: string) =>
    status === "محظور"
      ? "bg-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold"
      : "bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-xs font-semibold";

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">جدول المستخدمين المحظورين</h1>
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="min-w-full text-right">
          <thead>
            <tr className="text-gray-500 text-xs uppercase border-b">
              <th className="px-4 py-3">المستخدم</th>
              <th className="px-4 py-3">البريد الإلكتروني</th>
              <th className="px-4 py-3">سبب الحظر</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">تاريخ الحظر</th>
              <th className="px-4 py-3">تعديل</th>
            </tr>
          </thead>
          <tbody>
          <GenericTableRows
              data={bannedUsers}
              statusClass={statusClass}
              handleEdit={handleEdit}
              columns={[
                { key: "name", label: "المستخدم" },
                { key: "email", label: "البريد الإلكتروني" },
                { key: "reason", label: "سبب الحظر" },
                { key: "status", label: "الحالة" },
                { key: "bannedDate", label: "تاريخ الحظر" },
                { key: "edit", label: "تعديل" },
              ]}
            />          </tbody>
        </table>
      </div>

        {selectedUser && (
        <GenericUserModal
        avatar={selectedUser.avatar}
        name={selectedUser.name}
        subtitle={selectedUser.reason}
        title="تعديل المستخدم المحظور"
        headerColorFrom="red"
        headerColorTo="rose"
        primaryActionLabel="رفع الحظر"
        secondaryActionLabel="حذف الحساب"
        closeModal={closeModal}
      />
    )}    
</div>
  );
}