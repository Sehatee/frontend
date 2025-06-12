import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المعلومات الطبية - منصة صحتي",
  description: "استعرض وسجّل معلوماتك الطبية مثل الحالات الصحية، الأدوية، والتحاليل بكل سهولة وأمان عبر منصة صحتي.",
  keywords: [
    "المعلومات الطبية",
    "السجل الطبي",
    "منصة صحتي",
    "حالات صحية",
    "الأدوية",
    "التحاليل الطبية",
    "تاريخ طبي"
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
