"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PostStatsProps {
  postId: string;
  initialLikes: number;
  initialViews: number;
}

export default function PostStats({
  postId,
  initialLikes,
  initialViews,
}: PostStatsProps) {
  // Correction : utiliser getUser() au lieu de user
  const auth = useAuth();
  const currentUser = auth.getUser();
  const isAuthenticated = auth.isAuthenticated();

  const router = useRouter();
  const [likes, setLikes] = useState(initialLikes);
  const [views] = useState(initialViews);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (!isAuthenticated) {
      router.push("/connexion");
      return;
    }

    if (isLiking) return;

    try {
      setIsLiking(true);
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.getToken()}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
      }
    } catch (error) {
      console.error("Erreur lors du like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <button
        onClick={handleLike}
        disabled={isLiking}
        className={`flex items-center gap-1 transition-colors ${
          isLiking ? "cursor-not-allowed opacity-50" : "hover:text-red-600"
        }`}
      >
        <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        <span>{likes}</span>
      </button>

      <div className="flex items-center gap-1">
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
        <span>{views} vues</span>
      </div>

      {currentUser && (
        <div className="text-xs">Connecté en tant que {currentUser.name}</div>
      )}
    </div>
  );
}
