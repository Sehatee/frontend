"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";

const MAIN_HEX = "#0a5cd3";

const AdminStatsChart = ({
  data,
}: {
  data: {
    usersBlock: number;
    usersCount: number;
    doctorsCount: number;
    appointmentsCount: number;
  } | null;
}) => {
  const [xAxisFontSize, setXAxisFontSize] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      setXAxisFontSize(window.innerWidth < 640 ? 12 : 20);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const t = useTranslations("DashboardAdmin");
  return (
    <section className="bg-white rounded-2xl border border-secondary p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-ft">
          {t("charts")}
        </h2>
        <span className="eyebrow">{t("charts")}</span>
      </div>
      <div style={{ width: "100%", height: 350, direction: "rtl" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { name: "المستخدمون", value: data?.usersCount },
              { name: "الأطباء", value: data?.doctorsCount },
              { name: "المواعيد", value: data?.appointmentsCount },
              { name: "المحظورون", value: data?.usersBlock },
            ]}
            barCategoryGap={40}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6effc" />
            <XAxis
              dataKey="name"
              tick={{
                fontSize: xAxisFontSize,
                fontWeight: "bold",
                fill: "#667383",
                dy: 5,
              }}
              axisLine={{ stroke: "#9db2cc", strokeWidth: 3 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 18, fill: "#667383", dx: -36 }}
              axisLine={{ stroke: "#9db2cc", strokeWidth: 3 }}
              tickLine={false}
            />
            <Bar
              dataKey="value"
              fill={MAIN_HEX}
              radius={[12, 12, 0, 0]}
              barSize={70}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AdminStatsChart;
