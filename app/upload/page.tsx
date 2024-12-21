"use client";

import React from "react";
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 m-4"
        role="main"
        aria-label="Formulaire de téléchargement d'avatar"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Téléchargez Votre Image
        </h1>

        <form
          action={handleSubmit}
          className="space-y-6"
          aria-describedby="upload-status"
        >
          <div className="flex flex-col items-center gap-4">
            {imageUrl && (
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={imageUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
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
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-green-50 file:text-green-700
                hover:file:bg-green-100"
            />
            <button
              type="submit"
              disabled={isUploading}
              aria-busy={isUploading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg
                hover:bg-green-700 transition duration-200 font-semibold"
            >
              {isUploading ? "Téléchargement..." : "Télécharger"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
