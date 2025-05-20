import React from "react";

interface GenericTableRowsProps<T> {
  data: T[];
  statusClass: (status: string) => string;
  handleEdit: (item: T) => void;
  columns: {
    key: keyof T | "edit";
    label: string;
    render?: (item: T) => React.ReactNode;
  }[];
}

function GenericTableRows<T>({ data, statusClass, handleEdit, columns }: GenericTableRowsProps<T>) {
  return (
    <>
      {data.map((item) => (
        <tr key={(item as any).id} className="hover:bg-gray-50 border-b last:border-none">
          {columns.map(({ key, render, label }) => {
            if (key === "edit") {
              return (
                <td key="edit" className="px-4 py-4">
                  <button
                    className="text-blue-500 hover:underline text-sm font-semibold"
                    onClick={() => handleEdit(item)}
                  >
                    تعديل
                  </button>
                </td>
              );
            }

            const value = item[key as keyof T];

            // تخصيص خاص للحالة (status)
            if (key === "status" && typeof value === "string") {
              return (
                <td key={key as string} className="px-4 py-4">
                  <span className={statusClass(value)}>
                    {value === "نشط" ? "متصل" : value === "محظور" ? "محظور" : "غير متصل"}
                  </span>
                </td>
              );
            }

            // خصائص صورة + اسم خاصة بالعمود الأول (مثلًا 'name' مع avatar)
            if (key === "name" && "avatar" in item) {
              return (
                <td key={key as string} className="px-4 py-4 flex items-center gap-3">
                  <img
                    src={(item as any).avatar}
                    alt={value as string}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="font-bold text-sm">{value}</span>
                </td>
              );
            }

            return (
              <td key={key as string} className="px-4 py-4 text-sm text-gray-600">
                {render ? render(item) : value as React.ReactNode}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

export default GenericTableRows;
