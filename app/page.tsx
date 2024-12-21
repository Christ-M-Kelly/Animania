import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { prisma } from "./db/prisma";
import Link from "next/link";
import WeeklyAnimalBanner from "@/src/components/ui/WeeklyAnimalBanner";

export default async function Home() {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-green-800 py-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <img
              src="/images/perro.jpg"
              alt="Animaux sauvages"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Animania
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
              Explorez le monde fascinant des animaux à travers des articles
              passionnants, des photos exceptionnelles et une communauté
              engagée.
            </p>
            <p className="text-lg md:text-xl text-green-200 italic">
              "Parce que chaque animal mérite d'être compris et protégé"
            </p>
            <div className="mt-10">
              <a
                href="#articles"
                className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
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
            <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
              Nos Derniers Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link href={`/posts/${post.id}`} key={post.id}>
                  <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer">
                    <div className="aspect-[16/9] relative overflow-hidden bg-gray-100 p-4 flex items-center justify-center">
                      <img
                        src={
                          post.imageUrl || "https://via.placeholder.com/300x180"
                        }
                        alt={post.title}
                        className="max-h-[200px] w-auto object-contain"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-green-600 font-semibold text-sm uppercase">
                          {new Date(post.createdAt).toLocaleDateString(
                            "fr-FR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <div className="text-gray-600 text-sm">
                          Par {post.author.name}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-green-500 mb-3 hover:text-green-600 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <div
                        className="prose max-w-none text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
