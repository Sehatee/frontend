
import React from "react";
import AdminStatsChart from "./chart/page";
import Card from "./card/page";
import { useTranslations } from "next-intl";

const MainAdminPage = () => {
  const t = useTranslations("DashboardAdmin");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t("title")}</h1>
        <p className="text-gray-600">{t("welcome")}</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="عدد المستخدمين" value="1200" href="/dashboard/admin/users" />
        <Card title="عدد الأطباء" value="350" href="/dashboard/admin/doctors" />
        <Card title="عدد المواعيد" value="1800" href="/dashboard/admin/appointments" />
        <Card title="المستخدمون المحظورون" value="12" href="/dashboard/admin/banned-users" />
      </section>

      <AdminStatsChart />
    </div>
  );
};



export default MainAdminPage;