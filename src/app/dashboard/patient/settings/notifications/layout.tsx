import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الإشعارات - منصة صحتي",
  description: "تابع آخر التنبيهات حول الاستشارات، المواعيد، والتحديثات الصحية الخاصة بك عبر منصة صحتي.",
  keywords: [
    "الإشعارات",
    "تنبيهات صحتي",
    "مواعيد الأطباء",
    "استشارات طبية",
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
