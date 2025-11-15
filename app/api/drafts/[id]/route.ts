import { getCurrentUser } from "@/app/api/utils/auth";
import { prisma } from "@/app/db/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

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

    // Vérifier que le post existe et appartient à l'utilisateur
    const post = await prisma.post.findFirst({
      where: {
        id: id,
        authorId: currentUser.id,
        published: false, // S'assurer que c'est un brouillon
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Brouillon non trouvé ou non autorisé",
        },
        { status: 404 }
      );
    }

    // Supprimer le brouillon
    await prisma.post.delete({
      where: { id: id },
    });

    console.log("✅ Brouillon supprimé:", id);

    return NextResponse.json({
      success: true,
      message: "Brouillon supprimé avec succès",
    });
  } catch (error: unknown) {
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

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
        name: string;
      };
    } catch {
      return NextResponse.json(
        { error: "Token d'authentification invalide" },
        { status: 401 }
      );
    }

    // Utiliser le modèle Post au lieu de Draft (qui n'existe pas dans le schéma)
    const draft = await prisma.post.findUnique({
      where: {
        id: id,
        published: false, // S'assurer que c'est un brouillon
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
