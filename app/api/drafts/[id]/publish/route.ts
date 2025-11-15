// app/api/posts/[id]/publish/route.ts

import { prisma } from "@/app/db/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini");
}

// Définir l'interface de votre payload de token
interface DecodedToken {
  userId: string;
  email: string;
  name: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("📢 Publication du brouillon:", id);

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token d'authentification manquant" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    let decoded: DecodedToken; // Utiliser l'interface
    try {
      // MODIFICATION ICI: Utiliser 'as unknown as DecodedToken'
      decoded = jwt.verify(token, JWT_SECRET) as unknown as DecodedToken;
    } catch (jwtError) {
      return NextResponse.json(
        { error: "Token d'authentification invalide" },
        { status: 401 }
      );
    }

    // Vérifier que le post existe et appartient à l'utilisateur
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        authorId: true,
        title: true,
        published: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    if (post.authorId !== decoded.userId) {
      // Fonctionne maintenant
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à publier cet article" },
        { status: 403 }
      );
    }

    if (post.published) {
      return NextResponse.json(
        { error: "Cet article est déjà publié" },
        { status: 400 }
      );
    }

    // Publier le brouillon
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { published: true },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    console.log("✅ Brouillon publié:", updatedPost.title);

    return NextResponse.json({
      message: "Brouillon publié avec succès",
      post: updatedPost,
    });
  } catch (error) {
    console.error("❌ Erreur lors de la publication du brouillon:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
