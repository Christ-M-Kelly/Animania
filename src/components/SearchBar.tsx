"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useContentPreview } from "@/src/components/TextCleaner";

interface SearchResult {
  id: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
  category: string;
  createdAt: string;
  author: {
    name: string;
  };
  content: string;
}

interface SearchBarProps {
  className?: string;
}

// Composant pour un résultat de recherche dans la dropdown
function SearchResultItem({
  result,
  query,
  onClick,
  isSelected,
}: {
  result: SearchResult;
  query: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  const preview = useContentPreview(result, 80);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="rounded bg-yellow-200 px-0.5 text-yellow-900"
        >
          {part}
        </mark>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 text-left transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
        isSelected ? "bg-gray-50" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Image miniature */}
        {result.imageUrl && (
          <div className="shrink-0">
            <Image
              src={result.imageUrl}
              alt={result.title}
              width={48}
              height={48}
              className="size-12 rounded object-cover"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          {/* Titre */}
          <h3 className="truncate text-sm font-medium text-gray-900">
            {highlightText(result.title, query)}
          </h3>

          {/* Aperçu nettoyé */}
          <p className="mt-1 line-clamp-2 text-xs text-gray-600">
            {highlightText(preview, query)}
          </p>

          {/* Métadonnées */}
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <span className="rounded bg-green-100 px-2 py-0.5 text-green-800">
              {result.category.replace("_", " ")}
            </span>
            <span>Par {result.author.name}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function SearchBar({ className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Recherche avec debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length >= 2) {
        performSearch(query);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Fermer les résultats en cliquant à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&limit=6`
      );
      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Erreur de recherche:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          router.push(`/posts/${results[selectedIndex].id}`);
          setIsOpen(false);
          setQuery("");
        } else if (query.length >= 2) {
          router.push(`/search?q=${encodeURIComponent(query)}`);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (postId: string) => {
    router.push(`/posts/${postId}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Input de recherche */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Rechercher des articles..."
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pl-10 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />

        {/* Icône de recherche */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <div className="size-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></div>
          ) : (
            <svg
              className="size-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Résultats de recherche */}
      {isOpen && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <SearchResultItem
                  key={result.id}
                  result={result}
                  query={query}
                  onClick={() => handleResultClick(result.id)}
                  isSelected={index === selectedIndex}
                />
              ))}

              {/* Voir tous les résultats */}
              <div className="mt-2 border-t border-gray-200 pt-2">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-2 text-center text-sm text-green-600 transition-colors hover:bg-green-50 hover:text-green-700"
                >
                  Voir tous les résultats pour "{query}"
                </Link>
              </div>
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <div className="mb-2 text-4xl text-gray-400">🔍</div>
              <p className="text-sm text-gray-500">
                Aucun résultat trouvé pour "{query}"
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Essayez avec d'autres mots-clés
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
