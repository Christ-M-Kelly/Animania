import { Suspense } from "react";
import { prisma } from "@/app/db/prisma";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import ArticleCard from "@/src/components/ArticleCard";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

async function SearchResults({
  query,
  category,
}: {
  query: string;
  category?: string;
}) {
  const searchConditions: {
    published: boolean;
    OR: Array<{
      title?: { contains: string; mode: "insensitive" };
      content?: { contains: string; mode: "insensitive" };
      excerpt?: { contains: string; mode: "insensitive" };
    }>;
    category?: string;
  } = {
    published: true,
    OR: [
      { title: { contains: query, mode: "insensitive" } },
      { content: { contains: query, mode: "insensitive" } },
      { excerpt: { contains: query, mode: "insensitive" } },
    ],
  };

  if (category && category !== "all") {
    searchConditions.category = category;
  }

  const posts = await prisma.post.findMany({
    where: searchConditions,
    include: {
      author: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Aucun résultat trouvé
        </h2>
        <p className="mb-6 text-gray-600">
          Aucun article ne correspond à votre recherche "
          <strong>{query}</strong>"
        </p>
        <Link
          href="/articles"
          className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
        >
          Parcourir tous les articles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête des résultats */}
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Résultats de recherche
        </h1>
        <p className="text-gray-600">
          {posts.length} résultat{posts.length > 1 ? "s" : ""} trouvé
          {posts.length > 1 ? "s" : ""} pour "
          <strong className="text-green-600">{query}</strong>"
        </p>
        {category && category !== "all" && (
          <p className="mt-2 text-sm text-gray-500">
            dans la catégorie :{" "}
            <span className="font-medium">{category.replace("_", " ")}</span>
          </p>
        )}
      </div>

      {/* Grille des résultats avec ArticleCard */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} maxLength={120} />
        ))}
      </div>

      {/* Pagination info (si nécessaire) */}
      {posts.length >= 50 && (
        <div className="py-8 text-center">
          <p className="text-sm text-gray-500">
            Affichage des 50 premiers résultats. Affinez votre recherche pour
            des résultats plus précis.
          </p>
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query, category } = await searchParams;

  if (!query || query.trim().length < 2) {
    return (
      <div className="flex min-h-screen flex-col bg-green-50">
        <Header />
        <main className="grow py-12">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Recherche d'articles
            </h1>
            <p className="mb-8 text-gray-600">
              Utilisez la barre de recherche pour trouver des articles sur les
              animaux
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
            >
              Parcourir tous les articles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-green-50">
      <Header />
      <main className="grow py-12">
        <div className="mx-auto max-w-6xl px-4">
          <Suspense
            fallback={
              <div className="flex justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="size-8 animate-spin rounded-full border-b-2 border-green-600"></div>
                  <span className="text-gray-600">Recherche en cours...</span>
                </div>
              </div>
            }
          >
            <SearchResults query={query} category={category} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
