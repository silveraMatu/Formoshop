import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex font-sans antialiased text-neutral-900 dark:text-neutral-50 selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:text-indigo-100">
      <Sidebar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8 md:py-12 transition-all duration-300 ease-out">
        {children}
      </main>
    </div>
  );
}
