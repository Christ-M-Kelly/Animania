import { notFound } from "next/navigation";
import { prisma } from "@/app/db/prisma";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import CommentSection from "@/src/components/CommentSection";
import FormattedDate from "@/src/components/ui/FormattedDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock } from "@fortawesome/free-solid-svg-icons";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PageProps) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        comments: {
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
        },
      },
    });

    if (!post) {
      notFound();
    }

    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50">
          <article className="max-w-4xl mx-auto px-4 py-12">
            <Link
              href="/articles"
              className="text-green-600 hover:text-green-700 mb-6 inline-flex items-center gap-2"
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
              Retour aux articles
            </Link>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {post.imageUrl && (
                <div className="w-full flex justify-center bg-gray-100 p-8">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="max-h-[400px] w-auto object-contain"
                  />
                </div>
              )}

              <div className="p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-green-500 mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center text-gray-600 mb-6">
                  <span className="mr-4 flex items-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mr-2 w-4 h-4 !text-sm"
                      style={{ fontSize: "14px" }}
                    />
                    {post.author.name}
                  </span>
                  <span className="flex items-center">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="mr-2 w-4 h-4 !text-sm"
                      style={{ fontSize: "14px" }}
                    />
                    <FormattedDate date={post.createdAt.toISOString()} />
                  </span>
                </div>

                <div
                  className="prose prose-green max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
            <div className="border-t mt-8">
              <div className="p-6 sm:p-8">
                <CommentSection
                  postId={post.id}
                  initialComments={post.comments.map((comment) => ({
                    ...comment,
                    createdAt: comment.createdAt.toISOString(),
                  }))}
                />
              </div>
            </div>
          </article>
        </main>
        <Footer className="mt-auto" />
      </div>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    notFound();
  }
}
