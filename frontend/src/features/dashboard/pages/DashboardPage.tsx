import { useCallback, useState } from "react";
import { toast } from "sonner";
import { AddItemModal } from "../components/AddItemModal";
import { DashboardShell } from "../components/DashboardShell";
import { ProductForm } from "../components/ProductForm";
import { ProductGrid } from "../components/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import type { CreateProductInput } from "../types/product";
import "../styles/dashboard.css";

export function DashboardPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const { products, loading, error, addProduct } = useProducts();
  const closeAddModal = useCallback(() => setIsAddModalOpen(false), []);
  const closeProductForm = useCallback(() => setIsProductFormOpen(false), []);

  const handleSelectType = (type: "product" | "service") => {
    closeAddModal();
    if (type === "product") {
      setIsProductFormOpen(true);
      return;
    }
    toast.info("El endpoint de servicios todavía no está disponible en el backend.");
  };

  const handleCreateProduct = async (input: CreateProductInput) => {
    await addProduct(input);
    toast.success("Producto creado correctamente");
  };

  return (
    <DashboardShell onAddClick={() => setIsAddModalOpen(true)}>
      <div className="dashboard-catalog">
        <div className="dashboard-catalog__header">
          <div>
            <p className="dashboard-catalog__eyebrow">Mi catálogo</p>
            <h1>Productos</h1>
            <span>{products.length} {products.length === 1 ? "producto" : "productos"}</span>
          </div>
        </div>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <AddItemModal open={isAddModalOpen} onClose={closeAddModal} onSelect={handleSelectType} />
      {isProductFormOpen && <ProductForm onClose={closeProductForm} onSubmit={handleCreateProduct} />}
    </DashboardShell>
  );
}