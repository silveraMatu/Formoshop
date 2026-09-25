import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { X, Wand2, Loader2, ImagePlus, Trash2 } from "lucide-react";
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
  status: "Disponible" as ProductStatus,
  stock: "",
  ubicacion: "",
  description: "",
  tag: "",
};

export function ProductForm({ onClose, onSubmit }: ProductFormProps) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [isLoadingIA, setIsLoadingIA] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationValue | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (readerError) => reject(readerError);
    });

  // --- lógica unificada: preview + IA ---
  const processImageFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen.");
      return;
    }

    setIsLoadingIA(true);
    setError(null);

    try {
      const dataUrl = await toBase64(file);
      setImageDataUrl(dataUrl);

      const cleanBase64 = dataUrl.split(",")[1] ?? "";
      const aiData = await generateProductMetadata(cleanBase64);

      setForm((current) => ({
        ...current,
        title: aiData.tituloSugerido || current.title,
        description: aiData.descripcionSugerida || current.description,
        price: aiData.precioEstimado ? aiData.precioEstimado.toString() : current.price,
        tag: aiData.etiquetas ? aiData.etiquetas.join(", ") : current.tag,
      }));
    } catch (err) {
      console.error("Fallo la generación con IA:", err);
      setError("La IA no pudo procesar la imagen, pero podés cargar los datos a mano.");
    } finally {
      setIsLoadingIA(false);
    }
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void processImageFile(file);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void processImageFile(file);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const clearImage = () => {
    setImageDataUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  // --------------------------------

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const tags = form.tag
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (!form.title.trim() || !form.price || !form.stock || !form.ubicacion.trim()) {
      setError("Completá título, precio, stock y ubicación.");
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
        status: form.status,
        stock: Number(form.stock),
        ubicacion: form.ubicacion.trim(),
        lat: location.lat,
        lng: location.lng,
        ...(location.address ? { address: location.address } : {}),
        ...(imageDataUrl ? { image: imageDataUrl } : {}),
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

        {/* DROPZONE DE IMAGEN + IA */}
        <div className="glass-subtle rounded-2xl p-4 mb-4 border-dashed">
          {imageDataUrl ? (
            <div className="relative w-full overflow-hidden rounded-xl border border-white/40 dark:border-white/10">
              <img
                src={imageDataUrl}
                alt="Vista previa del producto"
                className="w-full h-48 object-cover"
              />
              {isLoadingIA && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-sm text-white">
                  <Loader2 size={24} className="animate-spin" />
                  <span className="text-sm font-medium">La IA está analizando tu producto...</span>
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-900 transition-colors active:scale-95"
                  aria-label="Cambiar imagen"
                >
                  <ImagePlus size={16} />
                </button>
                <button
                  type="button"
                  onClick={clearImage}
                  className="p-2 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-red-500 hover:bg-white dark:hover:bg-neutral-900 transition-colors active:scale-95"
                  aria-label="Eliminar imagen"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor="product-image-upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={
                "cursor-pointer flex flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors " +
                (isDragging
                  ? "border-blue-400 bg-blue-500/5"
                  : "border-black/10 dark:border-white/15 hover:border-blue-400/60")
              }
            >
              {isLoadingIA ? (
                <>
                  <Loader2 size={24} className="animate-spin text-blue-500" />
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    La IA está analizando tu producto...
                  </span>
                </>
              ) : (
                <>
                  <Wand2 size={24} className="text-blue-500" />
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    Arrastrá una foto o hacé clic para subirla
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    La IA autocompletará título, descripción, precio y etiquetas
                  </span>
                </>
              )}
            </label>
          )}
          <input
            id="product-image-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={isLoadingIA}
          />
        </div>

        <form onSubmit={handleSubmit} className="dashboard-product-form__fields">
          <label>Título<input required value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder="Cajon de papas" disabled={isLoadingIA} /></label>
          <div className="dashboard-product-form__row">
            <label>Precio<input required min="0" step="0.01" type="number" value={form.price} onChange={(event) => updateField("price", event.target.value)} placeholder="120.50" disabled={isLoadingIA} /></label>
            <label>Stock<input required min="0" step="1" type="number" value={form.stock} onChange={(event) => updateField("stock", event.target.value)} placeholder="15" disabled={isLoadingIA} /></label>
          </div>
          <label>Estado
            <select value={form.status} onChange={(event) => updateField("status", event.target.value)} disabled={isLoadingIA}>
              <option value="Disponible">Disponible</option>
              <option value="Agotado">Agotado</option>
            </select>
          </label>
          <label>Ubicación<input required value={form.ubicacion} onChange={(event) => updateField("ubicacion", event.target.value)} placeholder="Av. Italia 123" disabled={isLoadingIA} /></label>

          <LocationPickerMap value={location} onChange={setLocation} />

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
