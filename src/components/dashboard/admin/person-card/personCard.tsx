import { User } from "@/types/User";
import Image from "next/image";
import React from "react";
import StatusBadge, { type StatusVariant } from "@/ui/StatusBadge";

interface GenericTableRowsProps {
  data: User[];
  statusVariant: (status: boolean) => StatusVariant;
  handleEdit: (item: User) => void;
  columns: {
    key: keyof User | "edit";
    label: string;
    render?: (item: User) => React.ReactNode;
  }[];
}

function GenericTableRows({ data, statusVariant, handleEdit, columns }: GenericTableRowsProps) {
  return (
    <>
      {(data ?? []).map((item) => (
        <tr key={item._id} className="hover:bg-bg transition-colors">
          {columns.map(({ key, render }) => {
            if (key === "edit") {
              return (
                <td key="edit" className="px-4 py-4">
                  <button
                    className="rounded-lg border border-main px-3 py-1.5 text-xs font-semibold text-main transition-colors hover:bg-secondary"
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
                  <StatusBadge variant={statusVariant(value as boolean)}>
                    {value ? "متصل" : "غير متصل"}
                  </StatusBadge>
                </td>
              );
            }

            // Username and picture handling
            if (key === "username") {
              return (
                <td key={key} className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {item.picture ? (
                      <Image
                        src={item.picture}
                        alt={String(value)}
                        width={100}
                        height={100}
                        className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-secondary"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-main text-sm font-semibold text-white">
                        {String(value).charAt(0)}
                      </div>
                    )}
                    <span className="font-bold text-sm text-ft">{String(value)}</span>
                  </div>
                </td>
              );
            }

            return (
              <td key={key} className="px-4 py-4 text-sm text-ft2">
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
