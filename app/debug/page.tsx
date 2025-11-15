import { prisma } from "@/app/db/prisma";

export default async function DebugPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true } },
    },
    take: 3,
  });

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-bold">
        🔍 Debug - Contenu des articles
      </h1>

      {posts.map((post) => (
        <div key={post.id} className="mb-6 rounded border border-gray-300 p-4">
          <h2 className="mb-2 text-lg font-bold">{post.title}</h2>

          <div className="mb-4">
            <strong>Excerpt:</strong>
            <pre className="overflow-x-auto bg-gray-100 p-2 text-sm">
              {JSON.stringify(post.excerpt, null, 2)}
            </pre>
          </div>

          <div className="mb-4">
            <strong>Content (premiers 200 chars):</strong>
            <pre className="overflow-x-auto bg-gray-100 p-2 text-sm">
              {JSON.stringify(post.content.substring(0, 200), null, 2)}
            </pre>
          </div>

          <div className="mb-4">
            <strong>Content nettoyé:</strong>
            <div className="border-l-4 border-blue-400 bg-blue-50 p-2">
              {post.content
                .replace(/<[^>]*>/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .substring(0, 150)}
              ...
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
