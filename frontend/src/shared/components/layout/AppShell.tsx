import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Sidebar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8 md:py-12 transition-all duration-300 ease-out">
        {children}
      </main>
    </div>
  );
}
