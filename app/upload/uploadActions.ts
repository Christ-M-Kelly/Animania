"use server";

import { put } from "@vercel/blob";

export async function handleUpload({
  file,
  input,
}: {
  file: File;
  input: { type: string };
}) {
  try {
    const blob = await put(`${input.type}-${file.name}`, file, {
      access: "public",
    });
    return { url: blob.url };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Erreur lors du téléchargement"
    );
  }
}

export async function uploadAvatar(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("Aucun fichier sélectionné");
    }

    const blob = await put(file.name, file, {
      access: "public",
    });

    return { url: blob.url, success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors du téléchargement",
      success: false,
    };
  }
}
