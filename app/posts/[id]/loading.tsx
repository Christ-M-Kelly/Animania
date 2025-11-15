export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-green-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-6xl p-4">
          <div className="flex items-center justify-between">
            <div className="animate-shimmer h-8 w-32 animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
            <div className="flex items-center gap-4">
              <div className="animate-shimmer h-8 w-20 animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
              <div className="animate-shimmer h-8 w-20 animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
              <div className="animate-shimmer size-8 animate-pulse rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
            </div>
          </div>
        </div>
      </div>

      <main className="grow">
        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Navigation de retour skeleton avec animation de fade */}
          <div className="animate-shimmer mb-6 h-6 w-40 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] opacity-80"></div>

          {/* Article skeleton avec animations échelonnées */}
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            {/* Image skeleton avec wave effect */}
            <div className="relative h-80 w-full overflow-hidden bg-gray-200">
              <div className="animate-wave absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
              <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              {/* Badge skeleton avec délai d'animation */}
              <div
                className="animate-shimmer h-6 w-32 rounded-full bg-gradient-to-r from-green-100 via-green-200 to-green-100 bg-[length:200%_100%]"
                style={{ animationDelay: "0.1s" }}
              ></div>

              {/* Titre skeleton avec effet de typing */}
              <div className="space-y-3">
                <div
                  className="animate-shimmer h-8 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="animate-shimmer h-8 w-1/2 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
                  style={{ animationDelay: "0.3s" }}
                ></div>
              </div>

              {/* Métadonnées skeleton avec animations séquentielles */}
              <div className="flex flex-wrap gap-4">
                {[24, 28, 20, 16].map((width, index) => (
                  <div
                    key={index}
                    className={`w- h-5${width} animate-shimmer rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]`}
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  ></div>
                ))}
              </div>

              {/* Séparateur skeleton avec effet pulse doux */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="h-px w-12 animate-pulse bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    <div className="animate-shimmer size-4 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
                    <div className="h-px w-12 animate-pulse bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Contenu skeleton avec effet de lecture progressive */}
              <div className="space-y-4">
                {[
                  { width: "w-full", delay: "0.8s" },
                  { width: "w-5/6", delay: "0.9s" },
                  { width: "w-4/5", delay: "1.0s" },
                  { width: "w-full", delay: "1.1s" },
                  { width: "w-3/4", delay: "1.2s" },
                  { width: "w-5/6", delay: "1.3s" },
                  { width: "w-2/3", delay: "1.4s" },
                  { width: "w-4/5", delay: "1.5s" },
                  { width: "w-1/2", delay: "1.6s" },
                ].map((line, index) => (
                  <div
                    key={index}
                    className={`h-4 ${line.width} animate-shimmer rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]`}
                    style={{ animationDelay: line.delay }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Commentaires skeleton avec fade-in progressif */}
          <div className="mt-8 overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="p-6 sm:p-8">
              <div
                className="animate-shimmer mb-6 h-6 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
                style={{ animationDelay: "1.7s" }}
              ></div>
              <div className="space-y-4">
                <div className="relative overflow-hidden">
                  <div
                    className="animate-shimmer h-20 w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
                    style={{ animationDelay: "1.8s" }}
                  ></div>
                </div>
                <div className="relative overflow-hidden">
                  <div
                    className="animate-shimmer h-16 w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
                    style={{ animationDelay: "1.9s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer skeleton avec animation de bas en haut */}
      <div className="bg-green-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="space-y-4">
            <div
              className="animate-shimmer h-6 w-48 rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]"
              style={{ animationDelay: "2.0s" }}
            ></div>
            <div className="flex gap-8">
              {[0, 1].map((section, sectionIndex) => (
                <div key={section} className="space-y-2">
                  {[20, 16, 24].map((width, index) => (
                    <div
                      key={index}
                      className={`w- h-4${width} animate-shimmer rounded bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_100%]`}
                      style={{
                        animationDelay: `${
                          2.1 + sectionIndex * 0.1 + index * 0.05
                        }s`,
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
