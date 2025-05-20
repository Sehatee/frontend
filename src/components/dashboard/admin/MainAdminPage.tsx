import React from "react";
import AdminStatsChart from "./chart/page";
import Card from "./card/page";
import { getTranslations } from "next-intl/server";
import { User } from "@/types/User";
import { getAllUsers } from "@/lib/api/admin";
import { cookies } from "next/headers";

const MainAdminPage = async () => {
  const t = await getTranslations("DashboardAdmin");
  const token = (await cookies()).get("token")?.value;
  const data = await getAllUsers(token || "");
  const allUsers = data.resalut;
  const activeUsers = data.users.filter(
    (user: User) => user.appointments?.length || -1 > 0
  ).length;

  const blockUsers = data.users.filter(
    (user: User) => user.active === false
  ).length;
  const doctors = data.users.filter(
    (user: User) => user.role === "doctor"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t("title")}</h1>
        <p className="text-gray-600">{t("welcome")}</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card
          title="عدد المستخدمين"
          value={allUsers}
          href="/dashboard/admin/users"
        />
        <Card
          title="عدد الأطباء"
          value={doctors}
          href="/dashboard/admin/doctors"
        />
        <Card
          title="حساب نشط"
          value={activeUsers}
          href="/dashboard/admin/appointments"
        />
        <Card
          title="المستخدمون المحظورون"
          value={blockUsers}
          href="/dashboard/admin/banned-users"
        />
      </section>

      <AdminStatsChart />
    </div>
  );
};

export default MainAdminPage;
