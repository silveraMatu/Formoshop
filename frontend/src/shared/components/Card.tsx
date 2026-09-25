import type { ReactNode } from "react";
import { cn } from "../../lib/utils";


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
        "app-card w-full max-w-md p-8 rounded-3xl",
        "border border-white/60 dark:border-white/10",
        "shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]",
        className
      )}
    >
      {children}
    </div>
  );
}
