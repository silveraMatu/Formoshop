import type { ReactNode } from "react";
import { Card } from "@/shared/components/Card";

export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
      </div>
      {children}
    </Card>
  );
}
