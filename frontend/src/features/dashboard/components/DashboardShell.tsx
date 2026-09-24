import type { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <main className="dashboard-page">
      <div className="dashboard-frame">
        <DashboardSidebar />
        <section className="dashboard-content">{children}</section>
      </div>
    </main>
  );
}