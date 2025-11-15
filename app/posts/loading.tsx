export default function PostsLoading() {
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

      <main className="grow bg-green-50 py-12">
        <div className="mx-auto max-w-4xl px-4">
          {/* Titre skeleton avec effet de typing */}
          <div className="animate-shimmer mb-8 h-8 w-64 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>

          {/* Posts skeleton avec animations échelonnées */}
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="animate-shimmer h-6 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
                  <div className="animate-shimmer h-5 w-20 rounded bg-gradient-to-r from-green-100 via-green-200 to-green-100 bg-[length:200%_100%]"></div>
                </div>
                <div className="animate-shimmer mb-3 h-4 w-5/6 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
                <div className="flex items-center justify-between space-y-0 text-sm">
                  <div className="animate-shimmer h-4 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
                  <div className="flex items-center space-x-4">
                    <div className="animate-shimmer h-4 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
                    <div className="animate-shimmer h-4 w-20 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
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
            <div className="animate-shimmer h-6 w-48 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
            <div className="flex gap-8">
              <div className="space-y-2">
                <div className="animate-shimmer h-4 w-20 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
                <div className="animate-shimmer h-4 w-16 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
                <div className="animate-shimmer h-4 w-24 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
              </div>
              <div className="space-y-2">
                <div className="animate-shimmer h-4 w-24 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
                <div className="animate-shimmer h-4 w-20 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
                <div className="w-18 animate-shimmer h-4 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
