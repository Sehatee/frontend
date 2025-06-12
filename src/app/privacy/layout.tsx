import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية والأمان - منصة صحتي",
  description: "نلتزم في منصة صحتي بحماية خصوصيتك وتأمين بياناتك الطبية والشخصية وفق أعلى معايير الأمان والسرية.",
  keywords: [
    "سياسة الخصوصية والامان",
    "الأمان وحماية البيانات",
    "الخصوصية الطبية",
    "معلومات شخصية طبية",
    "استشارات طبية آمنة",
    "حماية المعلومات الصحية",
    "جمع البيانات أخصائي",
    "ملفات تعريف الارتباط",
    "حقوق المستخدمين في الخصوصية",
    "تشفير البيانات الصحية",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return(
    <div>
      {children}
      <Footer />
    </div>
  );
}
