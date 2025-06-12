import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام - منصة صحتي",
  description: "اقرأ الشروط والأحكام التي تحكم استخدام منصة صحتي لضمان تجربة آمنة وواضحة لجميع المستخدمين.",
  keywords: [
    "الشروط والأحكام",
    "قوانين استخدام الموقع",
    "حقوق المستخدمين",
    "التزامات المستخدم",
    "سياسة المنصة",
    "الشروط القانونية صحتي",
    "شروط استخدام الموقع",
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
