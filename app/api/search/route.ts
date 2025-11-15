import { prisma } from "@/app/db/prisma";
import { AnimalCategory } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const category = searchParams.get("category");

    // Construire les conditions de recherche
    const where: {
      published: boolean;
      AND?: Array<{
        OR?: Array<{
          title?: { contains: string; mode: "insensitive" };
          content?: { contains: string; mode: "insensitive" };
        }>;
        category?: AnimalCategory; // Changement ici : typer correctement
      }>;
    } = {
      published: true,
    };

    const conditions: Array<{
      OR?: Array<{
        title?: { contains: string; mode: "insensitive" };
        content?: { contains: string; mode: "insensitive" };
      }>;
      category?: AnimalCategory; // Changement ici : typer correctement
    }> = [];

    // Ajouter la recherche par texte si présent
    if (query && query.trim()) {
      conditions.push({
        OR: [
          {
            title: {
              contains: query.trim(),
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: query.trim(),
              mode: "insensitive",
            },
          },
        ],
      });
    }

    // Ajouter le filtre par catégorie si présent
    if (category && category.trim()) {
      // Valider et convertir la catégorie
      const validCategories = Object.values(AnimalCategory);
      const categoryUpperCase = category.trim().toUpperCase() as AnimalCategory;

      if (validCategories.includes(categoryUpperCase)) {
        conditions.push({
          category: categoryUpperCase, // Utiliser la catégorie typée
        });
      }
    }

    // Appliquer les conditions
    if (conditions.length > 0) {
      where.AND = conditions;
    }

    // Effectuer la recherche
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        posts: posts.map((post) => ({
          ...post,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
        })),
        count: posts.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erreur lors de la recherche:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la recherche",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
