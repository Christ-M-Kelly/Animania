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

export default function AnimauxAerienPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("🦅 Chargement des articles sur les animaux aériens...");

        const response = await fetch("/api/posts/category/AERIENS");

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setPosts(data.posts);
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

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-sky-50 to-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-sky-600 to-blue-600 py-20 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-white/20 p-6 backdrop-blur-sm">
                  <span className="text-6xl">🦅</span>
                </div>
              </div>
              <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                Animaux Aériens
              </h1>
              <p className="mb-8 text-xl text-sky-100 md:text-2xl">
                Explorez le monde fascinant des créatures qui règnent dans les
                cieux
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                  🦜 Oiseaux
                </div>
                <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                  🦇 Chauves-souris
                </div>
                <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                  🦋 Insectes volants
                </div>
                <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                  🦅 Rapaces
                </div>
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

        {/* Section Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Header de section */}
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Nos Articles sur les Animaux Aériens
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Des oiseaux majestueux aux insectes volants fascinants,
                découvrez les secrets des maîtres des airs
              </p>
            </div>

            {/* État de chargement */}
            {loading && (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 size-16 animate-spin rounded-full border-b-4 border-sky-600"></div>
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
                {posts.length > 0 ? (
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
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
                ) : (
                  <div className="mx-auto max-w-2xl text-center">
                    <div className="rounded-lg bg-sky-50 p-12">
                      <span className="mb-4 inline-block text-6xl">🦅</span>
                      <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                        Aucun article pour le moment
                      </h3>
                      <p className="mb-6 text-gray-600">
                        Les articles sur les animaux aériens arriveront bientôt
                        !
                      </p>
                      <button
                        onClick={() => router.push("/articles")}
                        className="rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-700"
                      >
                        Voir tous les articles
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Section Info supplémentaire */}
        <section className="bg-gradient-to-r from-sky-100 to-blue-100 py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 text-center shadow-md transition-transform hover:scale-105">
                <div className="mb-4 text-5xl">🦜</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Oiseaux Exotiques
                </h3>
                <p className="text-gray-600">
                  Perroquets, toucans et autres oiseaux colorés des tropiques
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 text-center shadow-md transition-transform hover:scale-105">
                <div className="mb-4 text-5xl">🦅</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Rapaces Majestueux
                </h3>
                <p className="text-gray-600">
                  Aigles, faucons et hiboux, les chasseurs des cieux
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 text-center shadow-md transition-transform hover:scale-105">
                <div className="mb-4 text-5xl">🦋</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Insectes Volants
                </h3>
                <p className="text-gray-600">
                  Papillons, libellules et autres merveilles ailées
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section statistiques */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 p-12 text-white shadow-xl">
              <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
                Le Monde Aérien en Chiffres
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-3 text-5xl font-bold">10,000+</div>
                  <p className="text-sky-100">
                    espèces d'oiseaux recensées dans le monde
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-3 text-5xl font-bold">1 Million+</div>
                  <p className="text-sky-100">
                    espèces d'insectes volants identifiées
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-3 text-5xl font-bold">11,000m</div>
                  <p className="text-sky-100">
                    altitude de vol record atteinte par certains oiseaux
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section conservation */}
        <section className="bg-sky-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 text-6xl">🪶</div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Protégeons les Oiseaux et leurs Habitats
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                De nombreuses espèces d'oiseaux sont menacées par la destruction
                de leurs habitats et le changement climatique. Découvrez comment
                contribuer à leur protection.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => router.push("/a-propos/qui-sommes-nous")}
                  className="rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-700"
                >
                  En savoir plus
                </button>
                <button
                  onClick={() => router.push("/articles")}
                  className="rounded-lg border-2 border-sky-600 px-6 py-3 font-semibold text-sky-600 transition-colors hover:bg-sky-50"
                >
                  Tous les articles
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
