export default function ProductSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col">
      {/* Image skeleton */}
      <div className="w-full aspect-square animate-shimmer" />

      {/* Content skeleton */}
      <div className="p-4 flex-1 flex flex-col gap-2.5">
        {/* Category */}
        <div className="h-2.5 animate-shimmer rounded-full w-1/4" />
        {/* Title lines */}
        <div className="h-3.5 animate-shimmer rounded w-full" />
        <div className="h-3.5 animate-shimmer rounded w-3/4" />
        {/* Stars */}
        <div className="h-3 animate-shimmer rounded w-1/3 mt-1" />
        {/* Price & button */}
        <div className="mt-auto pt-2 flex flex-col gap-2">
          <div className="h-6 animate-shimmer rounded w-1/3" />
          <div className="h-9 animate-shimmer rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
}
