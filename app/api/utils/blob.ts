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

export async function uploadBuffer(
  buffer: ArrayBuffer | Uint8Array,
  fileName: string
): Promise<string> {
  const blob = new Blob([buffer]);
  const { url } = await put(fileName, blob, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });

  return url;
}

// Fonction pour uploader un Blob avec nom personnalisé obligatoire
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

// Fonction pour uploader depuis un Buffer Node.js
export async function uploadFromBuffer(
  buffer: Buffer,
  fileName: string
): Promise<string> {
  // Convertir le Buffer Node.js en ArrayBuffer
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  view.set(buffer);

  const { url } = await put(fileName, arrayBuffer, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });

  return url;
}
