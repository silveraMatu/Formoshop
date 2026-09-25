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
    <div className="flex min-h-screen flex-col items-center bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <ShieldAlert className="text-green-600" size={32} />
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Portal PAIPPA - Validaciones Pendientes
          </h1>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden border border-neutral-200 dark:border-neutral-700">
          {loading ? (
            <p className="p-8 text-center text-neutral-500">Cargando padrón...</p>
          ) : vendors.length === 0 ? (
            <p className="p-8 text-center text-neutral-500">No hay productores pendientes de validación.</p>
          ) : (
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="p-6 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-full">
                      <UserRound size={24} className="text-neutral-600 dark:text-neutral-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">
                        {vendor.name}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {vendor.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApprove(vendor.id)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
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