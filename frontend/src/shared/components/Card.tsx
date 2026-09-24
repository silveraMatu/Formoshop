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
        "app-card w-full max-w-md p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
