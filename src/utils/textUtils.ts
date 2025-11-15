/**
 * Nettoie le contenu HTML et les entités
 */
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

/**
 * Tronque le texte à une longueur donnée
 */
export function truncateText(text: string, maxLength: number): string {
  const cleanedText = cleanHtml(text);

  if (cleanedText.length <= maxLength) {
    return cleanedText;
  }

  return cleanedText.substring(0, maxLength).trim() + "...";
}

/**
 * Extrait un aperçu propre du contenu
 */
export function getContentPreview(
  post: { excerpt?: string; content: string },
  maxLength: number = 150
): string {
  if (post.excerpt) {
    return truncateText(post.excerpt, maxLength);
  }

  return truncateText(post.content, maxLength);
}
