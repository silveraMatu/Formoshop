export function ProductSkeleton() {
  return (
    <div className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col h-full animate-pulse">
      {/* Skeleton Image */}
      <div className="aspect-square bg-neutral-200/60 dark:bg-neutral-800/60 rounded-xl m-2" />
      
      {/* Skeleton Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Skeleton Badges */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-24 bg-neutral-200/60 dark:bg-neutral-800/60 rounded-full" />
          <div className="h-6 w-32 bg-neutral-200/60 dark:bg-neutral-800/60 rounded-full" />
        </div>

        {/* Skeleton Title */}
        <div className="space-y-2 mb-6">
          <div className="h-5 bg-neutral-200/60 dark:bg-neutral-800/60 rounded-lg w-full" />
          <div className="h-5 bg-neutral-200/60 dark:bg-neutral-800/60 rounded-lg w-2/3" />
        </div>
        
        {/* Skeleton Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          {/* Price */}
          <div className="h-8 bg-neutral-200/60 dark:bg-neutral-800/60 rounded-lg w-24" />
          {/* Button */}
          <div className="h-10 bg-neutral-200/60 dark:bg-neutral-800/60 rounded-xl w-32" />
        </div>
      </div>
    </div>
  );
}
