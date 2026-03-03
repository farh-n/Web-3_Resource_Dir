export default function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 p-5 dark:border-gray-800">
      {/* Simulates the icon + title row */}
      <div className="mb-3 flex items-center gap-3">
        <div className="h-8 w-8 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Simulates the description — two lines */}
      <div className="mb-4 flex flex-col gap-2">
        <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Simulates the badge row */}
      <div className="mb-4 flex gap-2">
        <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-5 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Simulates the bottom link row */}
      <div className="flex justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}