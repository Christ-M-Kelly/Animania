import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  views: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  variant?: "default" | "featured";
}

const categoryColors: Record<string, string> = {
  TERRESTRES: "bg-green-100 text-green-800",
  MARINS: "bg-blue-100 text-blue-800",
  AERIENS: "bg-sky-100 text-sky-800",
  EAU_DOUCE: "bg-teal-100 text-teal-800",
 
};

const categoryLabels: Record<string, string> = {
  TERRESTRES: "Terrestres",
  MARINS: "Marins",
  AERIENS: "Aériens",
  EAU_DOUCE: "Eau Douce",
};

export function ArticleCard({
  id,
  title,
  excerpt,
  imageUrl,
  category,
  views,
  createdAt,
  author,
  variant = "default",
}: ArticleCardProps) {
  const cardClasses =
    variant === "featured"
      ? "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl md:flex-row"
      : "group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1";

  const imageHeight = variant === "featured" ? "h-64 md:h-auto" : "h-48";

  // Fonction pour formater la date en toute sécurité
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Date inconnue";
      }
      return formatDistanceToNow(date, {
        addSuffix: true,
        locale: fr,
      });
    } catch (error) {
      return "Date inconnue";
    }
  };

  // Valeurs par défaut pour l'auteur
  const authorName = author?.name || "Auteur inconnu";
  const authorInitial = authorName.charAt(0).toUpperCase();

  // Valeur par défaut pour les vues
  const viewCount = views ?? 0;

  return (
    <article className={cardClasses}>
      {/* Image */}
      {imageUrl && (
        <Link
          href={`/posts/${id}`}
          className={variant === "featured" ? "md:w-1/2" : ""}
        >
          <div className={`relative ${imageHeight} w-full overflow-hidden`}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes={
                variant === "featured"
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
        </Link>
      )}

      {/* Contenu */}
      <div
        className={`flex flex-1 flex-col p-6 ${
          variant === "featured" ? "md:w-1/2" : ""
        }`}
      >
        {/* Catégorie et date */}
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              categoryColors[category] || "bg-gray-100 text-gray-800"
            }`}
          >
            {categoryLabels[category] || category}
          </span>
          <span className="text-xs text-gray-500">{formatDate(createdAt)}</span>
        </div>

        {/* Titre */}
        <Link href={`/posts/${id}`}>
          <h3
            className={`mb-3 font-bold text-gray-900 transition-colors group-hover:text-blue-600 ${
              variant === "featured" ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {title}
          </h3>
        </Link>

        {/* Extrait */}
        <p className="mb-4 line-clamp-3 flex-1 text-gray-600">{excerpt}</p>

        {/* Footer : Auteur et Stats */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-sm font-semibold text-white">
              {authorInitial}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {authorName}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {viewCount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Bouton Lire plus */}
        <Link
          href={`/posts/${id}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all hover:gap-3 hover:text-blue-700"
        >
          Lire la suite
          <svg
            className="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default ArticleCard;
