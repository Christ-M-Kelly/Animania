import { Suspense } from "react";
import { list } from "@vercel/blob";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import GalleryClient from "./GalleryClient";

// Types
export type GalleryItem = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  author: {
    name: string;
  };
};

// Page serveur
async function GalleryContent() {
  try {
    // Import dynamique pour éviter les erreurs de build
    const { prisma } = await import("@/app/db/prisma");

    const [blobs, posts] = await Promise.all([
      list().catch(() => ({ blobs: [] })),
      prisma.post
        .findMany({
          where: {
            imageUrl: {
              not: null,
            },
          },
          select: {
            id: true,
            title: true,
            imageUrl: true,
            category: true,
            author: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        })
        .catch(() => []),
    ]);

    // Filtrer les posts avec imageUrl non null et mapper correctement
    const galleryItems = posts
      .filter(
        (post): post is typeof post & { imageUrl: string } =>
          post.imageUrl !== null
      )
      .map((post) => ({
        ...post,
        imageUrl:
          blobs.blobs?.find((blob) => blob.url === post.imageUrl)?.url ||
          post.imageUrl,
      }));

    return <GalleryClient items={galleryItems} />;
  } catch (error) {
    console.error("Erreur galerie:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">Galerie</h1>
          <p className="text-gray-600">
            Impossible de charger la galerie pour le moment.
          </p>
        </div>
      </div>
    );
  }
}

export default function GaleriePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Suspense
        fallback={
          <div className="container mx-auto flex-1 px-4 py-8">
            <div className="animate-pulse">
              <div className="mx-auto mb-8 h-8 w-48 rounded bg-gray-200"></div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 rounded bg-gray-200"></div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <GalleryContent />
      </Suspense>
      <Footer />
    </div>
  );
}
