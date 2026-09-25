import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth"; 
import { Button } from "../../shared/components/Button"; 
import { ProductCard } from "../../shared/components/ProductCard";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSyncPaippa = async () => {
    if (!user?.id) return;
    
    try {
      // Ajustá el puerto 3000 si tu backend corre en otro lado
      const response = await fetch(`http://localhost:3000/api/auth/sync-paippa/${user.id}`, {
        method: 'PATCH',
      });
      
      if (response.ok) {
        alert("¡Sincronización exitosa con el padrón PAIPPA!");
        window.location.reload(); 
      } else {
        alert("Error al intentar validar con el ente provincial.");
      }
    } catch (error) {
      console.error("Error al sincronizar", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-50 dark:bg-neutral-900 p-8">
      
      <div className="flex flex-col items-center gap-2 mb-10 w-full max-w-5xl bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
          Hola, {user?.name}
        </h1>
        <p className="text-sm text-neutral-500 mb-4">{user?.email}</p>
        
        {/* Renderizamos el botón de validación si el usuario aún no está verificado */}
        {!user?.isPaippaVerified && (
          <div className="w-64 mb-2">
            <Button onClick={handleSyncPaippa} className="bg-green-600 hover:bg-green-700 text-white w-full">
              ✅ Vincular con CUIT PAIPPA
            </Button>
          </div>
        )}

        <div className="w-64">
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