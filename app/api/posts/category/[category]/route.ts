import { prisma } from "@/app/db/prisma";
import { AnimalCategory } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    category: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { category } = await params;

    console.log("🔍 Récupération des posts pour la catégorie:", category);

    // Validation de la catégorie
    const validCategories = Object.values(AnimalCategory);
    const categoryUpperCase = category.toUpperCase() as AnimalCategory;

    if (!validCategories.includes(categoryUpperCase)) {
      return NextResponse.json(
        {
          success: false,
          message: "Catégorie invalide",
          validCategories,
        },
        { status: 400 }
      );
    }

    const posts = await prisma.post.findMany({
      where: {
        category: categoryUpperCase, // Maintenant typé correctement
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    console.log(`✅ ${posts.length} posts trouvés pour ${category}`);

    return NextResponse.json({
      success: true,
      posts,
      category: categoryUpperCase,
      count: posts.length,
    });
  } catch (error) {
    console.error("❌ Erreur récupération posts par catégorie:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des posts",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
