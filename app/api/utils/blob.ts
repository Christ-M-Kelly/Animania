import { put } from "@vercel/blob";

export async function uploadImage(file: File): Promise<string> {
  const { url } = await put(file.name, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });

  return url;
}

export async function uploadImageWithCustomName(
  file: File,
  fileName: string
): Promise<string> {
  const { url } = await put(fileName, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });

  return url;
}

export async function uploadBlob(
  blob: Blob,
  fileName: string
): Promise<string> {
  const { url } = await put(fileName, blob, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });

  return url;
}

// Fonction utilitaire pour créer un nom de fichier unique
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `${timestamp}-${cleanName}`;
}

// Fonction pour uploader avec nom auto-généré
export async function uploadImageWithTimestamp(file: File): Promise<string> {
  const uniqueName = generateUniqueFileName(file.name);
  return uploadImageWithCustomName(file, uniqueName);
}
