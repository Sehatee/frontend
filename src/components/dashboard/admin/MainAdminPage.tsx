import React from "react";
import AdminStatsChart from "./chart/page";
import Card from "./card/page";
import { getTranslations } from "next-intl/server";
import { getAnalysis } from "@/lib/api/admin";
import { cookies } from "next/headers";

const MainAdminPage = async () => {
  const t = await getTranslations("DashboardAdmin");
  const token = (await cookies()).get("token")?.value;
  const data = await getAnalysis(token || "");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t("title")}</h1>
        <p className="text-gray-600">{t("welcome")}</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card
          title="عدد المستخدمين"
          value={data?.users.resalut}
          href="/dashboard/admin/users"
        />

        <Card
          title="المستخدمون المحظورون"
          value={data?.usersBlock.length}
          href="/dashboard/admin/banned-users"
        />
        <Card
          title="عدد الأطباء"
          value={data?.doctors.resalut}
          href="/dashboard/admin/doctors"
        />
        <Card
          title="عدد المواعيد الكلي"
          value={data?.appointments.total}
          href="/dashboard/admin/appointments"
        />
      </section>

      <AdminStatsChart
        data={{
          doctorsCount: data?.doctors.resalut,
          usersBlock: data?.usersBlock.length,
          usersCount: data?.users.resalut,
          appointmentsCount: data?.appointments.total,
        }}
      />
    </div>
  );
};

export default MainAdminPage;
