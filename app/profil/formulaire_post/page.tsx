"use client";

import { handleUpload } from "@/app/upload/uploadActions";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface FormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const categories = [
  { value: "TERRESTRES", label: "Animaux Terrestres" },
  { value: "AERIENS", label: "Animaux Aériens" },
  { value: "MARINS", label: "Animaux Marins" },
  { value: "EAU_DOUCE", label: "Animaux d'Eau Douce" },
  { value: "DOMESTIQUES", label: "Animaux Domestiques" },
];

export default function FormulairePost() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Vérification d'authentification non bloquante
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Vérification de l'authentification...");

        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.user) {
            setCurrentUser(result.user);
            console.log("✅ Utilisateur authentifié:", result.user);
          } else {
            console.log("ℹ️ Pas d'utilisateur connecté - mode anonyme");
          }
        } else {
          console.log("ℹ️ Auth non disponible - mode anonyme");
        }
      } catch (error: any) {
        console.log("ℹ️ Erreur auth, passage en mode anonyme:", error.message);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): string | null => {
    if (!formData.title.trim()) {
      return "Le titre est requis";
    }
    if (formData.title.trim().length < 5) {
      return "Le titre doit contenir au moins 5 caractères";
    }
    if (formData.title.trim().length > 200) {
      return "Le titre ne doit pas dépasser 200 caractères";
    }

    if (!formData.content.trim()) {
      return "Le contenu est requis";
    }
    if (formData.content.trim().length < 50) {
      return "Le contenu doit contenir au moins 50 caractères";
    }

    if (!formData.category) {
      return "Veuillez sélectionner une catégorie";
    }

    if (formData.excerpt && formData.excerpt.trim().length > 300) {
      return "L'extrait ne doit pas dépasser 300 caractères";
    }

    return null;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation du type de fichier
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setError("Format d'image non supporté. Utilisez JPG, PNG, WebP ou GIF");
      return;
    }

    // Validation de la taille
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("L'image ne doit pas dépasser 5MB");
      return;
    }

    setUploadingImage(true);
    setError(null);

    try {
      console.log(
        "📤 Upload de l'image:",
        file.name,
        `(${(file.size / 1024).toFixed(2)} KB)`
      );

      const result = await handleUpload({
        file: file,
        input: { type: "post-image" },
      });

      if (!result?.url) {
        throw new Error("URL d'image manquante dans la réponse");
      }

      setFormData((prev) => ({ ...prev, imageUrl: result.url }));
      console.log("✅ Image uploadée:", result.url);
    } catch (error: unknown) {
      console.error("❌ Erreur upload:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de l'upload de l'image";
      setError(`Erreur lors de l'upload: ${errorMessage}`);

      // Réinitialiser l'input file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Fonction pour obtenir ou créer un utilisateur
  const getOrCreateAuthor = async (): Promise<string> => {
    try {
      // Si utilisateur connecté, utiliser son ID
      if (currentUser?.id) {
        console.log("✅ Utilisateur connecté trouvé:", currentUser.id);
        return currentUser.id;
      }

      // Sinon, créer un utilisateur anonyme temporaire
      console.log("📝 Création d'un utilisateur anonyme...");
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Utilisateur_${Date.now()}`,
          email: `user_${Date.now()}@temp.animania.com`,
          password: crypto.randomUUID(),
          role: "USER",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Erreur lors de la création de l'utilisateur"
        );
      }

      const result = await response.json();

      if (!result.user?.id) {
        throw new Error("ID utilisateur manquant dans la réponse");
      }

      console.log("✅ Utilisateur anonyme créé:", result.user.id);
      return result.user.id;
    } catch (error) {
      console.error("❌ Erreur getOrCreateAuthor:", error);
      throw new Error(
        error instanceof Error ? error.message : "Impossible de créer un auteur"
      );
    }
  };

  const handleSubmit = async (published: boolean) => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Obtenir un ID d'auteur (connecté ou temporaire)
      const authorId = await getOrCreateAuthor();

      if (!authorId) {
        throw new Error("Impossible de créer l'auteur");
      }

      console.log("📤 Envoi des données:", {
        ...formData,
        published,
        authorId,
      });

      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim() || null,
        category: formData.category,
        imageUrl: formData.imageUrl || null,
        authorId: authorId,
        published: published,
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      // Vérifier le content-type avant de parser
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await response.text();
        console.error("Réponse non-JSON:", text);
        throw new Error("Erreur serveur: réponse invalide");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || `Erreur HTTP: ${response.status}`
        );
      }

      if (result.success && result.post) {
        const actionText = published ? "publié" : "enregistré en brouillon";
        setSuccess(`Article ${actionText} avec succès !`);
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Redirection différée
        setTimeout(() => {
          router.push("/articles");
        }, 2000);
      } else {
        throw new Error(result.message || "Erreur lors de la création");
      }
    } catch (error: unknown) {
      console.error("❌ Erreur:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de la création de l'article";
      setError(errorMessage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "",
      imageUrl: "",
    });
    setError(null);
    setSuccess(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Affichage pendant la vérification d'auth (court)
  if (!authChecked) {
    return (
      <div className="flex min-h-screen flex-col bg-green-50">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-2 size-8 animate-spin rounded-full border-b-2 border-green-600"></div>
            <p className="text-sm text-gray-600">Initialisation...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-green-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              ✍️ Créer un article
            </h1>
            <p className="text-xl text-gray-600">
              Partagez vos connaissances sur le monde animal
            </p>

            {/* Affichage du statut d'authentification */}
            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
              {currentUser ? (
                <p className="text-sm text-blue-700">
                  🔐 Connecté en tant que : <strong>{currentUser.name}</strong>{" "}
                  ({currentUser.email})
                </p>
              ) : (
                <p className="text-sm text-blue-700">
                  👤 Mode anonyme - Votre article sera publié de manière anonyme
                </p>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg">
            {/* Messages de retour */}
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-center">
                  <div className="mr-3 text-2xl text-red-600">❌</div>
                  <div>
                    <h3 className="font-semibold text-red-800">Erreur</h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-center">
                  <div className="mr-3 text-2xl text-green-600">✅</div>
                  <div>
                    <h3 className="font-semibold text-green-800">Succès !</h3>
                    <p className="text-green-700">
                      {success} Redirection en cours...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Note d'information pour les utilisateurs non connectés */}
            {!currentUser && (
              <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex items-center">
                  <div className="mr-3 text-2xl text-yellow-600">ℹ️</div>
                  <div>
                    <h3 className="font-semibold text-yellow-800">
                      Mode anonyme
                    </h3>
                    <p className="text-sm text-yellow-700">
                      Vous n'êtes pas connecté. L'article sera publié de manière
                      anonyme.
                      <a
                        href="/connexion"
                        className="ml-1 underline hover:text-yellow-900"
                      >
                        Se connecter
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-6">
              {/* Titre */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Titre de l'article *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Ex: Les habitudes fascinantes des dauphins"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.title.length}/100 caractères
                </p>
              </div>

              {/* Catégorie */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload d'image */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Image de l'article (optionnel)
                </label>

                {!formData.imageUrl ? (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-green-400">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className={`flex cursor-pointer flex-col items-center ${
                        uploadingImage ? "pointer-events-none" : ""
                      }`}
                    >
                      {uploadingImage ? (
                        <div className="flex items-center gap-2">
                          <div className="size-6 animate-spin rounded-full border-b-2 border-green-600"></div>
                          <span className="text-green-600">
                            Upload en cours...
                          </span>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mb-4 size-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <span className="font-medium text-gray-600">
                            Cliquez pour sélectionner une image
                          </span>
                          <span className="mt-1 text-sm text-gray-400">
                            PNG, JPG, GIF jusqu'à 5MB
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="relative h-48 w-full overflow-hidden rounded-lg">
                      <Image
                        src={formData.imageUrl}
                        alt="Aperçu de l'image"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white shadow-lg transition-colors hover:bg-red-600"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Extrait */}
              <div>
                <label
                  htmlFor="excerpt"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Extrait (optionnel)
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Résumé court de l'article qui apparaîtra dans les aperçus..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.excerpt.length}/200 caractères
                </p>
              </div>

              {/* Contenu */}
              <div>
                <label
                  htmlFor="content"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Contenu de l'article *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={12}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Rédigez votre article ici..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.content.length} caractères (minimum 50)
                </p>
              </div>

              {/* Boutons */}
              <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleSubmit(false)}
                  disabled={loading}
                  className="flex-1 rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="mr-2 size-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Enregistrement...
                    </div>
                  ) : (
                    "💾 Enregistrer brouillon"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmit(true)}
                  disabled={loading}
                  className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="mr-2 size-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Publication...
                    </div>
                  ) : (
                    "📝 Publier l'article"
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 sm:w-auto"
                >
                  🔄 Réinitialiser
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
