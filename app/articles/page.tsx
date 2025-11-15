"use client";

import ArticleCard from "@/src/components/ArticleCard";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  views: number;
  published: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export default function ArticlesPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "Tous les articles", icon: "🌍" },
    { id: "TERRESTRES", name: "Animaux Terrestres", icon: "🦁" },
    { id: "MARINS", name: "Animaux Marins", icon: "🐋" },
    { id: "AERIENS", name: "Animaux Aériens", icon: "🦅" },
    { id: "EAU_DOUCE", name: "Animaux d'Eau Douce", icon: "🐸" },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Récupérer uniquement les articles PUBLIÉS
        const response = await fetch("/api/posts");

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des articles");
        }

        const data = await response.json();

        if (data.success && data.posts) {
          // Double vérification côté client
          const publishedPosts = data.posts.filter(
            (post: Post) => post.published === true
          );
          setPosts(publishedPosts);
          setFilteredPosts(publishedPosts);
          console.log("✅ Articles publiés chargés:", publishedPosts.length);
        } else {
          throw new Error("Format de réponse invalide");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Impossible de charger les articles"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) => post.category === selectedCategory
      );
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, posts]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* En-tête */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
            Tous nos Articles
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Découvrez l'ensemble de nos publications sur le monde animal
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
              {selectedCategory === category.id && (
                <span className="ml-2 rounded-full bg-white/20 px-2 py-1 text-xs">
                  {filteredPosts.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Chargement */}
        {loading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 size-16 animate-spin rounded-full border-y-4 border-green-600"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Chargement des articles...
              </p>
            </div>
          </div>
        )}

        {/* Erreur */}
        {error && !loading && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Aucun article */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-4 text-xl text-gray-600 dark:text-gray-400">
              Aucun article trouvé dans cette catégorie
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
            >
              Voir tous les articles
            </button>
          </div>
        )}

        {/* Articles */}
        {!loading && !error && filteredPosts.length > 0 && (
          <>
            <div className="mb-6 text-center text-gray-600 dark:text-gray-400">
              {filteredPosts.length} article
              {filteredPosts.length > 1 ? "s" : ""} publié
              {filteredPosts.length > 1 ? "s" : ""}
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <ArticleCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt || ""}
                  imageUrl={post.imageUrl || ""}
                  category={post.category}
                  views={post.views}
                  createdAt={post.createdAt}
                  author={post.author}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
