"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const { user, loading } = useAuth();
  const router = useRouter();
  const [likes, setLikes] = useState(initialLikes);
  const [views, setViews] = useState(initialViews);
  const [isLiked, setIsLiked] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Incrémenter les vues au chargement (si authentifié)
  useEffect(() => {
    const incrementView = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/posts/${postId}/view`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (!data.alreadyViewed) {
            setViews(data.views);
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'incrémentation des vues:", error);
      }
    };

    incrementView();
  }, [postId, user]);

  // Vérifier si l'utilisateur a liké
  useEffect(() => {
    const checkLiked = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/posts/${postId}/like`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsLiked(data.liked);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du like:", error);
      }
    };

    checkLiked();
  }, [postId, user]);

  const handleLike = async () => {
    if (!user) {
      if (
        confirm(
          "Vous devez être connecté pour aimer un article. Voulez-vous vous connecter ?"
        )
      ) {
        router.push("/connexion");
      }
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
        setIsLiked(data.liked);
      }
    } catch (error) {
      console.error("Erreur lors du like:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="mt-8 flex items-center gap-6 border-t border-gray-200 pt-6">
      {/* Bouton Like */}
      <button
        onClick={handleLike}
        disabled={actionLoading || loading}
        className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
          isLiked
            ? "bg-red-100 text-red-600 hover:bg-red-200"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        } ${actionLoading || loading ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <svg
          className={`size-5 ${isLiked ? "fill-current" : ""}`}
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="font-semibold">{likes}</span>
      </button>

      {/* Compteur de vues */}
      <div className="flex items-center gap-2 text-gray-600">
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span className="font-semibold">{views}</span>
      </div>

      {!user && (
        <p className="text-sm text-gray-500">
          Connectez-vous pour voir et aimer les articles
        </p>
      )}
    </div>
  );
}
