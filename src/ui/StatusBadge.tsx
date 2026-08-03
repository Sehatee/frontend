import type { ReactNode } from "react";

export type StatusVariant = "neutral" | "active" | "pending" | "completed" | "rejected";

export interface StatusBadgeProps {
  variant: StatusVariant;
  children: ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<StatusVariant, string> = {
  neutral: "bg-secondary text-main",
  active: "bg-main text-white",
  pending: "bg-cream text-accent",
  completed: "bg-secondary text-main",
  rejected: "bg-accent/15 text-accent",
};

const ACTIVE = new Set(["confirmed", "accepted", "active", "online", "متصل", "مؤكد", "مقبول", "نشط", "مؤكدة", "مقبولة"]);
const PENDING = new Set(["pending", "waiting", "في الانتظار", "قيد الانتظار", "بانتظار", "معلّق", "معلقة", "قيد المراجعة"]);
const COMPLETED = new Set(["completed", "done", "finished", "مكتمل", "منتهي", "منجز", "تمت", "تم", "منتهية", "مكتملة"]);
const REJECTED = new Set(["rejected", "banned", "cancelled", "canceled", "declined", "مرفوض", "محظور", "ملغي", "ملغية", "ملغى", "مرفوضة"]);

export function statusVariant(status: string): StatusVariant {
  const s = status.trim().toLowerCase();
  if (ACTIVE.has(s)) return "active";
  if (PENDING.has(s)) return "pending";
  if (COMPLETED.has(s)) return "completed";
  if (REJECTED.has(s)) return "rejected";
  return "neutral";
}

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${VARIANT_CLASSES[variant]} ${className ?? ""}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export default StatusBadge;
