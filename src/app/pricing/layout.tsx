import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "التسعير - أسعار خدمات منصة صحتي",
  description: "اطلع على تفاصيل أسعار الاستشارات الطبية والحجز أونلاين عبر منصة صحتي، مع خطط مرنة تناسب احتياجاتك.",
  keywords: [
    "التسعيرة",
    "أسعار الخدمات",
    "تكلفة الاستشارة الطبية",
    "حجز طبي مدفوع",
    "اشتراك منصة صحتي",
    "خدمات طبية أونلاين",
    "الرعاية الصحية الرقمية",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
