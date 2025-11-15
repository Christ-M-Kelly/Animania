import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/db/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        success: false,
        message: "La recherche doit contenir au moins 2 caractères",
        results: [],
      });
    }

    // Construction de la requête de recherche
    const searchConditions: any = {
      published: true,
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
        {
          excerpt: {
            contains: query.trim(),
            mode: "insensitive",
          },
        },
      ],
    };

    // Filtre par catégorie si spécifié
    if (category && category !== "all") {
      searchConditions.category = category;
    }

    const posts = await prisma.post.findMany({
      where: searchConditions,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      take: limit,
    });

    return NextResponse.json({
      success: true,
      results: posts,
      total: posts.length,
      query: query,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la recherche",
        results: [],
      },
      { status: 500 }
    );
  }
}
