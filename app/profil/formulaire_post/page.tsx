"use client";

import { Editor, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { AnimalCategory } from "@prisma/client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-2 flex gap-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-200 p-1 rounded" : "p-1"}
      >
        Gras
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic") ? "bg-gray-200 p-1 rounded" : "p-1"
        }
      >
        Italique
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? "bg-gray-200 p-1 rounded" : "p-1"
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

  const handleSubmit = async (isPublished: boolean) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("Token récupéré:", token);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", editor?.getHTML() || "");
      formData.append("published", isPublished.toString());
      formData.append("category", category);
      if (file) {
        formData.append("image", file);
      }

      console.log("Catégorie sélectionnée:", category);

      console.log("Données envoyées:", formData);

      const response = await fetch("/api/Post", {
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

      toast.success(
        isPublished
          ? "Article publié avec succès !"
          : "Brouillon enregistré avec succès !"
      );
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error("Erreur détaillée:", error);
      toast.error("Une erreur est survenue lors de la publication.");
      if (error instanceof Error) {
        console.error("Message d'erreur:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ToastContainer />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-green-800 py-16">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <img
              src="/images/perro.jpg"
              alt="Animaux sauvages"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Créer un Article
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Partagez votre passion pour les animaux à travers un article
              captivant
            </p>
          </div>
        </section>

        {/* Formulaire Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Catégorie
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as AnimalCategory)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    {Object.values(AnimalCategory).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "TERRESTRES" && "Animaux terrestres"}
                        {cat === "MARINS" && "Animaux marins"}
                        {cat === "AERIENS" && "Animaux aériens"}
                        {cat === "EAU_DOUCE" && "Animaux d'eau douce"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Contenu
                  </label>
                  <div className="border rounded-lg overflow-hidden">
                    <MenuBar editor={editor} />
                    <EditorContent
                      editor={editor}
                      className="min-h-[300px] prose max-w-none p-4"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
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
                        className="max-h-48 object-contain rounded border"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSubmit(true)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                  >
                    {loading ? "Publication en cours..." : "Publier maintenant"}
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSubmit(false)}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
                  >
                    {loading
                      ? "Enregistrement..."
                      : "Enregistrer comme brouillon"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
