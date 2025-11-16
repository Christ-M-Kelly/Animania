import Link from "next/link";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { Suspense } from "react";

// Composant pour le contenu des posts
async function PostsContent() {
  try {
    // Import dynamique de Prisma pour éviter les erreurs de build
    const { prisma } = await import("@/app/db/prisma");

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
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Liste des Articles ({posts.length})
        </h1>

        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-gray-600">Aucun article publié trouvé.</p>
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
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    <Link
                      href={`/posts/${post.id}`}
                      className="hover:text-green-600"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {post.category}
                  </span>
                </div>

                <p className="mb-3 line-clamp-2 text-gray-600">
                  {post.excerpt || post.content.substring(0, 200) + "..."}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Par {post.author.name}</span>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error: any) {
    console.error("Erreur lors du chargement des posts:", error);

    return (
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Liste des Articles
        </h1>

        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-2 text-lg font-semibold text-red-800">
            Erreur de chargement
          </h2>
          <p className="text-red-600">
            Impossible de charger les articles. Veuillez réessayer plus tard.
          </p>
        </div>
      </div>
    );
  }
}

export default function PostsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow bg-green-50 py-12">
        <Suspense
          fallback={
            <div className="mx-auto max-w-4xl px-4">
              <div className="animate-pulse">
                <div className="mb-8 h-8 rounded bg-gray-200"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-32 rounded bg-gray-200"></div>
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <PostsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
