export default function ArticlesLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-green-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-6xl p-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 animate-pulse rounded bg-gray-300"></div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-20 animate-pulse rounded bg-gray-300"></div>
              <div className="h-8 w-20 animate-pulse rounded bg-gray-300"></div>
              <div className="size-8 animate-pulse rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      <main className="grow py-12">
        <div className="mx-auto max-w-6xl px-4">
          {/* Hero section skeleton */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-10 w-80 animate-pulse rounded bg-gray-300"></div>
            <div className="mx-auto h-6 w-96 animate-pulse rounded bg-gray-300"></div>
          </div>

          {/* Categories skeleton */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-12 w-40 animate-pulse rounded-full bg-gray-300"
              ></div>
            ))}
          </div>

          {/* Articles grid skeleton */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg bg-white shadow-md"
              >
                <div className="h-48 w-full animate-pulse bg-gray-300"></div>
                <div className="p-6">
                  <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-300"></div>
                  <div className="mb-3 h-6 w-full animate-pulse rounded bg-gray-300"></div>
                  <div className="mb-4 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <div className="bg-green-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="space-y-4">
            <div className="h-6 w-48 animate-pulse rounded bg-green-700"></div>
            <div className="flex gap-8">
              <div className="space-y-2">
                <div className="h-4 w-20 animate-pulse rounded bg-green-700"></div>
                <div className="h-4 w-16 animate-pulse rounded bg-green-700"></div>
                <div className="h-4 w-24 animate-pulse rounded bg-green-700"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-green-700"></div>
                <div className="h-4 w-20 animate-pulse rounded bg-green-700"></div>
                <div className="w-18 h-4 animate-pulse rounded bg-green-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
