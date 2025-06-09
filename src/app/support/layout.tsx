import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدعم الفني - منصة صحتي",
  description: "تواصل مع فريق الدعم الفني لمنصة صحتي للحصول على المساعدة وحل أي مشكلة تواجهك أثناء استخدام الموقع.",
  keywords: [
    "الدعم الفني",
    "مساعدة المستخدم",
    "دعم تقني",
    "حل مشاكل الموقع",
    "خدمة العملاء صحتي",
    "مركز المساعدة",
    "الدعم عبر الإنترنت",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return( 
  <>
  {children}
  <Footer />
  </>
  )
}
