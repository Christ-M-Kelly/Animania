import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🧪 Test Vercel Blob...");

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    console.log(
      "🔑 Token Blob:",
      token ? token.substring(0, 20) + "..." : "NON DÉFINI"
    );

    if (!token) {
      return NextResponse.json(
        {
          status: "error",
          message: "BLOB_READ_WRITE_TOKEN non défini",
        },
        { status: 500 }
      );
    }

    // Créer un fichier de test simple
    const testContent = `Test Vercel Blob - ${new Date().toISOString()}`;
    const buffer = Buffer.from(testContent, "utf-8");

    console.log("📤 Upload de test...");
    const blob = await put(`test/test-${Date.now()}.txt`, buffer, {
      access: "public",
      token: token,
    });

    console.log("✅ Test upload réussi:", blob.url);

    return NextResponse.json({
      status: "success",
      message: "Test Vercel Blob réussi",
      url: blob.url,
      downloadUrl: blob.downloadUrl,
    });
  } catch (error) {
    console.error("❌ Erreur test Vercel Blob:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Erreur test Vercel Blob",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
