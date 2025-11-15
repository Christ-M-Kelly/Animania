import { put } from "@vercel/blob";

export async function uploadImage(file: Blob): Promise<string> {
  const { url } = await put(file.name, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });

  return url;
}

export async function uploadImageWithCustomName(
  file: Blob,
  fileName: string
): Promise<string> {
  const { url } = await put(fileName, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });

  return url;
}

export async function uploadBuffer(
  buffer: Buffer,
  fileName: string
): Promise<string> {
  const { url } = await put(fileName, buffer, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });

  return url;
}
