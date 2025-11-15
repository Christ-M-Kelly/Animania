import { prisma } from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    category: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    const params = await context.params;
    const { category } = params;

    console.log("📂 Récupération des posts pour la catégorie:", category);

    const validCategories = ["TERRESTRES", "MARINS", "AERIENS", "EAU_DOUCE"];

    if (!validCategories.includes(category.toUpperCase())) {
      return NextResponse.json(
        { error: "Catégorie invalide" },
        { status: 400 }
      );
    }

    const posts = await prisma.post.findMany({
      where: {
        category: category.toUpperCase(),
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    console.log(
      `📊 ${posts.length} posts trouvés pour la catégorie ${category}`
    );

    return NextResponse.json({
      category: category,
      posts: posts,
      count: posts.length,
    });
  } catch (error) {
    console.error("❌ Erreur récupération posts par catégorie:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
