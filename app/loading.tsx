export default function RootLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-green-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-6xl p-4">
          <div className="flex items-center justify-between">
            <div className="animate-shimmer h-8 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
            <div className="flex items-center gap-4">
              <div className="animate-shimmer h-8 w-20 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
              <div className="animate-shimmer h-8 w-20 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
              <div className="animate-shimmer size-8 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
            </div>
          </div>
        </div>
      </div>

      <main className="grow">
        {/* Hero Section Skeleton avec effet wave */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-400 to-green-600 py-20">
          <div className="animate-wave absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"></div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <div className="animate-shimmer mx-auto mb-6 h-12 w-80 rounded bg-gradient-to-r from-green-200 via-green-100 to-green-200 bg-[length:200%_100%]"></div>
            <div
              className="animate-shimmer mx-auto mb-8 h-6 w-96 rounded bg-gradient-to-r from-green-200 via-green-100 to-green-200 bg-[length:200%_100%]"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="animate-shimmer mx-auto h-12 w-40 rounded-full bg-gradient-to-r from-green-200 via-green-100 to-green-200 bg-[length:200%_100%]"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>

        {/* Featured Articles Skeleton */}
        <div className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <div className="animate-shimmer mx-auto mb-4 h-8 w-64 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
              <div
                className="animate-shimmer mx-auto h-6 w-80 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
                style={{ animationDelay: "0.1s" }}
              ></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
                  style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                    <div className="animate-wave absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                    <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
                  </div>
                  <div className="p-6">
                    <div className="animate-shimmer mb-2 h-4 w-20 rounded bg-gradient-to-r from-green-100 via-green-200 to-green-100 bg-[length:200%_100%]"></div>
                    <div className="animate-shimmer mb-3 h-6 w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
                    <div className="mb-4 space-y-2">
                      <div className="animate-shimmer h-4 w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
                      <div className="animate-shimmer h-4 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="animate-shimmer h-4 w-16 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
                      <div className="animate-shimmer h-8 w-24 rounded bg-gradient-to-r from-green-100 via-green-200 to-green-100 bg-[length:200%_100%]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <div className="bg-green-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="space-y-4">
            <div className="animate-shimmer h-6 w-48 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
            <div className="grid gap-8 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="space-y-2"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="animate-shimmer h-5 w-24 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
                  <div className="animate-shimmer h-4 w-20 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
                  <div className="animate-shimmer h-4 w-16 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
                  <div className="w-18 animate-shimmer h-4 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
