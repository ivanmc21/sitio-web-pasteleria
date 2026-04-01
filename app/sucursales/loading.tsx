export default function SucursalesLoading() {
  return (
    <div className="flex-1 bg-rosa-empolvado">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* Header Skeleton */}
        <div className="mb-8 text-center">
          <div className="mx-auto h-10 w-48 animate-pulse rounded bg-dorado/20" />
          <div className="mx-auto mt-2 h-6 w-64 animate-pulse rounded bg-dorado/20" />
        </div>

        {/* Search Skeleton */}
        <div className="mx-auto mt-6 max-w-md">
          <div className="h-12 w-full animate-pulse rounded-full bg-dorado/20" />
        </div>

        {/* Grid Skeleton */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="h-125 animate-pulse rounded-xl bg-dorado/20" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-xl bg-dorado/20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}