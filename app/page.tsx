"use client";

import ArticleCard from "@/src/components/ArticleCard";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  views: number;
  published?: boolean; // Ajoutez cette propriété si elle manque
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration error
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Récupérer uniquement les 3 derniers articles PUBLIÉS
        const response = await fetch("/api/posts?limit=3");

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des articles");
        }

        const data = await response.json();

        if (data.success && data.posts) {
          // Double vérification côté client pour être sûr
          const publishedPosts = data.posts.filter(
            (post: Post) => post.published === true
          );
          setLatestPosts(publishedPosts);
          console.log("✅ Articles publiés chargés:", publishedPosts.length);
        } else {
          throw new Error("Format de réponse invalide");
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement des derniers articles:",
          error
        );
        setError(
          error instanceof Error
            ? error.message
            : "Impossible de charger les articles"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  const categories = [
    {
      id: "TERRESTRES",
      name: "Animaux Terrestres",
      icon: "🦁",
      description: "Découvrez les créatures qui peuplent nos terres",
      color: "from-green-600 to-emerald-600",
      link: "/articles/animaux-terrestres",
    },
    {
      id: "MARINS",
      name: "Animaux Marins",
      icon: "🐋",
      description: "Plongez dans les mystères des océans",
      color: "from-blue-600 to-cyan-600",
      link: "/articles/animaux-marins",
    },
    {
      id: "AERIENS",
      name: "Animaux Aériens",
      icon: "🦅",
      description: "Explorez le monde fascinant des oiseaux",
      color: "from-sky-600 to-blue-600",
      link: "/articles/animaux-aerien",
    },
    {
      id: "EAU_DOUCE",
      name: "Animaux d'Eau Douce",
      icon: "🐸",
      description: "Les habitants des rivières et lacs",
      color: "from-teal-600 to-cyan-600",
      link: "/articles/animaux-d-eau-douce",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-green-400 via-green-600 to-blue-600 py-20 text-white md:py-32">
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Particules animées - seulement côté client */}
          {isClient && (
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute size-2 rounded-full bg-white/20"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                  }}
                  animate={{
                    y: ["-20%", "120%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
          )}

          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 flex justify-center"
              >
                <div className="rounded-full bg-white/20 p-8 backdrop-blur-sm">
                  <span className="text-7xl">🌍</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 text-5xl font-bold md:text-7xl"
              >
                Bienvenue sur Animania
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8 text-xl opacity-90 md:text-2xl"
              >
                Explorez le monde fascinant des animaux à travers nos articles
                passionnants et découvertes scientifiques
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link
                  href="/articles"
                  className="group relative overflow-hidden rounded-full bg-white px-8 py-4 font-semibold text-amber-700 transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10">Explorer les articles</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 transition-opacity group-hover:opacity-10"></div>
                </Link>
                <Link
                  href="/galerie"
                  className="rounded-full border-2 border-white/50 bg-white/10 px-8 py-4 font-semibold backdrop-blur-sm transition-all hover:scale-105 hover:border-white hover:bg-white/20"
                >
                  Voir la galerie
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Vagues décoratives */}
          <div className="absolute inset-x-0 bottom-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Section Catégories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Explorez par Catégorie
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Découvrez la diversité du règne animal à travers nos différentes
                catégories thématiques
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={category.link}>
                    <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-10`}
                      ></div>

                      <div className="relative">
                        <div
                          className={`mb-4 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-4xl shadow-lg transition-transform group-hover:scale-110`}
                        >
                          {category.icon}
                        </div>

                        <h3 className="mb-2 text-2xl font-bold text-gray-900">
                          {category.name}
                        </h3>

                        <p className="mb-4 text-gray-600">
                          {category.description}
                        </p>

                        <div className="flex items-center gap-2 font-semibold text-amber-600 transition-all group-hover:gap-3">
                          <span>Découvrir</span>
                          <svg
                            className="size-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Articles Récents */}
        <section className="bg-gradient-to-b from-white to-gray-100 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                  Articles Récents
                </h2>
                <p className="text-lg text-gray-600">
                  Découvrez nos dernières publications
                </p>
              </div>
              <Link
                href="/articles"
                className="hidden rounded-full bg-amber-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-amber-700 md:block"
              >
                Voir tout
              </Link>
            </div>

            {loading ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 size-16 animate-spin rounded-full border-y-4 border-amber-600"></div>
                  <p className="text-lg text-gray-600">
                    Chargement des articles...
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {latestPosts.map((post) => (
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

                <div className="mt-12 text-center md:hidden">
                  <Link
                    href="/articles"
                    className="inline-block rounded-full bg-amber-600 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-amber-700"
                  >
                    Voir tous les articles
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Section Statistiques */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="rounded-3xl bg-gradient-to-r from-green-400 via-green-500 to-blue-600 p-12 text-white shadow-2xl">
              <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">
                Animania en Chiffres
              </h2>
              <div className="grid gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="mb-3 text-6xl font-bold">
                    {latestPosts.length}+
                  </div>
                  <p className="text-xl opacity-90">Articles publiés</p>
                </div>
                <div className="text-center">
                  <div className="mb-3 text-6xl font-bold">5</div>
                  <p className="text-xl opacity-90">Catégories</p>
                </div>
                <div className="text-center">
                  <div className="mb-3 text-6xl font-bold">
                    {latestPosts
                      .reduce((acc, post) => acc + post.views, 0)
                      .toLocaleString()}
                    +
                  </div>
                  <p className="text-xl opacity-90">Vues totales</p>
                </div>
                <div className="text-center">
                  <div className="mb-3 text-6xl font-bold">24/7</div>
                  <p className="text-xl opacity-90">Disponible</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA */}
        <section className="bg-gradient-to-b from-gray-100 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 text-7xl">📚</div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Prêt à explorer ?
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                Rejoignez notre communauté de passionnés d'animaux et découvrez
                un monde fascinant
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/articles"
                  className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
                >
                  Commencer l'exploration
                </Link>
                <Link
                  href="/a-propos/qui-sommes-nous"
                  className="rounded-full border-2 border-amber-600 px-8 py-4 font-semibold text-amber-600 transition-all hover:scale-105 hover:bg-amber-50"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
