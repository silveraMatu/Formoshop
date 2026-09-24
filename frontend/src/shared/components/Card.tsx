import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-sm",
        "dark:border-neutral-800 dark:bg-neutral-950",
        className
      )}
    >
      {children}
    </div>
  );
}
