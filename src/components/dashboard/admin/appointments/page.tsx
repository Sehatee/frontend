// app/appointments/page.tsx أو أي مسار تريده

import React from "react";

// نموذج بيانات الموعد
type Appointment = {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
};

// دالة وهمية لجلب المواعيد (استبدلها لاحقًا بربط API حقيقي أو قاعدة بيانات)
const fetchAppointments = async (): Promise<Appointment[]> => {
  return [
    {
      id: "1",
      patientName: "محمد علي",
      doctorName: "د. أحمد يوسف",
      date: "2024-05-01",
      time: "10:00 صباحًا",
      status: "تمت",
    },
    {
      id: "2",
      patientName: "سارة محمد",
      doctorName: "د. ليلى حسن",
      date: "2024-05-02",
      time: "12:30 مساءً",
      status: "تمت",
    },
    {
      id: "3",
      patientName: "خالد إبراهيم",
      doctorName: "د. أحمد يوسف",
      date: "2024-05-03",
      time: "09:00 صباحًا",
      status: "تمت",
    },
  ];
};

const statusClass = (status: string) =>
  status === "تمت"
    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold"
    : "bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold";

export default async function AppointmentsPage() {
  const appointments = await fetchAppointments(); // جلب البيانات من السيرفر مباشرة

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
                <th className="px-4 py-3">الوقت</th>
                <th className="px-4 py-3">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 border-b last:border-none">
                  <td className="px-4 py-4 text-sm font-semibold">{appointment.patientName}</td>
                  <td className="px-4 py-4 text-sm">{appointment.doctorName}</td>
                  <td className="px-4 py-4 text-sm">{appointment.date}</td>
                  <td className="px-4 py-4 text-sm">{appointment.time}</td>
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
