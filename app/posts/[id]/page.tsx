import { prisma } from "@/app/db/prisma";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import FormattedDate from "@/src/components/ui/FormattedDate";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto grow px-4 py-8">
        <article className="mx-auto max-w-4xl">
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span>👤</span>
                <span>Par {post.author.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🕒</span>
                <FormattedDate date={post.createdAt} />
              </div>
            </div>
          </header>

          {post.imageUrl && (
            <div className="mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="h-64 w-full rounded-lg object-cover"
              />
            </div>
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
