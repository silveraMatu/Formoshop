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
    <Card className="rounded-3xl">
      <div className="mb-6 space-y-1 text-center">
        <h1 className="app-card__title text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="app-card__subtitle text-sm">{subtitle}</p>}
      </div>
      {children}
    </Card>
  );
}
