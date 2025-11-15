import { notFound } from "next/navigation";
import { prisma } from "@/app/db/prisma";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import Image from "next/image";
import FormattedDate from "@/src/components/ui/FormattedDate";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Fonction pour valider un ObjectId MongoDB
function isValidObjectId(id: string): boolean {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
}

// Métadonnées dynamiques
export async function generateMetadata({ params }: PageProps) {
  try {
    const { id } = await params;

    if (!id || !isValidObjectId(id)) {
      return {
        title: "Article non trouvé - Animania",
        description: "L'article que vous recherchez n'existe pas.",
      };
    }

    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        title: true,
        excerpt: true,
        imageUrl: true,
        author: { select: { name: true } },
      },
    });

    if (!post) {
      return {
        title: "Article non trouvé - Animania",
        description: "L'article que vous recherchez n'existe pas.",
      };
    }

    return {
      title: `${post.title} - Animania`,
      description: post.excerpt || `Article par ${post.author.name}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Erreur - Animania",
      description: "Une erreur est survenue lors du chargement de l'article.",
    };
  }
}

export default async function PostPage({ params }: PageProps) {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string") {
      notFound();
    }

    if (!isValidObjectId(id)) {
      notFound();
    }

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!post) {
      notFound();
    }

    // Calculer le temps de lecture
    const readingTime = Math.ceil(
      post.content
        .replace(/<[^>]*>/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 0).length / 200
    );

    return (
      <div className="flex min-h-screen flex-col bg-green-50">
        <Header />

        <main className="grow">
          <div className="mx-auto max-w-4xl px-4 py-12">
            {/* Navigation de retour */}
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Retour à l'accueil
            </Link>

            <article className="overflow-hidden rounded-lg bg-white shadow-lg">
              {/* Image de couverture */}
              {post.imageUrl && (
                <div className="flex w-full justify-center bg-gray-100 p-8">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="max-h-[400px] w-auto rounded-lg object-contain"
                    priority
                  />
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Badge de catégorie */}
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {post.category.replace("_", " ")}
                  </span>
                </div>

                {/* Titre */}
                <h1 className="mb-4 text-3xl font-bold text-green-500 sm:text-4xl">
                  {post.title}
                </h1>

                {/* Métadonnées */}
                <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <span>👤</span>
                    <span>{post.author.name}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>🕒</span>
                    <Suspense fallback={<span>Chargement...</span>}>
                      <FormattedDate date={post.createdAt.toISOString()} />
                    </Suspense>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📖</span>
                    <span>{readingTime} min de lecture</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>👁️</span>
                    <span>{post.views || 0} vues</span>
                  </span>
                </div>

                {/* Séparateur entre métadonnées et contenu */}
                <div className="mb-8 border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="h-px w-12 bg-gray-300"></div>
                      <span className="text-sm font-medium">📖</span>
                      <div className="h-px w-12 bg-gray-300"></div>
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div
                  className="prose prose-lg prose-green max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-p:leading-relaxed prose-p:text-gray-700
                    prose-a:text-green-600 hover:prose-a:text-green-700
                    prose-blockquote:border-l-green-500 prose-blockquote:bg-green-50
                    prose-img:rounded-lg prose-img:shadow-md"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>

            {/* Section Commentaires temporairement désactivée */}
            <div className="mt-8 overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="p-6 text-center sm:p-8">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  💬 Commentaires
                </h3>
                <div className="rounded-lg bg-gray-50 p-8">
                  <div className="mb-4 text-6xl">🚧</div>
                  <p className="text-gray-600">
                    La section commentaires est en cours de configuration.
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Elle sera bientôt disponible !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    notFound();
  }
}
