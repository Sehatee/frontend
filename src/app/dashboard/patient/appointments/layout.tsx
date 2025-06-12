import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المواعيد - منصة صحتي",
  description: "استعرض مواعيدك الطبية القادمة والسابقة، وتابع تفاصيل حجوزاتك بسهولة على منصة صحتي.",
  keywords: [
    "المواعيد",
    "الحجوزات الطبية",
    "جدول المواعيد",
    "متابعة المواعيد",
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
