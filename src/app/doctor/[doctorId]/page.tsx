import Doctor from "@/components/doctor/Doctor";
import { User } from "@/types/User";
import React from "react";

interface Props {
  params: Promise<{ doctorId: string }>;
}

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

  // في حال عدم وجود رابط الـ API أثناء الـ Build، تتجاوز الدالة عملية الـ Pre-rendering
  if (!apiUrl) {
    console.warn(
      "API_URL is missing during build time. Skipping static generation.",
    );
    return [];
  }

  try {
    const res = await fetch(`${apiUrl}/doctors`, {
      // إمكانية إعادة التحقق أو تحديد المهلة
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(
        `Failed to fetch doctors for static params. Status: ${res.status}`,
      );
      return [];
    }

    const data = await res.json();
    const doctors: User[] = data?.doctors || [];

    return doctors.map((doctor: User) => ({
      doctorId: doctor._id,
    }));
  } catch (error) {
    console.error("Error fetching static params for doctors:", error);
    // إرجاع مصفوفة فارغة يضمن نجاح الـ Build واعتماد On-demand Dynamic Rendering للصفحات عند طلبها
    return [];
  }
}

const page = async ({ params }: Props) => {
  const doctorId = (await params).doctorId;

  return (
    <div>
      <Doctor doctorId={doctorId} />
    </div>
  );
};

export default page;
