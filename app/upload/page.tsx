"use client";

import { useState } from "react";
import { uploadAvatar } from "./uploadActions";

export default function AvatarUploadPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsUploading(true);
      const file = formData.get("file") as File;

      // Validation de la taille (ex: 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("Le fichier est trop volumineux (max 5MB)");
        return;
      }

      const result = await uploadAvatar(formData);
      if (result.success && result.url) {
        setImageUrl(result.url);
        setError(null);
      } else {
        setError(result.error || "Erreur lors du téléchargement");
      }
    } catch {
      setError("Une erreur inattendue s'est produite");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div
        className="m-4 w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
        role="main"
        aria-label="Formulaire de téléchargement d'avatar"
      >
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Téléchargez Votre Image
        </h1>

        <form
          action={handleSubmit}
          className="space-y-6"
          aria-describedby="upload-status"
        >
          <div className="flex flex-col items-center gap-4">
            {imageUrl && (
              <div className="mb-4 size-32 overflow-hidden rounded-full">
                <img
                  src={imageUrl}
                  alt="Avatar"
                  className="size-full object-cover"
                />
              </div>
            )}

            <input
              name="file"
              type="file"
              accept="image/*"
              required
              aria-label="Sélectionner une image pour l'avatar"
              disabled={isUploading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:rounded-full file:border-0
                file:bg-green-50 file:px-4
                file:py-2 file:text-sm
                file:font-semibold file:text-green-700
                hover:file:bg-green-100"
            />
            <button
              type="submit"
              disabled={isUploading}
              aria-busy={isUploading}
              className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold
                text-white transition duration-200 hover:bg-green-700"
            >
              {isUploading ? "Téléchargement..." : "Télécharger"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
