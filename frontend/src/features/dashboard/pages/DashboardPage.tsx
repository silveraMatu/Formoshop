import { useCallback, useState } from "react";
import { toast } from "sonner";
import { AddItemModal } from "../components/AddItemModal";
import { DashboardShell } from "../components/DashboardShell";
import { ProductForm } from "../components/ProductForm";
import { ProductGrid } from "../components/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import type { CreateProductInput, Product } from "../types/product";
import "../styles/dashboard.css";

export function DashboardPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const { products, loading, error, addProduct, editProduct, removeProduct } = useProducts();
  const closeAddModal = useCallback(() => setIsAddModalOpen(false), []);
  const closeProductForm = useCallback(() => {
    setIsProductFormOpen(false);
    setProductToEdit(undefined);
  }, []);

  const handleSelectType = (type: "product" | "service") => {
    closeAddModal();
    if (type === "product") {
      setProductToEdit(undefined);
      setIsProductFormOpen(true);
      return;
    }
    toast.info("El endpoint de servicios todavía no está disponible en el backend.");
  };

  const handleCreateOrUpdateProduct = async (input: CreateProductInput) => {
    if (productToEdit) {
      await editProduct(productToEdit.id, input);
      toast.success("Producto actualizado correctamente");
    } else {
      await addProduct(input);
      toast.success("Producto creado correctamente");
    }
    closeProductForm();
  };

  const handleEditClick = (id: string | number) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setProductToEdit(product);
      setIsProductFormOpen(true);
    }
  };

  const handleDeleteClick = async (id: string | number) => {
    if (window.confirm("¿Seguro que querés eliminar este producto?")) {
      try {
        await removeProduct(id);
        toast.success("Producto eliminado");
      } catch (err) {
        toast.error("Error al eliminar el producto");
      }
    }
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
        <ProductGrid 
          products={products} 
          loading={loading} 
          error={error} 
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>
      <AddItemModal open={isAddModalOpen} onClose={closeAddModal} onSelect={handleSelectType} />
      {isProductFormOpen && (
        <ProductForm 
          onClose={closeProductForm} 
          onSubmit={handleCreateOrUpdateProduct} 
          initialData={productToEdit}
        />
      )}
    </DashboardShell>
  );
}