import Footer from "@/components/Footer";
import { fetchUser } from "@/lib/fetchUser";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "الأطباء - اختر الطبيب المناسب",
  description:
    "تصفح قائمة الأطباء حسب التخصص والولاية وابحث عن الطبيب المناسب لحالتك الصحية عبر منصة صحتي.",
  keywords: [
    "أطباء الجزائر",
    "البحث عن طبيب",
    "اختيار طبيب",
    "أطباء حسب التخصص",
    "حجز مع طبيب",
    "أطباء صحتي",
    "طبيب عام",
    "طبيب أطفال",
    "طبيب قلب",
  ],
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await fetchUser();
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
