import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "حسابي - منصة صحتي",
  description: "إدارة بيانات حسابك، تغيير كلمة المرور، وتحديث إعدادات الخصوصية بسهولة عبر منصة صحتي.",
  keywords: [
    "حسابي",
    "إعدادات الحساب",
    "تعديل الحساب",
    "الملف الشخصي",
    "منصة صحتي"
  ],
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {children}
    </div>
  );
}
