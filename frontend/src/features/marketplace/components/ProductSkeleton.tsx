export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 flex flex-col h-full animate-pulse">
      {/* Skeleton Image */}
      <div className="aspect-square bg-slate-200" />
      
      {/* Skeleton Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Skeleton Badges */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-24 bg-slate-200 rounded-full" />
          <div className="h-6 w-32 bg-slate-200 rounded-full" />
        </div>

        {/* Skeleton Title */}
        <div className="space-y-2 mb-6">
          <div className="h-5 bg-slate-200 rounded-lg w-full" />
          <div className="h-5 bg-slate-200 rounded-lg w-2/3" />
        </div>
        
        {/* Skeleton Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          {/* Price */}
          <div className="h-8 bg-slate-200 rounded-lg w-24" />
          {/* Button */}
          <div className="h-10 bg-slate-200 rounded-xl w-32" />
        </div>
      </div>
    </div>
  );
}
