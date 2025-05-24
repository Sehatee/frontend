"use client";

import { useState } from "react";
import GenericTableRows from "../person-card/personCard";
import GenericUserModal from "../popup/pop";
import { User } from "@/types/User";
import { activeOrDeleteUser } from "@/lib/api/admin";
import Cookies from "js-cookie";
import Link from "next/link";

export default function BannedUsersPageClient({
  bannedUsers: initialBannedUsers,
}: {
  bannedUsers: User[];
}) {
  const [bannedUsers, setBannedUsers] = useState<User[]>(initialBannedUsers);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  const token = Cookies.get("token");

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleUserUpdated = async (userId: string, active: boolean) => {
    try {
      await activeOrDeleteUser(userId, active, token || "");
      setBannedUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
      closeModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const statusClass = (active: boolean) =>
    !active
      ? "bg-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold"
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
        <span>المحظورون</span>
      </div>
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        جدول المستخدمين المحظورين
      </h1>
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="min-w-full text-right">
          <thead>
            <tr className="text-gray-500 text-xs uppercase border-b">
              <th className="px-4 py-3">المستخدم</th>
              <th className="px-4 py-3">البريد الإلكتروني</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">تعديل</th>
            </tr>
          </thead>
          <tbody>
            <GenericTableRows
              data={bannedUsers}
              statusClass={statusClass}
              handleEdit={handleEdit}
              columns={[
                { key: "username", label: "المستخدم" },
                { key: "email", label: "البريد الإلكتروني" },
                { key: "active", label: "الحالة" },
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
          subtitle={selectedUser.description}
          title="تعديل المستخدم المحظور"
          headerColorFrom="red"
          headerColorTo="rose"
          primaryActionLabel="رفع الحظر"
          secondaryActionLabel=""
          onPrimaryAction={() =>
            handleUserUpdated(selectedUser._id, selectedUser.active)
          }
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
