import Footer from "@/components/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "خدماتنا - منصة صحتي للرعاية الصحية",
  description:
    "تعرّف على الخدمات التي تقدمها منصة صحتي، من حجز المواعيد الطبية، إلى الاستشارات عن بعد والتشخيص الأونلاين مع أفضل الأطباء.",
  keywords: [
    "خدمات صحتي",
    "خدمات طبية",
    "الاستشارة عن بعد",
    "تشخيص طبي أونلاين",
    "حجز مواعيد",
    "الرعاية الصحية في الجزائر",
    "الخدمات الصحية الرقمية",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
