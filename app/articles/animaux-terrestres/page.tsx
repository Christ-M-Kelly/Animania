import { prisma } from "@/app/db/prisma";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TerrestrialAnimalsPage() {
  const categoryName = "TERRESTRES";

  const posts = await prisma.post.findMany({
    where: {
      category: categoryName,
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  // Rediriger si aucun article
  if (posts.length === 0) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto grow px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 rounded-lg bg-gradient-to-r from-green-600 to-green-800 p-8 text-white">
            <h1 className="mb-4 text-4xl font-bold">Animaux Terrestres</h1>
            <p className="text-xl text-green-100">
              Découvrez le monde fascinant des animaux terrestres
            </p>
            <p className="mt-2 text-green-200">
              {posts.length} article{posts.length > 1 ? "s" : ""} disponible
              {posts.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                {post.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="size-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                      Animaux Terrestres
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>

                  <h2 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900">
                    {post.title}
                  </h2>

                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Par {post.author.name}
                    </span>
                    <Link
                      href={`/posts/${post.id}`}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-green-700"
                    >
                      Lire plus
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
