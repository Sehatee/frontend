"use client";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useTranslations } from "next-intl";


const AdminStatsChart: React.FC = () => {
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
    <section className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{t("charts")}</h2>
      <div style={{ width: "100%", height: 350, direction: "rtl" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { name: "المستخدمون", value: 1400 },
              { name: "الأطباء", value: 900 },
              { name: "المواعيد", value: 1200 },
              { name: "المحظورون", value: 150 },
            ]}
            barCategoryGap={40}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: xAxisFontSize, fontWeight: "bold", fill: "#2F2F2F", dy: 5 }}
              axisLine={{ stroke: "#868686", strokeWidth: 3 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 18, fill: "#333", dx: -36 }}
              axisLine={{ stroke: "#868686", strokeWidth: 3 }}
              tickLine={false}
            />
            <Bar dataKey="value" fill="#156BF6" radius={[12, 12, 0, 0]} barSize={70} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AdminStatsChart;