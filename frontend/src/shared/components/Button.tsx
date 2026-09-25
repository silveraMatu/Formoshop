import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({ loading, className, children, disabled, ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cn(
        "app-button inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl",
        "active:scale-[0.98] transition-all duration-150",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
        className
      )}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
