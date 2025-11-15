"use client";

interface FormattedDateProps {
  date: string;
  format?: "full" | "short" | "relative";
}

export default function FormattedDate({
  date,
  format = "full",
}: FormattedDateProps) {
  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return <span>Date invalide</span>;
    }

    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - dateObj.getTime()) / 1000
    );

    if (format === "relative") {
      if (diffInSeconds < 60) return <span>Il y a quelques secondes</span>;
      if (diffInSeconds < 3600)
        return <span>Il y a {Math.floor(diffInSeconds / 60)} min</span>;
      if (diffInSeconds < 86400)
        return <span>Il y a {Math.floor(diffInSeconds / 3600)} h</span>;
      if (diffInSeconds < 604800)
        return <span>Il y a {Math.floor(diffInSeconds / 86400)} j</span>;
    }

    if (format === "short") {
      return (
        <time dateTime={dateObj.toISOString()}>
          {dateObj.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      );
    }

    // Format complet par défaut
    return (
      <time dateTime={dateObj.toISOString()}>
        {dateObj.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </time>
    );
  } catch (error) {
    console.error("Error formatting date:", error);
    return <span>Date invalide</span>;
  }
}
