// app/api/drafts/[id]/route.ts

import { getCurrentUser } from "@/app/api/utils/auth";
import { prisma } from "@/app/db/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string; // Assurez-vous que JWT_SECRET est disponible

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini");
}

// Définir l'interface de votre payload de token
interface DecodedToken {
  userId: string;
  email: string;
  name: string;
}

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  try {
    const params = await context.params;
    const { id } = params;

    console.log("🗑️ Suppression brouillon - ID reçu:", id);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID du brouillon manquant",
        },
        { status: 400 }
      );
    }

    // Note: getCurrentUser utilise 'verifyToken' qui retourne 'JwtPayload | string | null'
    // Nous devons nous assurer que la fonction getCurrentUser gère cela
    // et retourne un type 'User' ou null.
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

    // Assurez-vous que 'getCurrentUser' retourne un objet avec 'id'
    if (!currentUser.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Token invalide ou utilisateur non trouvé",
        },
        { status: 401 }
      );
    }

    // Vérifier que le post existe et appartient à l'utilisateur
    // Note: Le modèle est 'post' mais nous gérons un 'draft' (published: false)
    const post = await prisma.post.findFirst({
      where: {
        id: id,
        authorId: currentUser.id,
        published: false, // S'assurer que c'est un brouillon
      },
    });

    if (!post) {
      // Tentative de suppression d'un brouillon dans la table 'Draft' si elle existe encore
      // D'après votre schéma, il n'y a plus de table Draft, donc on s'arrête ici.
      return NextResponse.json(
        {
          success: false,
          message: "Brouillon non trouvé ou non autorisé",
        },
        { status: 404 }
      );
    }

    // Supprimer le brouillon (Post non publié)
    await prisma.post.delete({
      where: { id: id },
    });

    console.log("✅ Brouillon supprimé:", id);

    return NextResponse.json({
      success: true,
      message: "Brouillon supprimé avec succès",
    });
  } catch (error: any) {
    console.error("❌ Erreur suppression brouillon:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la suppression du brouillon",
      },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // NOTE: Votre schéma n'a plus de table 'Draft'.
    // Cette fonction devrait chercher dans la table 'Post' avec published: false.
    const draft = await prisma.post.findUnique({
      where: {
        id: id,
        published: false, // Chercher un brouillon
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!draft) {
      return NextResponse.json(
        { error: "Brouillon non trouvé" },
        { status: 404 }
      );
    }

    if (draft.authorId !== decoded.userId) {
      // Fonctionne maintenant
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à voir ce brouillon" },
        { status: 403 }
      );
    }

    return NextResponse.json({ draft });
  } catch (error) {
    console.error("Erreur lors de la récupération du brouillon:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
