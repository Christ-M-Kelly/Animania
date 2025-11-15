import WeeklyAnimalBanner from "@/src/components/ui/WeeklyAnimalBanner";
import Link from "next/link";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import { prisma } from "./db/prisma";

async function RecentPosts() {
  try {
    // Vérification que prisma est bien défini
    if (!prisma) {
      console.error("❌ Prisma n'est pas défini");
      return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full py-8 text-center">
            <p className="text-gray-600">Articles à venir bientôt...</p>
          </div>
        </div>
      );
    }

    const posts = await prisma.post.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
        title: true,
        content: true,
        imageUrl: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!posts || posts.length === 0) {
      return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full py-8 text-center">
            <p className="text-gray-600">
              Aucun article disponible pour le moment
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div className="flex cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
              <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gray-100 p-4">
                <img
                  src={post.imageUrl || "https://via.placeholder.com/300x180"}
                  alt={post.title}
                  className="max-h-[200px] w-auto object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-sm font-semibold uppercase text-green-600">
                    {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    Par {post.author.name}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold text-green-500 transition-colors duration-300 hover:text-green-600">
                  {post.title}
                </h3>
                <div
                  className="prose line-clamp-3 max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des posts:", error);

    // Retourner un composant de fallback au lieu de planter
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-full py-8 text-center">
          <p className="text-gray-600">
            Erreur lors du chargement des articles
          </p>
        </div>
      </div>
    );
  }
}

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-green-800 py-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <img
              src="/images/perro.jpg"
              alt="Animaux sauvages"
              className="size-full object-cover"
            />
          </div>
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Animania
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-white md:text-2xl">
              Explorez le monde fascinant des animaux à travers des articles
              passionnants, des photos exceptionnelles et une communauté
              engagée.
            </p>
            <p className="text-lg italic text-green-200 md:text-xl">
              "Parce que chaque animal mérite d'être compris et protégé"
            </p>
            <div className="mt-10">
              <a
                href="#articles"
                className="inline-block rounded-lg bg-amber-500 px-8 py-3 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-amber-600 hover:shadow-xl"
              >
                Découvrir nos articles
              </a>
            </div>
          </div>
        </section>

        {/* Animal de la semaine */}
        <WeeklyAnimalBanner />

        {/* Section Articles */}
        <section id="articles" className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-green-700">
              Nos Derniers Articles
            </h2>
            <RecentPosts />
          </div>
        </section>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
