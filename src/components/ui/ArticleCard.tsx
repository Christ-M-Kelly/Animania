import Link from "next/link";
import Image from "next/image";
import FormattedDate from "@/src/components/ui/FormattedDate";

interface ArticleCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  imageUrl: string | null;
}

export default function ArticleCard({
  id,
  title,
  content,
  author,
  date,
  imageUrl,
}: ArticleCardProps) {
  // Extraire un extrait du contenu (premiers 150 caractères)
  const excerpt = content.replace(/<[^>]*>/g, "").slice(0, 150) + "...";

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/posts/${id}`}>
        <div className="relative h-48 w-full bg-gray-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm mb-4">{excerpt}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{author}</span>
            <FormattedDate date={date.toISOString()} />
          </div>
        </div>
      </Link>
    </article>
  );
}
