import { getCurrentUser } from "@/app/api/utils/auth";
import { prisma } from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(request: NextRequest, context: RouteParams) {
  try {
    // Attendre les paramètres asynchrones (Next.js 14+)
    const params = await context.params;
    const { id } = params;

    console.log("📢 Publication brouillon - ID reçu:", id);

    if (!id) {
      console.error("❌ ID manquant dans les paramètres");
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
      console.log("❌ Utilisateur non authentifié");
      return NextResponse.json(
        {
          success: false,
          message: "Authentification requise",
        },
        { status: 401 }
      );
    }

    console.log("🔍 Recherche du brouillon:", { id, userId: currentUser.id });

    // Vérifier que le brouillon existe et appartient à l'utilisateur
    const draft = await prisma.post.findFirst({
      where: {
        id: id,
        authorId: currentUser.id,
        published: false,
      },
    });

    if (!draft) {
      console.log("❌ Brouillon non trouvé:", { id, userId: currentUser.id });
      return NextResponse.json(
        {
          success: false,
          message: "Brouillon non trouvé ou déjà publié",
        },
        { status: 404 }
      );
    }

    console.log("✅ Brouillon trouvé, publication en cours...");

    // Publier le brouillon
    const publishedPost = await prisma.post.update({
      where: { id: id },
      data: {
        published: true,
        updatedAt: new Date(),
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

    console.log("✅ Brouillon publié avec succès:", publishedPost.id);

    return NextResponse.json({
      success: true,
      message: "Article publié avec succès",
      post: publishedPost,
    });
  } catch (error: any) {
    console.error("❌ Erreur publication brouillon:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la publication",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
