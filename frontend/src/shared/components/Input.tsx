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
          className="app-input__label block text-sm font-semibold"
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          {...rest}
          className={cn(
            "app-input w-full px-3.5 py-2.5 text-sm rounded-xl",
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
