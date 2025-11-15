"use client";

import {
  faFacebook,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBookmark,
  faCopy,
  faEdit,
  faHeart,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface PostInteractionsProps {
  postId: string;
  authorId: string;
  initialLikes: number;
}

interface User {
  id: string;
  name: string;
  role: "USER" | "ADMIN";
}

interface Message {
  type: "success" | "error" | "info";
  text: string;
}

export default function PostInteractions({
  postId,
  authorId,
  initialLikes,
}: PostInteractionsProps) {
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    async function checkAuth() {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await fetch("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSessionUser(data.user);
        }
      } catch (error) {
        console.error("Erreur d'authentification:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  // Gestion des messages
  const showMessage = useCallback(
    (type: Message["type"], text: string, duration = 3000) => {
      setMessage({ type, text });
      setTimeout(() => setMessage(null), duration);
    },
    []
  );

  // Actions d'interaction
  const handleLike = useCallback(() => {
    setLiked((prev) => !prev);
    setLikes((prev) => prev + (liked ? -1 : 1));
    showMessage("success", liked ? "Like retiré" : "Article liké !", 1500);
  }, [liked, showMessage]);

  const handleBookmark = useCallback(() => {
    setIsBookmarked((prev) => !prev);
    showMessage(
      "success",
      isBookmarked ? "Retiré des favoris" : "Ajouté aux favoris",
      1500
    );
  }, [isBookmarked, showMessage]);

  const handleShare = useCallback(
    (platform: "facebook" | "twitter" | "whatsapp" | "copy") => {
      const url = `${window.location.origin}/posts/${postId}`;
      const title = document.title;

      const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(
          `${title} - ${url}`
        )}`,
      };

      if (platform === "copy") {
        navigator.clipboard
          .writeText(url)
          .then(() => {
            showMessage("success", "Lien copié !", 1500);
          })
          .catch(() => {
            showMessage("error", "Erreur lors de la copie");
          });
      } else {
        window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
        showMessage("info", "Partage ouvert dans un nouvel onglet", 1500);
      }

      setIsShareModalOpen(false);
    },
    [postId, showMessage]
  );

  const handleDelete = useCallback(async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?"))
      return;

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        showMessage("success", "Article supprimé avec succès");
        setTimeout(() => router.push("/profil"), 1500);
      } else {
        const errorData = await response.json().catch(() => ({}));
        showMessage(
          "error",
          errorData.error || "Erreur lors de la suppression"
        );
      }
    } catch (error) {
      console.error("Erreur:", error);
      showMessage("error", "Erreur de connexion");
    }
  }, [postId, router, showMessage]);

  // Fermer le modal en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = () => setIsShareModalOpen(false);

    if (isShareModalOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isShareModalOpen]);

  const isAuthor = sessionUser?.id === authorId;
  const isAdmin = sessionUser?.role === "ADMIN";

  return (
    <>
      {/* Messages de notification */}
      {message && (
        <div
          className={`fixed right-4 top-20 z-50 max-w-sm transition-all duration-300${
            message ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <div
            className={`rounded-lg border-l-4 p-4 shadow-2xl ${
              message.type === "error"
                ? "border-red-500 bg-red-50 text-red-800"
                : message.type === "success"
                ? "border-green-500 bg-green-50 text-green-800"
                : "border-blue-500 bg-blue-50 text-blue-800"
            }`}
          >
            <div className="flex items-start">
              <div className="flex-1">
                <p className="font-medium">{message.text}</p>
              </div>
              <button
                onClick={() => setMessage(null)}
                className="ml-3 text-gray-500 transition-colors hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section Actions */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Boutons d'interaction */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 rounded-xl px-6 py-3 font-medium transition-all duration-300 hover:scale-105${
                liked
                  ? "border border-red-300 bg-gradient-to-r from-red-100 to-amber-100 text-red-700 shadow-lg"
                  : "border border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={`size-5 transition-all duration-300 ${
                  liked ? "text-red-600" : ""
                }`}
              />
              <span>{likes} J'aime</span>
            </button>

            <button
              onClick={handleBookmark}
              className={`flex items-center space-x-2 rounded-xl px-6 py-3 font-medium transition-all duration-300 hover:scale-105${
                isBookmarked
                  ? "border border-amber-300 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 shadow-lg"
                  : "border border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                className={`size-5 transition-all duration-300 ${
                  isBookmarked ? "text-amber-600" : ""
                }`}
              />
              <span className="hidden sm:inline">Favoris</span>
            </button>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShareModalOpen(!isShareModalOpen);
                }}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <FontAwesomeIcon icon={faShare} className="size-5" />
                <span>Partager</span>
              </button>

              {isShareModalOpen && (
                <div
                  className="absolute right-0 top-full z-20 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h4 className="mb-3 font-semibold text-gray-900">
                    Partager cet article
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleShare("facebook")}
                      className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="size-5 text-blue-600"
                      />
                      <span className="font-medium">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-sky-50 hover:text-sky-600"
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="size-5 text-sky-500"
                      />
                      <span className="font-medium">Twitter (X)</span>
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-green-50 hover:text-green-600"
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        className="size-5 text-green-500"
                      />
                      <span className="font-medium">WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleShare("copy")}
                      className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                    >
                      <FontAwesomeIcon
                        icon={faCopy}
                        className="size-5 text-gray-600"
                      />
                      <span className="font-medium">Copier le lien</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Boutons d'administration */}
          {!isLoading && (isAuthor || isAdmin) && (
            <div className="flex items-center space-x-3">
              <Link
                href={`/profil/formulaire_post?edit=${postId}`}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <FontAwesomeIcon icon={faEdit} className="size-5" />
                <span className="hidden sm:inline">Modifier</span>
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <FontAwesomeIcon icon={faTrash} className="size-5" />
                <span className="hidden sm:inline">Supprimer</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
