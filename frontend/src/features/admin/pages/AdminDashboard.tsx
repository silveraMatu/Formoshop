import { useEffect, useState } from "react";
import { CheckCircle, ShieldAlert, UserRound } from "lucide-react";

interface PendingVendor {
  id: number;
  name: string;
  email: string;
}

export function AdminDashboard() {
  const [vendors, setVendors] = useState<PendingVendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingVendors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/pending-vendors");
        if (response.ok) {
          const data = await response.json();
          setVendors(data);
        }
      } catch (error) {
        console.error("Error al cargar vendedores", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingVendors();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/verify/${id}`, {
        method: "PATCH",
      });
      
      if (response.ok) {
        setVendors((prev) => prev.filter((vendor) => vendor.id !== id));
      } else {
        alert("Hubo un problema al verificar al productor.");
      }
    } catch (error) {
      console.error("Error al verificar", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <ShieldAlert className="text-emerald-600 dark:text-emerald-400" size={32} />
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Portal PAIPPA - Validaciones Pendientes
          </h1>
        </div>

        <div className="bg-white/65 dark:bg-neutral-900/60 backdrop-blur-xl backdrop-saturate-150 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)] overflow-hidden border border-white/40 dark:border-white/10">
          {loading ? (
            <p className="p-8 text-center text-neutral-500">Cargando padrón...</p>
          ) : vendors.length === 0 ? (
            <p className="p-8 text-center text-neutral-500">No hay productores pendientes de validación.</p>
          ) : (
            <div className="divide-y divide-black/5 dark:divide-white/10">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="p-6 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-150">
                  <div className="flex items-center gap-4">
                    <div className="bg-black/5 dark:bg-white/10 p-3 rounded-full backdrop-blur-sm">
                      <UserRound size={24} className="text-neutral-600 dark:text-neutral-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50">
                        {vendor.name}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {vendor.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApprove(vendor.id)}
                    className="flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 px-5 py-2.5 rounded-xl font-medium transition-all duration-150 active:scale-[0.98] shadow-sm"
                  >
                    <CheckCircle size={18} />
                    Aprobar Productor
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
