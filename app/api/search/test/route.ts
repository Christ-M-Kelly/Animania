import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prisma";

export async function GET() {
  try {
    // Test de connexion à la base
    const totalPosts = await prisma.post.count();

    // Test de recherche simple
    const testResults = await prisma.post.findMany({
      where: {
        published: true,
        title: {
          contains: "cheval", // Recherche votre post "Le cheval"
          mode: "insensitive",
        },
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      message: "API de recherche fonctionnelle",
      data: {
        totalPosts,
        testResults: testResults.map((post) => ({
          id: post.id,
          title: post.title,
          author: post.author.name,
          category: post.category,
        })),
      },
    });
  } catch (error) {
    console.error("Search API test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
