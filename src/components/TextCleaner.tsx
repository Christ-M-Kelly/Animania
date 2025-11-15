"use client";

import { useMemo } from "react";

// Export des fonctions utilitaires
export function cleanHtml(content: string): string {
  if (!content) return "";

  return (
    content
      // Supprime TOUTES les balises HTML
      .replace(/<[^>]*>/g, " ")
      // Supprime les entités HTML
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&lsquo;/g, "'")
      .replace(/&rdquo;/g, '"')
      .replace(/&ldquo;/g, '"')
      .replace(/&hellip;/g, "...")
      .replace(/&ndash;/g, "-")
      .replace(/&mdash;/g, "—")
      // Normalise les espaces
      .replace(/\s+/g, " ")
      .replace(/\n+/g, " ")
      .replace(/\r+/g, " ")
      .replace(/\t+/g, " ")
      .trim()
  );
}

export function truncateText(text: string, maxLength: number): string {
  const cleanedText = cleanHtml(text);

  if (cleanedText.length <= maxLength) {
    return cleanedText;
  }

  return cleanedText.substring(0, maxLength).trim() + "...";
}

export function getContentPreview(
  post: { excerpt?: string; content: string },
  maxLength: number = 150
): string {
  if (post.excerpt) {
    return truncateText(post.excerpt, maxLength);
  }

  return truncateText(post.content, maxLength);
}

// Interfaces
interface TextCleanerProps {
  content: string;
  maxLength?: number;
  className?: string;
  showRaw?: boolean;
}

interface ContentPreviewProps {
  post: { excerpt?: string; content: string };
  maxLength?: number;
  className?: string;
  showWordCount?: boolean;
}

// Composant principal TextCleaner
export function TextCleaner({
  content,
  maxLength,
  className = "",
  showRaw = false,
}: TextCleanerProps) {
  const cleanedText = useMemo(() => {
    if (!content) return "";

    if (maxLength) {
      return truncateText(content, maxLength);
    }

    return cleanHtml(content);
  }, [content, maxLength]);

  const wordCount = useMemo(() => {
    return cleanedText.split(" ").filter((word) => word.length > 0).length;
  }, [cleanedText]);

  if (showRaw) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Contenu nettoyé */}
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <h4 className="mb-2 text-sm font-semibold text-green-800">
            📝 Contenu nettoyé ({wordCount} mots)
          </h4>
          <p className="text-sm leading-relaxed text-gray-700">
            {cleanedText || (
              <span className="italic text-gray-400">Aucun contenu</span>
            )}
          </p>
        </div>

        {/* Contenu original */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h4 className="mb-2 text-sm font-semibold text-gray-800">
            🔍 Contenu original
          </h4>
          <pre className="max-h-32 overflow-y-auto whitespace-pre-wrap break-words text-xs text-gray-600">
            {content || (
              <span className="italic text-gray-400">Aucun contenu</span>
            )}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {cleanedText || (
        <span className="italic text-gray-400">Aucun contenu disponible</span>
      )}
    </div>
  );
}

// Composant pour aperçu de contenu de post
export function ContentPreview({
  post,
  maxLength = 150,
  className = "",
  showWordCount = false,
}: ContentPreviewProps) {
  const preview = useMemo(() => {
    return getContentPreview(post, maxLength);
  }, [post, maxLength]);

  const wordCount = useMemo(() => {
    if (!showWordCount) return 0;
    return preview.split(" ").filter((word) => word.length > 0).length;
  }, [preview, showWordCount]);

  return (
    <div className={className}>
      <p className="leading-relaxed text-gray-600">
        {preview || (
          <span className="italic text-gray-400">Aucun aperçu disponible</span>
        )}
      </p>
      {showWordCount && (
        <p className="mt-1 text-xs text-gray-400">
          {wordCount} mot{wordCount !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

// Hook personnalisé pour nettoyage de texte
export function useTextCleaner(content: string, maxLength?: number) {
  return useMemo(() => {
    if (!content) return "";

    if (maxLength) {
      return truncateText(content, maxLength);
    }

    return cleanHtml(content);
  }, [content, maxLength]);
}

// Hook pour aperçu de contenu
export function useContentPreview(
  post: { excerpt?: string; content: string },
  maxLength: number = 150
) {
  return useMemo(() => {
    return getContentPreview(post, maxLength);
  }, [post, maxLength]);
}

// Composant de démo/test
export function TextCleanerDemo() {
  const sampleHtml = `
    <p>Voici un <strong>exemple</strong> de contenu HTML avec des &nbsp;espaces bizarres&nbsp;</p>
    <div>Et des <em>balises</em> diverses &amp; variées</div>
    <p>Huuuuuuhuuuu</p>
    <script>alert('test')</script>
  `;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          🧹 Démo TextCleaner
        </h1>
        <p className="text-gray-600">
          Test des fonctions de nettoyage de contenu HTML
        </p>
      </div>

      {/* Démo basique */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Nettoyage basique</h2>
        <TextCleaner
          content={sampleHtml}
          className="rounded border border-blue-200 bg-blue-50 p-4"
        />
      </div>

      {/* Démo avec troncature */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">
          Avec troncature (50 caractères)
        </h2>
        <TextCleaner
          content={sampleHtml}
          maxLength={50}
          className="rounded border border-yellow-200 bg-yellow-50 p-4"
        />
      </div>

      {/* Démo comparaison */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Comparaison avant/après</h2>
        <TextCleaner content={sampleHtml} showRaw={true} />
      </div>

      {/* Démo ContentPreview */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Aperçu de post</h2>
        <ContentPreview
          post={{
            excerpt: "Ceci est un extrait propre",
            content: sampleHtml,
          }}
          maxLength={100}
          showWordCount={true}
          className="rounded border border-green-200 bg-green-50 p-4"
        />
      </div>
    </div>
  );
}

export default TextCleaner;
