import { prisma } from "@/app/db/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini");
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("🗑️ API DELETE draft appelée pour:", id);

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

    // Vérifier que le brouillon existe et appartient à l'utilisateur
    const draft = await prisma.draft.findUnique({
      where: { id },
      select: {
        id: true,
        authorId: true,
        title: true,
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
        { error: "Vous n'êtes pas autorisé à supprimer ce brouillon" },
        { status: 403 }
      );
    }

    // Supprimer le brouillon
    await prisma.draft.delete({
      where: { id },
    });

    console.log("✅ Brouillon supprimé:", draft.title);

    return NextResponse.json({
      message: "Brouillon supprimé avec succès",
    });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression du brouillon:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
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
    } catch (jwtError) {
      return NextResponse.json(
        { error: "Token d'authentification invalide" },
        { status: 401 }
      );
    }

    const draft = await prisma.draft.findUnique({
      where: { id },
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
