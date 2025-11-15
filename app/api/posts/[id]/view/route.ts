import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Non authentifié" },
        { status: 401 }
      );
    }

    const { id: postId } = await params;

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur a déjà vu cet article
    const existingView = await prisma.postView.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    if (existingView) {
      // Déjà vu, on ne compte pas
      return NextResponse.json({
        success: true,
        alreadyViewed: true,
        views: await prisma.postView.count({ where: { postId } }),
      });
    }

    // Créer la vue
    await prisma.postView.create({
      data: {
        userId: user.id,
        postId,
      },
    });

    // Incrémenter le compteur
    const post = await prisma.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
      select: { views: true },
    });

    return NextResponse.json({
      success: true,
      alreadyViewed: false,
      views: post.views,
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'incrémentation des vues:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'incrémentation des vues",
      },
      { status: 500 }
    );
  }
}
