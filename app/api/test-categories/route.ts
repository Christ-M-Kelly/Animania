import { prisma } from "@/app/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🧪 Test des catégories...");

    // Compter les posts par catégorie
    const categoryCounts = await prisma.post.groupBy({
      by: ["category"],
      _count: {
        id: true,
      },
    });

    console.log("📊 Répartition par catégorie:", categoryCounts);

    // Récupérer quelques exemples
    const allPosts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return NextResponse.json({
      message: "Test des catégories",
      categoryCounts: categoryCounts,
      recentPosts: allPosts,
      totalPosts: allPosts.length,
    });
  } catch (error) {
    console.error("❌ Erreur test catégories:", error);
    return NextResponse.json(
      { error: "Erreur lors du test des catégories" },
      { status: 500 }
    );
  }
}
