import { prisma } from "@/app/db/prisma";
import ArticleCard from "@/src/components/ui/ArticleCard";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { AnimalCategory } from "@prisma/client";

export default async function TerrestrialAnimalsPage() {
  const posts = await prisma.post.findMany({
    where: {
      category: AnimalCategory.AERIENS,
      published: true,
    },
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
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-green-600 mb-8">
            Articles sur les Animaux Aériens
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ArticleCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author.name}
                date={post.createdAt}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-center text-gray-600 mt-8">
              Aucun article sur les animaux aériens pour le moment.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
