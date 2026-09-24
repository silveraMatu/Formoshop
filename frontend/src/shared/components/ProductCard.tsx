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
    <Card className="p-0 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* Imagen del producto */}
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-48 object-cover bg-gray-100"
      />
      
      {/* Contenido de la tarjeta */}
      <div className="p-5 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-xl text-gray-900">{name}</h3>
          <span className="text-xl font-bold text-green-600">${price}</span>
        </div>
        
        <p className="text-sm text-gray-600">
          📍 Productor: <strong>{producer}</strong>
        </p>

        {/* Renderizado condicional del sello PAIPPA */}
        <div className="mt-2">
          <PaippaBadge isVerified={isPaippa} />
        </div>
      </div>
    </Card>
  );
}