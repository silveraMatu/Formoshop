import { useNavigate } from "react-router-dom";
// 1. Cambiamos los "@/" por rutas relativas para arreglar las líneas rojas
import { useAuth } from "../../features/auth/hooks/useAuth"; 
import { Button } from "../../shared/components/Button"; 
import { ProductCard } from "../../shared/components/ProductCard";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-50 dark:bg-neutral-900 p-8">
      
      {/* 2. Tu cabecera original (Usuario y Logout) */}
      <div className="flex flex-col items-center gap-2 mb-10 w-full max-w-5xl bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
          Hola, {user?.name}
        </h1>
        <p className="text-sm text-neutral-500 mb-4">{user?.email}</p>
        <div className="w-40">
          <Button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Cerrar sesión
          </Button>
        </div>
      </div>

      {/* 3. La sección nueva con la grilla de productos y el sello PAIPPA */}
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            Oferta Productiva Local
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            name="Miel Orgánica de Monte" 
            producer="Cooperativa Apícola Formosa" 
            price={4500} 
            imageUrl="https://images.unsplash.com/photo-1587049352847-81a56d773c1c?q=80&w=600&auto=format&fit=crop" 
            isPaippa={true} 
          />
          <ProductCard 
            name="Acelga Fresca (Paquete)" 
            producer="Quinta El Sol" 
            price={1200} 
            imageUrl="https://images.unsplash.com/photo-1558225574-d022b7a8d5df?q=80&w=600&auto=format&fit=crop" 
            isPaippa={false} 
          />
           <ProductCard 
            name="Queso Criollo" 
            producer="Lácteos Formosa" 
            price={3200} 
            imageUrl="https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=600&auto=format&fit=crop" 
            isPaippa={true} 
          />
        </div>
      </div>

    </div>
  );
}