import type { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardShellProps {
  children: ReactNode;
  onAddClick?: () => void;
}

export function DashboardShell({ children, onAddClick }: DashboardShellProps) {
  return (
    <main className="dashboard-page">
      <div className="dashboard-frame">
        <DashboardSidebar onAddClick={onAddClick} />
        <section className="dashboard-content">{children}</section>
      </div>
    </main>
  );
}
