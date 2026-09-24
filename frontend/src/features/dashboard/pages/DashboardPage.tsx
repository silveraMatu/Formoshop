import { useCallback, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { AddItemModal } from "../components/AddItemModal";
import { DashboardShell } from "../components/DashboardShell";
import "../styles/dashboard.css";

export function DashboardPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const closeAddModal = useCallback(() => setIsAddModalOpen(false), []);

  return (
    <DashboardShell>
      <div className="dashboard-empty-state">
        <p>Gestioná tu catálogo</p>
        <Button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="dashboard-add-button"
        >
          <Plus size={18} strokeWidth={2.4} />
          Agregar
        </Button>
      </div>
      <AddItemModal open={isAddModalOpen} onClose={closeAddModal} />
    </DashboardShell>
  );
}