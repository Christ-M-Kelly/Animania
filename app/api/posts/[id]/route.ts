import { getCurrentUser } from "@/app/api/utils/auth";
import { prisma } from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    const params = await context.params;
    const { id } = params;

    console.log("📖 Récupération post:", id);

    const post = await prisma.post.findUnique({
      where: {
        id: id,
        published: true, // Seuls les posts publiés sont accessibles publiquement
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

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Article non trouvé",
        },
        { status: 404 }
      );
    }

    // Incrémenter les vues
    await prisma.post.update({
      where: { id: id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      post: post,
    });
  } catch (error: any) {
    console.error("❌ Erreur récupération post:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération de l'article",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  try {
    const params = await context.params;
    const { id } = params;

    console.log("🗑️ Suppression post publié:", id);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID de l'article manquant",
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
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Article non trouvé ou non autorisé",
        },
        { status: 404 }
      );
    }

    // Supprimer le post
    await prisma.post.delete({
      where: { id: id },
    });

    console.log("✅ Post supprimé:", id);

    return NextResponse.json({
      success: true,
      message: "Article supprimé avec succès",
    });
  } catch (error: any) {
    console.error("❌ Erreur suppression post:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la suppression de l'article",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteParams) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    console.log("✏️ Mise à jour post:", id);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID de l'article manquant",
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

    // Vérifier que le post appartient à l'utilisateur
    const existingPost = await prisma.post.findFirst({
      where: {
        id: id,
        authorId: currentUser.id,
      },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Article non trouvé ou non autorisé",
        },
        { status: 404 }
      );
    }

    // Mettre à jour le post
    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        title: body.title?.trim(),
        content: body.content?.trim(),
        excerpt: body.excerpt?.trim() || null,
        category: body.category,
        imageUrl: body.imageUrl || null,
        published: body.published ?? existingPost.published,
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

    console.log("✅ Post mis à jour:", updatedPost.id);

    return NextResponse.json({
      success: true,
      message: "Article mis à jour avec succès",
      post: updatedPost,
    });
  } catch (error: any) {
    console.error("❌ Erreur mise à jour post:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la mise à jour",
      },
      { status: 500 }
    );
  }
}
