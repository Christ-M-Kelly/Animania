"use client";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        // En cas d'erreur réseau, on peut donner une seconde chance
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

        // Utiliser les données séparées
        const publishedPosts = data.posts || [];
        const draftPosts = data.drafts || [];

        setPublishedPosts(publishedPosts);
        setDraftPosts(draftPosts);

        console.log("📊 Posts chargés (nouvelles tables):", {
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
      // Utiliser la bonne API selon le type
      const apiUrl = isDraft ? `/api/drafts/${postId}` : `/api/posts/${postId}`;

      console.log(`🗑️ Suppression ${itemType}:`, { postId, isDraft, apiUrl });

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("📡 Réponse suppression:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (response.ok) {
        // Recharger les posts après suppression réussie
        loadUserPosts(token!);

        setMessage({
          type: "success",
          text: `${
            itemType.charAt(0).toUpperCase() + itemType.slice(1)
          } supprimé avec succès`,
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        // Gestion sécurisée des erreurs JSON
        let errorMessage = `Erreur lors de la suppression du ${itemType}`;

        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } else {
            // Si ce n'est pas du JSON, lire le texte
            const errorText = await response.text();
            errorMessage =
              errorText || `Erreur ${response.status}: ${response.statusText}`;
          }
        } catch (parseError) {
          console.error("❌ Erreur lors du parsing de la réponse:", parseError);
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

  // Fonction pour publier un brouillon :
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
        // Recharger les posts
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
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex grow items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-b-2 border-green-600"></div>
            <p className="text-gray-600">Chargement du profil...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error && !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex grow items-center justify-center">
          <div className="text-center">
            <p className="mb-4 text-red-600">{error}</p>
            <p className="text-gray-600">Redirection vers la connexion...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Affichage du profil si tout va bien
  if (!user) {
    return null; // Éviter le flash pendant la redirection
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

      <main className="container mx-auto grow px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Profil */}
          <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-8">
              <h1 className="text-3xl font-bold text-white">Mon Profil</h1>
              <p className="mt-2 text-green-100">
                Gérez vos informations personnelles
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <p className="rounded-lg bg-gray-50 p-3 text-lg text-gray-900">
                    {user.name}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="rounded-lg bg-gray-50 p-3 text-lg text-gray-900">
                    {user.email}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Rôle
                  </label>
                  <p className="rounded-lg bg-gray-50 p-3 text-lg text-gray-900">
                    {user.role}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Membre depuis
                  </label>
                  <p className="rounded-lg bg-gray-50 p-3 text-lg text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <button
                  onClick={() => router.push("/profil/formulaire_post")}
                  className="rounded-lg bg-green-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-green-700"
                >
                  Créer un article
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-red-700"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>

          {/* Section Mes Articles avec Onglets */}
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
              <h2 className="text-2xl font-bold text-white">Mes Articles</h2>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => setActiveTab("published")}
                  className={`rounded-lg px-4 py-2 transition-colors duration-300 ${
                    activeTab === "published"
                      ? "bg-white font-semibold text-blue-800"
                      : "bg-blue-700 text-blue-100 hover:bg-blue-600"
                  }`}
                >
                  Publiés ({publishedPosts.length})
                </button>
                <button
                  onClick={() => setActiveTab("drafts")}
                  className={`rounded-lg px-4 py-2 transition-colors duration-300 ${
                    activeTab === "drafts"
                      ? "bg-white font-semibold text-blue-800"
                      : "bg-blue-700 text-blue-100 hover:bg-blue-600"
                  }`}
                >
                  Brouillons ({draftPosts.length})
                </button>
              </div>
            </div>

            <div className="p-6">
              {loadingPosts ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                  <p className="text-gray-600">Chargement des articles...</p>
                </div>
              ) : (
                <>
                  {/* Articles Publiés */}
                  {activeTab === "published" && (
                    <>
                      {publishedPosts.length === 0 ? (
                        <div className="py-12 text-center">
                          <div className="mb-4 text-6xl">📝</div>
                          <h3 className="mb-2 text-xl font-semibold text-gray-700">
                            Aucun article publié
                          </h3>
                          <p className="mb-6 text-gray-500">
                            Commencez par créer votre premier article
                          </p>
                          <button
                            onClick={() =>
                              router.push("/profil/formulaire_post")
                            }
                            className="rounded-lg bg-green-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-green-700"
                          >
                            Créer mon premier article
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {publishedPosts.map((post) => (
                            <PostCard
                              key={post.id}
                              post={post}
                              onDelete={deletePost}
                              onEdit={editPost}
                              router={router}
                              showPublishButton={false}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* Brouillons */}
                  {activeTab === "drafts" && (
                    <>
                      {draftPosts.length === 0 ? (
                        <div className="py-12 text-center">
                          <div className="mb-4 text-6xl">📄</div>
                          <h3 className="mb-2 text-xl font-semibold text-gray-700">
                            Aucun brouillon
                          </h3>
                          <p className="mb-6 text-gray-500">
                            Vos brouillons apparaîtront ici
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {draftPosts.map((post) => (
                            <PostCard
                              key={post.id}
                              post={post}
                              onDelete={deletePost}
                              onEdit={editPost}
                              onPublish={publishDraft}
                              router={router}
                              showPublishButton={true}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Ajoutez ce composant PostCard à la fin du fichier :

interface PostCardProps {
  post: Post;
  onDelete: (id: string, isDraft?: boolean) => void; // ← Ajouter le paramètre isDraft
  onEdit: (id: string) => void;
  onPublish?: (id: string) => void;
  router: any;
  showPublishButton: boolean;
}

function PostCard({
  post,
  onDelete,
  onEdit,
  onPublish,
  router,
  showPublishButton,
}: PostCardProps) {
  const getCategoryDisplayName = (category: string) => {
    const categoryNames: { [key: string]: string } = {
      TERRESTRES: "Animaux Terrestres",
      MARINS: "Animaux Marins",
      AERIENS: "Animaux Aériens",
      EAU_DOUCE: "Animaux d'Eau Douce",
    };
    return categoryNames[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      TERRESTRES: "bg-green-100 text-green-800",
      MARINS: "bg-blue-100 text-blue-800",
      AERIENS: "bg-sky-100 text-sky-800",
      EAU_DOUCE: "bg-teal-100 text-teal-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // Déterminer si c'est un brouillon
  const isDraft = post.published === false;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 transition-shadow duration-300 hover:shadow-lg">
      {post.imageUrl && (
        <div className="h-48 overflow-hidden bg-gray-100">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="size-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide ${getCategoryColor(
              post.category
            )}`}
          >
            {getCategoryDisplayName(post.category)}
          </span>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              post.published === true
                ? "border border-green-300 bg-green-100 text-green-800"
                : "border border-yellow-300 bg-yellow-100 text-yellow-800"
            }`}
          >
            {post.published === true ? "✅ Publié" : "📝 Brouillon"}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">
          {post.title}
        </h3>

        <p className="mb-3 line-clamp-3 text-sm text-gray-600">
          {post.excerpt}
        </p>

        <div className="mb-4 text-xs text-gray-500">
          Créé le {new Date(post.createdAt).toLocaleDateString("fr-FR")}
          {isDraft && (
            <span className="mt-1 block font-medium text-yellow-600">
              📝 En attente de publication
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            {post.published === true && (
              <button
                onClick={() => router.push(`/posts/${post.id}`)}
                className="flex-1 rounded bg-blue-600 px-3 py-2 text-sm text-white transition-colors duration-300 hover:bg-blue-700"
              >
                Voir
              </button>
            )}
            <button
              onClick={() => onEdit(post.id)}
              className="flex-1 rounded bg-amber-600 px-3 py-2 text-sm text-white transition-colors duration-300 hover:bg-amber-700"
            >
              Modifier
            </button>
            <button
              onClick={() => onDelete(post.id, isDraft)} // ← Passer le type
              className="flex-1 rounded bg-red-600 px-3 py-2 text-sm text-white transition-colors duration-300 hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>

          {showPublishButton && onPublish && isDraft && (
            <button
              onClick={() => onPublish(post.id)}
              className="w-full rounded bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-green-700"
            >
              📢 Publier maintenant
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
