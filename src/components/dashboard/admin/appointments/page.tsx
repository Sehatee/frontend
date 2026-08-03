// app/appointments/page.tsx أو أي مسار تريده

import { getAnalysis } from "@/lib/api/admin";
import { Appointment } from "@/types/Appointment";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { StatusBadge, statusVariant } from "@/ui/StatusBadge";

export default async function AppointmentsPage() {
  const token = (await cookies()).get("token")?.value;
  const data = await getAnalysis(token || "");
  const appointments: Appointment[] = data?.appointments.appointments;
  return (
    <div className="min-h-screen bg-bg p-6" dir="rtl">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-sm text-ft2 mb-4">
        <Link
          href={"/dashboard/admin"}
          className="hover:text-main transition duration-200"
        >
          لوحة التحكم
        </Link>
        <span className="text-ft2/60">/</span>
        <span>المواعيد</span>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-ft">جدول المواعيد</h2>
      <div className="bg-white rounded-2xl border border-secondary overflow-x-auto">
        {!appointments || appointments.length === 0 ? (
          <p className="p-6 text-ft2">لا توجد مواعيد مسجلة.</p>
        ) : (
          <table className="min-w-full text-start">
            <thead>
              <tr className="bg-secondary text-ft text-xs uppercase tracking-wide">
                <th className="px-4 py-3">المريض</th>
                <th className="px-4 py-3">الطبيب</th>
                <th className="px-4 py-3">التاريخ</th>

                <th className="px-4 py-3">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="hover:bg-bg transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-ft">
                    {appointment.patientId.username}
                  </td>
                  <td className="px-4 py-4 text-sm text-ft2">
                    {appointment.doctorId.username}
                  </td>
                  <td className="px-4 py-4 text-sm text-ft2">
                    {appointment.date.split("T")[0]}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <StatusBadge variant={statusVariant(appointment.status)}>
                      {appointment.status}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
