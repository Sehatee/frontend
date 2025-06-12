import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "السجلات الطبية - منصة صحتي",
  description: "عرض وإدارة السجلات الطبية للمراجعين بكل سهولة، بما في ذلك التشخيصات، الوصفات، والتقارير الطبية.",
  keywords: [
    "سجلات المرضى",
    "السجلات الطبية",
    "تاريخ المريض",
    "التقارير الطبية",
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
