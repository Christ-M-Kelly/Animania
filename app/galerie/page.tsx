import { prisma } from "@/app/db/prisma";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import GalleryClient from "@/app/galerie/GalleryClient";
import { list } from "@vercel/blob";

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
export default async function GaleriePage() {
  // Récupération des données
  const { blobs } = await list();
  const posts = await prisma.post.findMany({
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
  });

  const galleryItems = posts
    .filter(
      (post): post is typeof post & { imageUrl: string } =>
        post.imageUrl !== null
    )
    .map((post) => ({
      ...post,
      imageUrl:
        blobs.find((blob) => blob.url === post.imageUrl)?.url || post.imageUrl,
    }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <GalleryClient items={galleryItems} />
      <Footer />
    </div>
  );
}
