import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن - منصة صحتي",
  description: "منصة صحتي هي مبادرة رقمية تهدف إلى تسهيل الوصول إلى الرعاية الصحية في الجزائر من خلال الحجز والاستشارات الطبية أونلاين.",
  keywords: [
    "من نحن",
    "منصة صحتي",
    "فريق صحتي",
    "الرؤية الصحية",
    "الخدمات الصحية الرقمية",
    "الرعاية الصحية في الجزائر",
    "حول صحتي",
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
