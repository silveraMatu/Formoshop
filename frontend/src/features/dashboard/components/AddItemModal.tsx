import { useEffect } from "react";
import { Package, Wrench, X } from "lucide-react";

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: "product" | "service") => void;
}

export function AddItemModal({ open, onClose, onSelect }: AddItemModalProps) {
  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="dashboard-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-modal-title"
        className="dashboard-modal"
      >
        <div className="dashboard-modal__header">
          <div>
            <p className="dashboard-modal__eyebrow">Nuevo elemento</p>
            <h2 id="add-modal-title">¿Qué quieres agregar?</h2>
          </div>
          <button
            type="button"
            aria-label="Cerrar modal"
            onClick={onClose}
            className="dashboard-modal__close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="dashboard-modal__options">
          <button type="button" className="dashboard-item-option" onClick={() => onSelect("product")}>
            <Package size={30} strokeWidth={1.7} />
            <span>Producto</span>
            <small>Algo que vendes</small>
          </button>
          <button type="button" className="dashboard-item-option dashboard-item-option--unavailable" onClick={() => onSelect("service")}>
            <Wrench size={30} strokeWidth={1.7} />
            <span>Servicio</span>
            <small>Próximamente</small>
          </button>
        </div>
      </section>
    </div>
  );
}