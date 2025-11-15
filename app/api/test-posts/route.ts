import { prisma } from "@/app/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test de connexion
    await prisma.$connect();

    // Compter les posts
    const postCount = await prisma.post.count();

    // Récupérer quelques posts
    const posts = await prisma.post.findMany({
      take: 5,
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Base de données connectée",
      data: {
        totalPosts: postCount,
        posts: posts,
      },
    });
  } catch (error) {
    console.error("Database test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
