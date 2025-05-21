"use client";

import { useState } from "react";
import GenericTableRows from "../person-card/personCard";
import GenericUserModal from "../popup/pop";
import { User } from "@/types/User";
import CreateUserModal from "./CreateUserModal";

export default function UsersPageClient({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleCreateUser = () => {
    setIsModalOpen(true);
  };
  
  const statusClass = (status: boolean) =>
    status
      ? "bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold"
      : "bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-xs font-semibold";

  return (
    <div className=" min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">جدول المستخدمين</h1>
        <button
          onClick={handleCreateUser}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <span>إضافة مستخدم جديد</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
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
                { key: "username", label: "المستخدم" },
                { key: "email", label: "البريد الإلكتروني" },
                { key: "active", label: "الحالة" },
                {
                  key: "createdAt",
                  label: "تاريخ التسجيل",
                  render: (user) =>
                    new Date(user.createdAt).toISOString().split("T")[0],
                },
                { key: "edit", label: "تعديل" },
              ]}
            />
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <GenericUserModal
          picture={selectedUser.picture || ""}
          username={selectedUser.username}
          subtitle={selectedUser.email}
          title="تعديل المستخدم"
          headerColorFrom="blue"
          headerColorTo="cyan"
          primaryActionLabel="تعديل المعلومات"
          secondaryActionLabel="حذف الحساب"
          closeModal={closeModal}
        />
      )}

      {isModalOpen && (
        <CreateUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => {}}
        />
      )}
    </div>
  );
}
