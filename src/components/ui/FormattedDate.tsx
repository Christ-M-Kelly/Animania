"use client";

interface FormattedDateProps {
  date: string;
}

export default function FormattedDate({ date }: FormattedDateProps) {
  return (
    <span>
      {new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  );
}
