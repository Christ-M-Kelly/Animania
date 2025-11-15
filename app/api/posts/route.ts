import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "100");
    const category = searchParams.get("category");

    // Vérifier si c'est une requête authentifiée pour voir les brouillons
    const authHeader = request.headers.get("authorization");
    let userId: string | null = null;
    let showDrafts = false;

    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          userId: string;
        };
        userId = decoded.userId;
        showDrafts = searchParams.get("drafts") === "true";
      } catch (error) {
        console.log("Token invalide ou expiré");
      }
    }

    console.log("📥 GET /api/posts - Params:", {
      limit,
      category,
      showDrafts,
      userId,
    });

    // Construction des filtres - TOUJOURS filtrer par published pour les requêtes publiques
    const where: any = {
      published: true, // Par défaut, on ne montre que les articles publiés
    };

    // Si l'utilisateur demande explicitement ses brouillons ET est authentifié
    if (showDrafts && userId) {
      where.published = false;
      where.authorId = userId;
    }

    if (category && category !== "all") {
      where.category = category;
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
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
      take: limit,
    });

    console.log("✅ Posts récupérés:", posts.length);

    return NextResponse.json({
      success: true,
      posts,
      count: posts.length,
    });
  } catch (error) {
    console.error("❌ Erreur GET posts:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération des articles",
        message: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📥 Données reçues:", body);

    let authorId = body.authorId;

    // Vérification du token si présent
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          userId: string;
        };
        authorId = decoded.userId;
        console.log("✅ Token valide, authorId:", authorId);
      } catch (tokenError) {
        console.log("⚠️ Token invalide, utilisation de l'authorId fourni");
      }
    }

    // Validation des données requises
    const { title, content, category, published = false } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Le titre est requis",
        },
        { status: 400 }
      );
    }

    if (!content?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Le contenu est requis",
        },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "La catégorie est requise",
        },
        { status: 400 }
      );
    }

    if (!authorId) {
      return NextResponse.json(
        {
          success: false,
          message: "L'auteur est requis",
        },
        { status: 400 }
      );
    }

    // Vérifier que l'auteur existe
    const authorExists = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!authorExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Auteur non trouvé",
        },
        { status: 404 }
      );
    }

    // Création du post
    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        excerpt: body.excerpt?.trim() || null,
        category: category,
        imageUrl: body.imageUrl || null,
        published: Boolean(published),
        authorId: authorId,
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

    console.log(
      "✅ Post créé avec succès:",
      post.id,
      "- Publié:",
      post.published
    );

    return NextResponse.json(
      {
        success: true,
        message: "Article créé avec succès",
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Erreur lors de la création du post:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: "Erreur lors de la création",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur inconnue",
      },
      { status: 500 }
    );
  }
}
