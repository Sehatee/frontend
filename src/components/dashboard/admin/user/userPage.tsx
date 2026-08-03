"use client";

import { useState } from "react";
import GenericTableRows from "../person-card/personCard";
import GenericUserModal from "../popup/pop";
import { User } from "@/types/User";
import CreateUserModal from "./CreateUserModal";
import { activeOrDeleteUser } from "@/lib/api/admin";
import Cookies from "js-cookie";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function UsersPageClient({
  users: initialUsers,
}: {
  users: User[];
}) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = Cookies.get("token");

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

  const handleUserUpdated = async (userId: string, active: boolean) => {
    try {
      await activeOrDeleteUser(userId, active, token || "");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, active: !active } : user
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating user:", error);
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
        <span>المستخدمين</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-ft">جدول المستخدمين</h2>
        <button
          onClick={handleCreateUser}
          className="btn-primary"
        >
          <UserPlus className="w-5 h-5" />
          <span>إضافة مستخدم</span>
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-secondary overflow-x-auto">
        <table className="min-w-full text-start">
          <thead>
            <tr className="bg-secondary text-ft text-xs uppercase tracking-wide">
              <th className="px-4 py-3">المستخدم</th>
              <th className="px-4 py-3">البريد الإلكتروني</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">تاريخ التسجيل</th>
              <th className="px-4 py-3">تعديل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary">
            <GenericTableRows
              data={users}
              statusVariant={statusVariant}
              handleEdit={handleEdit}
              columns={[
                { key: "username", label: "المستخدم" },
                { key: "email", label: "البريد الإلكتروني" },
                { key: "active", label: "الحالة" },
                {
                  key: "createdAt",
                  label: "تاريخ التسجيل",
                  render: (user) => {
                    if (!user.createdAt) return "-";
                    const date = new Date(user.createdAt);
                    return isNaN(date.getTime())
                      ? "-"
                      : date.toISOString().split("T")[0];
                  },
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
          primaryActionLabel=""
          secondaryActionLabel={!selectedUser.active ? "رفع الحظر" : "حظر"}
          onSecondaryAction={() =>
            handleUserUpdated(selectedUser._id, selectedUser.active)
          }
          closeModal={closeModal}
        />
      )}
      {isModalOpen && (
        <CreateUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
