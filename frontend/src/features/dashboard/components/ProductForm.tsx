import { useState, type FormEvent } from "react";
import { X, Wand2, Loader2 } from "lucide-react"; 
import type { CreateProductInput, ProductStatus } from "../types/product";
import { generateProductMetadata } from "../api/products";
import { LocationPickerMap, type LocationValue } from "@/shared/components/LocationPickerMap";
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
  const [isLoadingIA, setIsLoadingIA] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationValue | null>(null);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  // --- logica de la ia ---
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoadingIA(true);
    setError(null);

    try {
      const base64 = await toBase64(file);
      const cleanBase64 = (base64 as string).split(',')[1];
      const aiData = await generateProductMetadata(cleanBase64);

      setForm((current) => ({
        ...current,
        title: aiData.tituloSugerido || current.title,
        description: aiData.descripcionSugerida || current.description,
        price: aiData.precioEstimado ? aiData.precioEstimado.toString() : current.price,
        tag: aiData.etiquetas ? aiData.etiquetas.join(', ') : current.tag,
      }));

    } catch (err) {
      console.error("Fallo la generación con IA:", err);
      setError("La IA no pudo procesar la imagen, pero podés cargar los datos a mano.");
    } finally {
      setIsLoadingIA(false);
    }
  };

  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  // --------------------------------

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

    if (!location) {
      setError("Seleccioná la ubicación en el mapa.");
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
        lat: location.lat,
        lng: location.lng,
        ...(location.address ? { address: location.address } : {}),
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

        {/* CONTENEDOR DE IA VISUAL */}
        <div className="glass-subtle rounded-2xl p-4 mb-4 text-center border-dashed">
          <label className="cursor-pointer flex flex-col items-center gap-2">
            {isLoadingIA ? (
              <>
                <Loader2 size={24} className="animate-spin text-blue-500" />
                <span className="text-blue-700 dark:text-blue-300 font-medium">La IA está analizando tu producto...</span>
              </>
            ) : (
              <>
                <Wand2 size={24} className="text-blue-500" />
                <span className="text-blue-700 dark:text-blue-300 font-medium">Sube una foto de tu producto y autocompleta con Inteligencia Artificial</span>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
              disabled={isLoadingIA}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="dashboard-product-form__fields">
          <label>Título<input required value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder="Cajon de papas" disabled={isLoadingIA} /></label>
          <div className="dashboard-product-form__row">
            <label>Precio<input required min="0" step="0.01" type="number" value={form.price} onChange={(event) => updateField("price", event.target.value)} placeholder="120.50" disabled={isLoadingIA} /></label>
            <label>Stock<input required min="0" step="1" type="number" value={form.stock} onChange={(event) => updateField("stock", event.target.value)} placeholder="15" disabled={isLoadingIA} /></label>
          </div>
          <div className="dashboard-product-form__row">
            <label>Categorías (IDs)<input required value={form.category} onChange={(event) => updateField("category", event.target.value)} placeholder="1, 3" disabled={isLoadingIA} /></label>
            <label>Estado
              <select value={form.status} onChange={(event) => updateField("status", event.target.value)} disabled={isLoadingIA}>
                <option value="Disponible">Disponible</option>
                <option value="Agotado">Agotado</option>
              </select>
            </label>
          </div>
          <label>Ubicación<input required value={form.ubicacion} onChange={(event) => updateField("ubicacion", event.target.value)} placeholder="Av. Italia 123" disabled={isLoadingIA} /></label>

          <LocationPickerMap value={location} onChange={setLocation} />

          <label>Imagen (URL)<input type="url" value={form.image} onChange={(event) => updateField("image", event.target.value)} placeholder="https://example.com/producto.jpg" disabled={isLoadingIA} /></label>
          
          <label>Descripción<textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} placeholder="Detalle del producto" rows={3} disabled={isLoadingIA} /></label>
          <label>Etiquetas<input value={form.tag} onChange={(event) => updateField("tag", event.target.value)} placeholder="periféricos, gaming" disabled={isLoadingIA} /></label>
          
          {error && <p className="dashboard-product-form__error text-red-500">{error}</p>}
          
          <button type="submit" className="dashboard-product-form__submit" disabled={saving || isLoadingIA}>
            {saving ? "Guardando..." : "Crear producto"}
          </button>
        </form>
      </section>
    </div>
  );
}
