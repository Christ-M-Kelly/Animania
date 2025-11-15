import { getCurrentUser } from "@/app/api/utils/auth";
import { prisma } from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("📚 Récupération des posts utilisateur...");

    const currentUser = await getCurrentUser(request);

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentification requise",
        },
        { status: 401 }
      );
    }

    // Récupérer tous les posts de l'utilisateur
    const allPosts = await prisma.post.findMany({
      where: { authorId: currentUser.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Séparer les posts publiés des brouillons
    const publishedPosts = allPosts.filter((post) => post.published === true);
    const draftPosts = allPosts.filter((post) => post.published === false);

    console.log("✅ Posts récupérés:", {
      total: allPosts.length,
      published: publishedPosts.length,
      drafts: draftPosts.length,
    });

    return NextResponse.json({
      success: true,
      posts: publishedPosts,
      drafts: draftPosts,
      total: allPosts.length,
    });
  } catch (error: any) {
    console.error("❌ Erreur récupération posts utilisateur:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des articles",
      },
      { status: 500 }
    );
  }
}
