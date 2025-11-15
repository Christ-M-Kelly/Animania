import { prisma } from "@/app/db/prisma";
import Link from "next/link";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default async function PostsPage() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="grow bg-green-50 py-12">
          <div className="mx-auto max-w-4xl px-4">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">
              Liste des Articles ({posts.length})
            </h1>

            {posts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="mb-4 text-gray-600">
                  Aucun article publié trouvé.
                </p>
                <Link
                  href="/profil"
                  className="text-green-600 hover:text-green-700"
                >
                  Créer un article
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-lg bg-white p-6 shadow-md"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        <Link
                          href={`/posts/${post.id}`}
                          className="text-green-600 hover:text-green-700 hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        {post.category}
                      </span>
                    </div>

                    {post.excerpt && (
                      <p className="mb-3 line-clamp-2 text-gray-600">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Par {post.author.name}</span>
                      <div className="flex items-center space-x-4">
                        <span>ID: {post.id}</span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error loading posts:", error);
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex grow items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-red-600">
              Erreur de chargement
            </h1>
            <p className="text-gray-600">Impossible de charger les articles.</p>
            <pre className="mt-4 rounded bg-gray-100 p-4 text-xs text-gray-500">
              {error instanceof Error ? error.message : "Erreur inconnue"}
            </pre>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
