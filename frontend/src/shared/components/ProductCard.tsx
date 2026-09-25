import { Card } from './Card';
// Importamos el sello desde la ruta donde lo creaste
import { PaippaBadge } from '../../features/auth/components/PaippaBadge';

interface ProductCardProps {
  name: string;
  producer: string;
  price: number;
  imageUrl: string;
  isPaippa: boolean;
}

export function ProductCard({ name, producer, price, imageUrl, isPaippa }: ProductCardProps) {
  return (
    <Card className="p-0 overflow-hidden flex flex-col rounded-2xl hover:-translate-y-1 hover:border-white/90 dark:hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300">
      {/* Imagen del producto */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover bg-neutral-100 dark:bg-neutral-800 transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-6 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-bold text-xl text-neutral-900 dark:text-neutral-50">{name}</h3>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">${price}</span>
        </div>
        
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          📍 Productor: <strong className="text-neutral-800 dark:text-neutral-200">{producer}</strong>
        </p>

        {/* Renderizado condicional del sello PAIPPA */}
        <div className="mt-2">
          <PaippaBadge isVerified={isPaippa} />
        </div>
      </div>
    </Card>
  );
}
