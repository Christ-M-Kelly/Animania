import { upload } from "@vercel/blob";

export async function uploadImage(file: Blob): Promise<string> {
  const { url } = await upload(file, {
    access: "public",
    contentType: file.type,
  });
  return url;
}
