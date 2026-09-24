import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          {...rest}
          className={cn(
            "w-full rounded-md border bg-white px-3 py-2 text-sm",
            "border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white",
            "placeholder:text-neutral-400",
            "focus:outline-none focus:ring-2 focus:ring-neutral-400",
            error && "border-red-500 focus:ring-red-400",
            className
          )}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
