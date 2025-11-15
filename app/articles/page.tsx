"use client";

import ArticleCard from "@/src/components/ArticleCard";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  imageUrl: string | null;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

type CategoryFilter =
  | "ALL"
  | "TERRESTRES"
  | "MARINS"
  | "AERIENS"
  | "EAU_DOUCE"
  

export default function ArticlesPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("ALL");
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("📚 Chargement de tous les articles...");

        const response = await fetch("/api/posts");

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setPosts(data.posts);
          setFilteredPosts(data.posts);
          console.log(`✅ ${data.posts.length} articles chargés`);
        } else {
          throw new Error(data.message || "Erreur lors du chargement");
        }
      } catch (error: any) {
        console.error("❌ Erreur:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filtrer les posts selon la catégorie active
  useEffect(() => {
    if (activeFilter === "ALL") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === activeFilter));
    }
  }, [activeFilter, posts]);

  const categories = [
    {
      id: "ALL",
      name: "Tous",
      icon: "🌍",
      color: "from-green-600 to-blue-600",
    },
    {
      id: "TERRESTRES",
      name: "Terrestres",
      icon: "🦁",
      color: "from-green-600 to-emerald-600",
    },
    {
      id: "MARINS",
      name: "Marins",
      icon: "🐋",
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: "AERIENS",
      name: "Aériens",
      icon: "🦅",
      color: "from-sky-600 to-blue-600",
    },
    {
      id: "EAU_DOUCE",
      name: "Eau Douce",
      icon: "🐸",
      color: "from-teal-600 to-cyan-600",
    },
    
  ];

  const getActiveCategory = () => {
    return categories.find((cat) => cat.id === activeFilter) || categories[0];
  };

  const activeCategory = getActiveCategory();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className={`relative overflow-hidden bg-gradient-to-r ${activeCategory.color} py-20 text-white transition-all duration-500`}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-white/20 p-6 backdrop-blur-sm transition-transform hover:scale-110">
                  <span className="text-6xl">{activeCategory.icon}</span>
                </div>
              </div>
              <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                {activeFilter === "ALL"
                  ? "Tous nos Articles"
                  : `Animaux ${activeCategory.name}`}
              </h1>
              <p className="mb-8 text-xl opacity-90 md:text-2xl">
                {activeFilter === "ALL"
                  ? "Explorez toute la diversité du règne animal"
                  : `Découvrez les merveilles des animaux ${activeCategory.name.toLowerCase()}`}
              </p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl font-bold">
                  {filteredPosts.length}
                </span>
                <span className="text-lg opacity-90">
                  article{filteredPosts.length > 1 ? "s" : ""} disponible
                  {filteredPosts.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
          {/* Effet de vague amélioré */}
          <div className="leading-0 absolute bottom-0 left-0 w-full overflow-hidden">
            <svg
              className="relative block h-12 w-full md:h-16"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-white/5"
              ></path>
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="fill-white"
              ></path>
            </svg>
          </div>
        </section>

        {/* Section Filtres */}
        <section className="sticky top-0 z-40 bg-white/95 shadow-md backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id as CategoryFilter)}
                  className={`group flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                    activeFilter === category.id
                      ? `bg-gradient-to-r ${category.color} scale-105 text-white shadow-lg`
                      : "bg-gray-100 text-gray-700 hover:scale-105 hover:bg-gray-200"
                  }`}
                >
                  <span className="text-2xl transition-transform group-hover:scale-110">
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                  {activeFilter === category.id && (
                    <span className="ml-1 rounded-full bg-white/30 px-2 py-0.5 text-xs">
                      {category.id === "ALL"
                        ? posts.length
                        : filteredPosts.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* État de chargement */}
            {loading && (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                  <div
                    className={`mx-auto mb-4 size-16 animate-spin rounded-full border-y-4 bg-gradient-to-r ${activeCategory.color} bg-clip-border`}
                  ></div>
                  <p className="text-lg text-gray-600">
                    Chargement des articles...
                  </p>
                </div>
              </div>
            )}

            {/* État d'erreur */}
            {error && !loading && (
              <div className="mx-auto max-w-2xl rounded-lg border-l-4 border-red-500 bg-red-50 p-6">
                <div className="flex items-center">
                  <span className="mr-3 text-3xl">❌</span>
                  <div>
                    <h3 className="font-semibold text-red-800">
                      Erreur de chargement
                    </h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Grille d'articles */}
            {!loading && !error && (
              <>
                {filteredPosts.length > 0 ? (
                  <>
                    {/* Compteur et tri */}
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-lg text-gray-600">
                        <span className="font-bold text-gray-900">
                          {filteredPosts.length}
                        </span>{" "}
                        article{filteredPosts.length > 1 ? "s" : ""}{" "}
                        {activeFilter !== "ALL" && (
                          <span>
                            dans la catégorie{" "}
                            <span
                              className={`bg-gradient-to-r font-semibold ${activeCategory.color} bg-clip-text text-transparent`}
                            >
                              {activeCategory.name}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Grille */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                ) : (
                  <div className="mx-auto max-w-2xl text-center">
                    <div
                      className={`rounded-lg bg-gradient-to-br ${activeCategory.color} p-12 text-white`}
                    >
                      <span className="mb-4 inline-block text-6xl">
                        {activeCategory.icon}
                      </span>
                      <h3 className="mb-2 text-2xl font-semibold">
                        Aucun article dans cette catégorie
                      </h3>
                      <p className="mb-6 opacity-90">
                        {activeFilter === "ALL"
                          ? "Il n'y a pas encore d'articles publiés."
                          : `Les articles sur les animaux ${activeCategory.name.toLowerCase()} arriveront bientôt !`}
                      </p>
                      {activeFilter !== "ALL" && (
                        <button
                          onClick={() => setActiveFilter("ALL")}
                          className="rounded-lg bg-white/20 px-6 py-3 font-semibold backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30"
                        >
                          Voir tous les articles
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Section Catégories */}
        {!loading && !error && posts.length > 0 && (
          <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Explorez par Catégorie
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                  Découvrez la diversité du règne animal à travers nos
                  différentes catégories
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.slice(1).map((category) => {
                  const categoryPosts = posts.filter(
                    (post) => post.category === category.id
                  );
                  return (
                    <button
                      key={category.id}
                      onClick={() =>
                        setActiveFilter(category.id as CategoryFilter)
                      }
                      className={`group rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                        activeFilter === category.id
                          ? "ring-4 ring-amber-500"
                          : ""
                      }`}
                    >
                      <div
                        className={`mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-br ${category.color} text-4xl transition-transform group-hover:scale-110`}
                      >
                        {category.icon}
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        Animaux {category.name}
                      </h3>
                      <p className="mb-4 text-gray-600">
                        {categoryPosts.length} article
                        {categoryPosts.length > 1 ? "s" : ""} disponible
                        {categoryPosts.length > 1 ? "s" : ""}
                      </p>
                      <span
                        className={`inline-block rounded-full bg-gradient-to-r ${category.color} px-4 py-2 text-sm font-semibold text-white`}
                      >
                        Explorer →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Section Statistiques */}
        {!loading && !error && posts.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 p-12 text-white shadow-xl">
                <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
                  Notre Bibliothèque Animalière
                </h2>
                <div className="grid gap-8 md:grid-cols-4">
                  <div className="text-center">
                    <div className="mb-3 text-5xl font-bold">
                      {posts.length}
                    </div>
                    <p className="opacity-90">Articles publiés</p>
                  </div>
                  <div className="text-center">
                    <div className="mb-3 text-5xl font-bold">
                      {new Set(posts.map((p) => p.author.id)).size}
                    </div>
                    <p className="opacity-90">Contributeurs</p>
                  </div>
                  <div className="text-center">
                    <div className="mb-3 text-5xl font-bold">
                      {posts
                        .reduce((acc, post) => acc + post.views, 0)
                        .toLocaleString()}
                    </div>
                    <p className="opacity-90">Vues totales</p>
                  </div>
                  <div className="text-center">
                    <div className="mb-3 text-5xl font-bold">5</div>
                    <p className="opacity-90">Catégories</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
