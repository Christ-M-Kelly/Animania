"use client";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum AnimalCategory {
  TERRESTRES = "TERRESTRES",
  MARINS = "MARINS",
  AERIENS = "AERIENS",
  EAU_DOUCE = "EAU_DOUCE",
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2 border-b p-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "rounded bg-gray-200 p-1" : "p-1"}
      >
        Gras
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic") ? "rounded bg-gray-200 p-1" : "p-1"
        }
      >
        Italique
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? "rounded bg-gray-200 p-1" : "p-1"
        }
      >
        Liste
      </button>
    </div>
  );
};

export default function FormulairePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState<AnimalCategory>(
    AnimalCategory.TERRESTRES
  );
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isDraft, setIsDraft] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        throw new Error("Vous devez être connecté pour publier un article");
      }

      console.log(
        "📤 Mode sauvegarde:",
        saveAsDraft ? "BROUILLON" : "PUBLICATION"
      );

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", editor?.getHTML() || "");
      formData.append("category", category);
      formData.append("isDraft", saveAsDraft.toString()); // ← Correction importante

      if (file) {
        formData.append("image", file);
      }

      // Debug pour vérifier les données envoyées
      console.log("📋 FormData envoyé:", {
        title,
        category,
        isDraft: saveAsDraft,
        isDraftString: saveAsDraft.toString(),
      });

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur HTTP: ${response.status} ${errorData.error}`);
      }

      const result = await response.json();
      console.log("✅ Réponse reçue:", result);

      setMessage({
        type: "success",
        text: saveAsDraft
          ? "Brouillon sauvegardé avec succès !"
          : "Article publié avec succès !",
      });
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Une erreur est survenue lors de la sauvegarde.",
      });
      setTimeout(() => setMessage(null), 5000);

      if (error instanceof Error) {
        console.error("Message d'erreur:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      // Redirection vers la page de connexion
      window.location.href = "/connexion";
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-green-800 py-16">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <img
              src="/images/perro.jpg"
              alt="Animaux sauvages"
              className="size-full object-cover"
            />
          </div>
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold text-white">
              Créer un Article
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white">
              Partagez votre passion pour les animaux à travers un article
              captivant
            </p>
          </div>
        </section>

        {/* Formulaire Section */}
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-4xl px-4">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Catégorie
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as AnimalCategory)
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="TERRESTRES">Animaux Terrestres</option>
                    <option value="MARINS">Animaux Marins</option>
                    <option value="AERIENS">Animaux Aériens</option>
                    <option value="EAU_DOUCE">Animaux d'Eau Douce</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Contenu
                  </label>
                  <div className="overflow-hidden rounded-lg border">
                    <MenuBar editor={editor} />
                    <EditorContent
                      editor={editor}
                      className="prose min-h-[300px] max-w-none p-4"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full"
                  />
                  {preview && (
                    <div className="mt-4">
                      <img
                        src={preview}
                        alt="Aperçu"
                        className="max-h-48 rounded border object-contain"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={(e) => handleSubmit(e, true)}
                    className="flex-1 rounded-lg bg-gray-600 py-3 text-white transition-colors hover:bg-gray-700 disabled:bg-gray-400"
                  >
                    {loading ? "Sauvegarde..." : "Sauvegarder en brouillon"}
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={(e) => handleSubmit(e, false)}
                    className="flex-1 rounded-lg bg-green-600 py-3 text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
                  >
                    {loading ? "Publication..." : "Publier l'article"}
                  </button>
                </div>

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
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
