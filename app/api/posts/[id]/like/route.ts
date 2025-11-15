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

    // Vérifier si déjà liké
    const existingLike = await prisma.postLike.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    if (existingLike) {
      // Unlike : supprimer le like
      await prisma.postLike.delete({
        where: { id: existingLike.id },
      });

      // Décrémenter le compteur
      const post = await prisma.post.update({
        where: { id: postId },
        data: { likes: { decrement: 1 } },
        select: { likes: true },
      });

      return NextResponse.json({
        success: true,
        liked: false,
        likes: post.likes,
      });
    } else {
      // Like : créer le like
      await prisma.postLike.create({
        data: {
          userId: user.id,
          postId,
        },
      });

      // Incrémenter le compteur
      const post = await prisma.post.update({
        where: { id: postId },
        data: { likes: { increment: 1 } },
        select: { likes: true },
      });

      return NextResponse.json({
        success: true,
        liked: true,
        likes: post.likes,
      });
    }
  } catch (error) {
    console.error("❌ Erreur lors du like:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors du like" },
      { status: 500 }
    );
  }
}

// GET pour vérifier si l'utilisateur a liké
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({
        success: true,
        liked: false,
      });
    }

    const { id: postId } = await params;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({
        success: true,
        liked: false,
      });
    }

    const like = await prisma.postLike.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      liked: !!like,
    });
  } catch (error) {
    console.error("❌ Erreur:", error);
    return NextResponse.json(
      { success: false, message: "Erreur" },
      { status: 500 }
    );
  }
}
