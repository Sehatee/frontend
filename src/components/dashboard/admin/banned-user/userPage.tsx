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

  const statusVariant = (active: boolean) =>
    active ? "neutral" : "rejected";

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
        <span>المحظورون</span>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-ft">
        جدول المستخدمين المحظورين
      </h2>
      <div className="bg-white rounded-2xl border border-secondary overflow-x-auto">
        <table className="min-w-full text-start">
          <thead>
            <tr className="bg-secondary text-ft text-xs uppercase tracking-wide">
              <th className="px-4 py-3">المستخدم</th>
              <th className="px-4 py-3">البريد الإلكتروني</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">تعديل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary">
            <GenericTableRows
              data={bannedUsers}
              statusVariant={statusVariant}
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
