import { prisma } from "@/app/db/prisma";
import Link from "next/link";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";

async function getArticles() {
  const articles = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });
  return articles;
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative bg-gradient-to-r from-green-600 to-green-800 py-16">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <img
              src="/images/tonka.jpg"
              alt="Animaux sauvages"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tous nos Articles
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Découvrez notre collection complète d'articles sur le monde
              fascinant des animaux
            </p>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  href={`/posts/${article.id}`}
                  key={article.id}
                  className="h-[375px] block"
                >
                  <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer h-full">
                    <div className="aspect-[16/9] relative overflow-hidden bg-gray-100 p-4 flex items-center justify-center">
                      <img
                        src={
                          article.imageUrl ||
                          "https://via.placeholder.com/300x180"
                        }
                        alt={article.title}
                        className="max-h-[200px] w-auto object-contain"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-green-600 font-semibold text-sm uppercase">
                          {new Date(article.createdAt).toLocaleDateString(
                            "fr-FR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <div className="text-gray-600 text-sm">
                          Par {article.author.name}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-green-500 mb-3 hover:text-green-600 transition-colors duration-300">
                        {article.title}
                      </h3>
                      <div
                        className="prose max-w-none text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: article.content }}
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
