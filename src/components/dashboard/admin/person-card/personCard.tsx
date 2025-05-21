import { User } from "@/types/User";
import Image from "next/image";
import React from "react";

interface GenericTableRowsProps {
  data: User[];
  statusClass: (status: boolean) => string;
  handleEdit: (item: User) => void;
  columns: {
    key: keyof User | "edit";
    label: string;
    render?: (item: User) => React.ReactNode;
  }[];
}

function GenericTableRows({ data, statusClass, handleEdit, columns }: GenericTableRowsProps) {
  return (
    <>
      {data.map((item) => (
        <tr key={item._id} className="hover:bg-gray-50 border-b last:border-none">
          {columns.map(({ key, render }) => {
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

            const value = item[key];

            // Status handling
            if (key === "active") {
              return (
                <td key={key} className="px-4 py-4">
                  <span className={statusClass(value as boolean)}>
                    {value ? "متصل" : "غير متصل"}
                  </span>
                </td>
              );
            }

            // Username and picture handling
            if (key === "username" && item.picture) {
              return (
                <td key={key} className="px-4 py-4 flex items-center gap-3">
                  <Image
                    src={item.picture}
                    alt={value as string}
                    width={100}
                    height={100}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="font-bold text-sm">{String(value)}</span>
                </td>
              );
            }

            return (
              <td key={key} className="px-4 py-4 text-sm text-gray-600">
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
