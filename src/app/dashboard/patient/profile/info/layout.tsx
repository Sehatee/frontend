import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الملف الشخصي - منصة صحتي",
  description: "عرض وتحديث معلوماتك الشخصية مثل الاسم، البريد الإلكتروني، وتاريخ الميلاد بسهولة عبر منصة صحتي.",
  keywords: [
    "الملف الشخصي",
    "معلومات المستخدم",
    "تحديث البيانات الشخصية",
    "منصة صحتي",
    "تعديل الملف الشخصي"
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
