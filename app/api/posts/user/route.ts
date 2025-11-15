import { prisma } from "@/app/db/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini");
}

export async function GET(req: Request) {
  try {
    console.log("📋 API GET /api/posts/user appelée");

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token d'authentification manquant" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
        name: string;
      };
    } catch (jwtError) {
      return NextResponse.json(
        { error: "Token d'authentification invalide" },
        { status: 401 }
      );
    }

    console.log(
      "🔍 Récupération des posts ET brouillons pour:",
      decoded.userId
    );

    // Récupérer les posts publiés
    const posts = await prisma.post.findMany({
      where: {
        authorId: decoded.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        excerpt: true,
        category: true,
        slug: true,
        imageUrl: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Récupérer les brouillons
    const drafts = await prisma.draft.findMany({
      where: {
        authorId: decoded.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        excerpt: true,
        category: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Ajouter un champ 'published' pour les brouillons (toujours false)
    const draftsWithPublished = drafts.map((draft) => ({
      ...draft,
      published: false,
      slug: null, // Les brouillons n'ont pas de slug
    }));

    console.log("📊 Données récupérées:", {
      posts: posts.length,
      drafts: drafts.length,
    });

    return NextResponse.json({
      posts: posts,
      drafts: draftsWithPublished,
      // Combinaison pour la compatibilité avec l'ancien code
      allPosts: [...posts, ...draftsWithPublished],
    });
  } catch (error) {
    console.error(
      "❌ Erreur lors de la récupération des posts utilisateur:",
      error
    );
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
