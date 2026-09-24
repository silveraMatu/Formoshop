import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import type { CreateProductInput, ProductStatus } from "../types/product";

interface ProductFormProps {
  onClose: () => void;
  onSubmit: (input: CreateProductInput) => Promise<void>;
}

const initialForm = {
  title: "",
  price: "",
  category: "",
  status: "Disponible" as ProductStatus,
  stock: "",
  ubicacion: "",
  image: "",
  description: "",
  tag: "",
};

export function ProductForm({ onClose, onSubmit }: ProductFormProps) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const categories = form.category
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isInteger(value) && value > 0);
    const tags = form.tag
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (!form.title.trim() || !form.price || !form.stock || !form.ubicacion.trim() || categories.length === 0) {
      setError("Completá título, precio, categoría, stock y ubicación.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        price: Number(form.price),
        category: categories,
        status: form.status,
        stock: Number(form.stock),
        ubicacion: form.ubicacion.trim(),
        ...(form.image.trim() ? { image: form.image.trim() } : {}),
        ...(form.description.trim() ? { description: form.description.trim() } : {}),
        ...(tags.length ? { tag: tags } : {}),
      });
      onClose();
    } catch (submitError) {
      setError((submitError as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-modal-backdrop" role="presentation">
      <section className="dashboard-modal dashboard-product-form" role="dialog" aria-modal="true" aria-labelledby="product-form-title">
        <div className="dashboard-modal__header">
          <div>
            <p className="dashboard-modal__eyebrow">Nuevo producto</p>
            <h2 id="product-form-title">Completa los datos</h2>
          </div>
          <button type="button" aria-label="Cerrar formulario" onClick={onClose} className="dashboard-modal__close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="dashboard-product-form__fields">
          <label>Título<input required value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder="Teclado mecánico RGB" /></label>
          <div className="dashboard-product-form__row">
            <label>Precio<input required min="0" step="0.01" type="number" value={form.price} onChange={(event) => updateField("price", event.target.value)} placeholder="120.50" /></label>
            <label>Stock<input required min="0" step="1" type="number" value={form.stock} onChange={(event) => updateField("stock", event.target.value)} placeholder="15" /></label>
          </div>
          <div className="dashboard-product-form__row">
            <label>Categorías<input required value={form.category} onChange={(event) => updateField("category", event.target.value)} placeholder="1, 3" /></label>
            <label>Estado<select value={form.status} onChange={(event) => updateField("status", event.target.value)}><option value="Disponible">Disponible</option><option value="Agotado">Agotado</option></select></label>
          </div>
          <label>Ubicación<input required value={form.ubicacion} onChange={(event) => updateField("ubicacion", event.target.value)} placeholder="Depósito Central" /></label>
          <label>Imagen (URL)<input type="url" value={form.image} onChange={(event) => updateField("image", event.target.value)} placeholder="https://example.com/producto.jpg" /></label>
          <label>Descripción<textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} placeholder="Detalle del producto" rows={3} /></label>
          <label>Etiquetas<input value={form.tag} onChange={(event) => updateField("tag", event.target.value)} placeholder="periféricos, gaming" /></label>
          {error && <p className="dashboard-product-form__error">{error}</p>}
          <button type="submit" className="dashboard-product-form__submit" disabled={saving}>{saving ? "Guardando..." : "Crear producto"}</button>
        </form>
      </section>
    </div>
  );
}
