// app/appointments/page.tsx أو أي مسار تريده

import { getAnalysis } from "@/lib/api/admin";
import { Appointment } from "@/types/Appointment";
import { cookies } from "next/headers";
import React from "react";

const statusClass = (status: string) =>
  status === "تمت"
    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold"
    : "bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold";

export default async function AppointmentsPage() {
  const token = (await cookies()).get("token")?.value;
  const data = await getAnalysis(token || "");
  const appointments: Appointment[] = data?.appointments.appointments;
  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">جدول المواعيد</h1>
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        {appointments.length === 0 ? (
          <p>لا توجد مواعيد مسجلة.</p>
        ) : (
          <table className="min-w-full text-right">
            <thead>
              <tr className="text-gray-500 text-xs uppercase border-b">
                <th className="px-4 py-3">المريض</th>
                <th className="px-4 py-3">الطبيب</th>
                <th className="px-4 py-3">التاريخ</th>

                <th className="px-4 py-3">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="hover:bg-gray-50 border-b last:border-none"
                >
                  <td className="px-4 py-4 text-sm font-semibold">
                    {appointment.patientId.username}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {appointment.doctorId.username}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {appointment.date.split("T")[0]}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={statusClass(appointment.status)}>
                      {appointment.status}
                    </span>
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
