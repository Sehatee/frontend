import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  endIcon?: LucideIcon;
  onEndIconClick?: () => void;
}

const Field = ({
  label,
  icon: Icon,
  error,
  endIcon: EndIcon,
  onEndIconClick,
  className,
  id,
  ...props
}: FieldProps) => {
  const padding =
    Icon && EndIcon
      ? "ps-10 pe-10"
      : Icon
        ? "ps-10 pe-4"
        : EndIcon
          ? "ps-4 pe-10"
          : "px-4";

  const inputClasses = [
    "w-full rounded-xl border bg-bg py-3 text-ft placeholder:text-ft2/70 focus:border-main focus:outline-none focus:ring-2 focus:ring-main/30 transition",
    padding,
    error ? "border-accent/60" : "border-secondary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ft">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2 text-main" />
        )}
        <input id={id} className={inputClasses} {...props} />
        {EndIcon && (
          <button
            type="button"
            onClick={onEndIconClick}
            aria-label={label ?? "toggle"}
            className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ft2 transition hover:text-main"
          >
            <EndIcon className="size-5" />
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-accent">{error}</p>}
    </div>
  );
};

export default Field;
