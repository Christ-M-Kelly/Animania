"use client";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiEdit,
  FiEye,
  FiLogOut,
  FiPlusCircle,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilPage() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<Post[]>([]);
  const [draftPosts, setDraftPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<"published" | "drafts">(
    "published"
  );
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
          console.log("❌ Aucun token trouvé, redirection vers connexion");
          router.push("/connexion");
          return;
        }

        console.log("🔍 Token trouvé, vérification...");

        const response = await fetch("/api/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log("❌ Token invalide, redirection vers connexion");
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          router.push("/connexion");
          return;
        }

        const userData = await response.json();
        console.log("✅ Utilisateur authentifié:", userData.user.name);
        setUser(userData.user);
        setLoading(false);

        // Charger les posts de l'utilisateur
        loadUserPosts(token);
      } catch (error) {
        console.error("❌ Erreur vérification auth:", error);
        setError("Erreur de vérification de l'authentification");
        setLoading(false);
        setTimeout(() => {
          router.push("/connexion");
        }, 2000);
      }
    };

    checkAuth();
  }, [router]);

  const loadUserPosts = async (token: string) => {
    setLoadingPosts(true);
    try {
      const response = await fetch("/api/posts/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const publishedPosts = data.posts || [];
        const draftPosts = data.drafts || [];

        setPublishedPosts(publishedPosts);
        setDraftPosts(draftPosts);

        console.log("📊 Posts chargés:", {
          published: publishedPosts.length,
          drafts: draftPosts.length,
        });
      } else {
        console.error("Erreur lors du chargement des posts");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const deletePost = async (postId: string, isDraft: boolean = false) => {
    const itemType = isDraft ? "brouillon" : "article";

    if (!confirm(`Êtes-vous sûr de vouloir supprimer cet ${itemType} ?`)) {
      return;
    }

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      const apiUrl = isDraft ? `/api/drafts/${postId}` : `/api/posts/${postId}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        loadUserPosts(token!);
        setMessage({
          type: "success",
          text: `${
            itemType.charAt(0).toUpperCase() + itemType.slice(1)
          } supprimé avec succès`,
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        let errorMessage = `Erreur lors de la suppression du ${itemType}`;
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          }
        } catch (parseError) {
          errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        }

        setMessage({
          type: "error",
          text: errorMessage,
        });
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error) {
      console.error("❌ Erreur lors de la suppression:", error);
      setMessage({
        type: "error",
        text: `Erreur de connexion lors de la suppression du ${itemType}`,
      });
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const editPost = (postId: string) => {
    router.push(`/profil/formulaire_post?edit=${postId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    router.push("/connexion");
  };

  const publishDraft = async (draftId: string) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      const response = await fetch(`/api/drafts/${draftId}/publish`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        loadUserPosts(token!);
        setMessage({ type: "success", text: "Brouillon publié avec succès" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        const errorData = await response.json();
        setMessage({
          type: "error",
          text: errorData.error || "Erreur lors de la publication",
        });
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error) {
      console.error("Erreur lors de la publication:", error);
      setMessage({ type: "error", text: "Erreur lors de la publication" });
      setTimeout(() => setMessage(null), 5000);
    }
  };

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-green-600"></div>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <div className="text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <p className="text-gray-600">Redirection vers la connexion...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Messages de notification */}
      {message && (
        <div
          className={`fixed right-4 top-4 z-50 max-w-sm rounded-lg p-4 shadow-lg ${
            message.type === "error"
              ? "border-l-4 border-red-700 bg-red-500 text-white"
              : "border-l-4 border-green-700 bg-green-500 text-white"
          }`}
        >
          <div className="flex items-center">
            <div className="flex-1">
              <p className="font-medium">{message.text}</p>
            </div>
            <button
              onClick={() => setMessage(null)}
              className="ml-2 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Design moderne adapté */}
      <main className="min-h-screen grow bg-green-50 dark:bg-gray-900">
        <div className="container mx-auto p-4 py-12 md:p-8">
          {/* En-tête profil moderne */}
          <header className="mb-10 flex flex-col items-center justify-between border-b border-green-200 pb-8 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex size-20 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                <FiUser size={36} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-green-800 dark:text-green-100">
                  Bonjour, {user.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Membre depuis{" "}
                  {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 flex items-center space-x-2 rounded-xl bg-red-600 px-4 py-2 text-white shadow-md transition-colors duration-200 hover:bg-red-700 md:mt-0"
            >
              <FiLogOut />
              <span>Déconnexion</span>
            </button>
          </header>

          {/* Tableau de bord contributeur */}
          <section className="mb-10 rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <h2 className="mb-6 text-xl font-semibold text-green-700 dark:text-green-200">
              Tableau de bord Contributeur
            </h2>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              {/* Bouton CTA principal en AMBRE */}
              <button
                onClick={() => router.push("/profil/formulaire_post")}
                className="flex-1 rounded-xl bg-amber-600 p-6 text-white shadow-lg transition-all duration-300 hover:bg-amber-700 md:p-8"
              >
                <div className="flex items-center space-x-3">
                  <FiPlusCircle size={24} />
                  <span className="text-lg font-medium">
                    Créer un nouvel article
                  </span>
                </div>
                <p className="mt-1 text-sm opacity-90">
                  Commencez à rédiger et partagez votre expertise animale.
                </p>
              </button>

              <div className="flex-1 rounded-xl border border-green-200 bg-green-50 p-6 shadow-lg md:p-8 dark:border-gray-700 dark:bg-gray-700">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-100">
                  {publishedPosts.length + draftPosts.length} Articles
                </h3>
                <p className="text-green-600 dark:text-green-300">
                  {publishedPosts.length} publiés / {draftPosts.length} en
                  brouillon
                </p>
              </div>
            </div>
          </section>

          {/* Section articles avec onglets */}
          <section className="rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-semibold text-green-700 dark:text-green-200">
              Mes Articles Rédigés
            </h2>

            {/* Onglets */}
            <div className="mb-6 flex space-x-4">
              <button
                onClick={() => setActiveTab("published")}
                className={`rounded-lg px-4 py-2 transition-colors duration-300 ${
                  activeTab === "published"
                    ? "bg-green-600 font-semibold text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Publiés ({publishedPosts.length})
              </button>
              <button
                onClick={() => setActiveTab("drafts")}
                className={`rounded-lg px-4 py-2 transition-colors duration-300 ${
                  activeTab === "drafts"
                    ? "bg-amber-600 font-semibold text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Brouillons ({draftPosts.length})
              </button>
            </div>

            {/* Contenu des onglets */}
            {loadingPosts ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-green-600"></div>
                <p className="text-gray-600">Chargement des articles...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeTab === "published" && (
                  <>
                    {publishedPosts.length > 0 ? (
                      publishedPosts.map((post) => (
                        <PostCardModern
                          key={post.id}
                          post={post}
                          onDelete={deletePost}
                          onEdit={editPost}
                          router={router}
                          showPublishButton={false}
                        />
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <div className="mb-4 text-6xl">📝</div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-700">
                          Aucun article publié
                        </h3>
                        <p className="mb-6 text-gray-500">
                          Commencez par créer votre premier article
                        </p>
                        <button
                          onClick={() => router.push("/profil/formulaire_post")}
                          className="rounded-lg bg-green-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-green-700"
                        >
                          Créer mon premier article
                        </button>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "drafts" && (
                  <>
                    {draftPosts.length > 0 ? (
                      draftPosts.map((post) => (
                        <PostCardModern
                          key={post.id}
                          post={post}
                          onDelete={deletePost}
                          onEdit={editPost}
                          onPublish={publishDraft}
                          router={router}
                          showPublishButton={true}
                        />
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <div className="mb-4 text-6xl">📄</div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-700">
                          Aucun brouillon
                        </h3>
                        <p className="mb-6 text-gray-500">
                          Vos brouillons apparaîtront ici
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Composant PostCard moderne
interface PostCardModernProps {
  post: Post;
  onDelete: (id: string, isDraft?: boolean) => void;
  onEdit: (id: string) => void;
  onPublish?: (id: string) => void;
  router: any;
  showPublishButton: boolean;
}

function PostCardModern({
  post,
  onDelete,
  onEdit,
  onPublish,
  router,
  showPublishButton,
}: PostCardModernProps) {
  const getCategoryDisplayName = (category: string) => {
    const categoryNames: { [key: string]: string } = {
      TERRESTRES: "Animaux Terrestres",
      MARINS: "Animaux Marins",
      AERIENS: "Animaux Aériens",
      EAU_DOUCE: "Animaux d'Eau Douce",
    };
    return categoryNames[category] || category;
  };

  const isDraft = post.published === false;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-100 p-4 shadow-sm transition-shadow duration-200 hover:shadow-md md:flex-row md:items-center md:space-x-4 dark:border-gray-700 dark:bg-gray-700">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {getCategoryDisplayName(post.category)} • Créé le :{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        
      </div>

      <div className="mt-3 flex items-center space-x-3 md:mt-0">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            post.published
              ? "bg-green-100 text-green-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {post.published ? "✅ Publié" : "📝 Brouillon"}
        </span>

        {/* Actions */}
        <div className="flex space-x-2">
          {post.published && (
            <button
              onClick={() => router.push(`/posts/${post.id}`)}
              className="rounded-lg bg-blue-500 p-2 text-white transition-colors duration-200 hover:bg-blue-600"
              title="Voir l'article"
            >
              <FiEye size={18} />
            </button>
          )}

          <button
            onClick={() => onEdit(post.id)}
            className="rounded-lg bg-amber-500 p-2 text-white transition-colors duration-200 hover:bg-amber-600"
            title="Modifier"
          >
            <FiEdit size={18} />
          </button>

          <button
            onClick={() => onDelete(post.id, isDraft)}
            className="rounded-lg bg-red-500 p-2 text-white transition-colors duration-200 hover:bg-red-600"
            title="Supprimer"
          >
            <FiTrash2 size={18} />
          </button>

          {showPublishButton && onPublish && isDraft && (
            <button
              onClick={() => onPublish(post.id)}
              className="rounded-lg bg-green-500 p-2 text-white transition-colors duration-200 hover:bg-green-600"
              title="Publier"
            >
              <FiPlusCircle size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

