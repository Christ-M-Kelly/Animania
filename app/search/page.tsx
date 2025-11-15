"use client";

import ArticleCard from "@/src/components/ArticleCard";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  category: string;
  published: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construire l'URL de recherche
        const params = new URLSearchParams();
        if (query) params.append("q", query);
        if (category) params.append("category", category);

        const response = await fetch(`/api/search?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Erreur lors de la recherche");
        }

        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Erreur de recherche:", err);
        setError(
          err instanceof Error ? err.message : "Erreur lors de la recherche"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, category]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container mx-auto grow px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">Résultats de recherche</h1>

          {query && (
            <p className="text-gray-600">
              Recherche pour :{" "}
              <span className="font-semibold">&quot;{query}&quot;</span>
            </p>
          )}

          {category && (
            <p className="text-gray-600">
              Catégorie : <span className="font-semibold">{category}</span>
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="size-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-600">
              Aucun article trouvé pour votre recherche.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt || post.content.substring(0, 150) + "..."}
                imageUrl={post.imageUrl || "/images/default-post.jpg"}
                category={post.category}
                author={post.author}
                createdAt={post.createdAt}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
