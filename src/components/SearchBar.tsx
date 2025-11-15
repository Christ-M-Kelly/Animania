"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  imageUrl: string | null;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Fermer les suggestions si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Récupérer les suggestions en temps réel
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.posts.slice(0, 5)); // Limiter à 5 suggestions
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: attendre 300ms après la dernière saisie
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (postId: string) => {
    setShowSuggestions(false);
    setQuery("");
    router.push(`/articles/${postId}`);
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      TERRESTRES: "🦁",
      MARINS: "🐋",
      AERIENS: "🦅",
      EAU_DOUCE: "🐸",
    };
    return emojis[category] || "📄";
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher des articles..."
          className="w-full rounded-full border-2 border-gray-300 px-6 py-3 pr-12 text-gray-900 transition-all duration-300 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
        >
          <svg
            className="size-5"
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
        </button>
      </form>

      {/* Liste des suggestions */}
      {showSuggestions && (suggestions.length > 0 || loading) && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-xl">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <div className="size-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ul className="max-h-96 overflow-y-auto">
              {suggestions.map((post) => (
                <li
                  key={post.id}
                  onClick={() => handleSuggestionClick(post.id)}
                  className="flex cursor-pointer items-center gap-3 border-b border-gray-100 p-3 transition-colors last:border-b-0 hover:bg-gray-50"
                >
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="size-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex size-12 items-center justify-center rounded-lg bg-gray-100">
                      <span className="text-2xl">
                        {getCategoryEmoji(post.category)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{post.title}</p>
                    <p className="text-sm text-gray-500">
                      {getCategoryEmoji(post.category)} {post.category}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
