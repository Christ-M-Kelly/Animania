import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// GET - Récupérer un post par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Article non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Erreur GET post:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("🗑️ Tentative de suppression du post:", id);

    if (!id) {
      console.log("❌ ID manquant");
      return NextResponse.json(
        { success: false, error: "ID de l'article manquant" },
        { status: 400 }
      );
    }

    // Vérifier l'authentification
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      console.log("❌ Pas de token d'authentification");
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    let userId: string;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      userId = decoded.userId;
      console.log("✅ Token valide, userId:", userId);
    } catch (error) {
      console.log("❌ Token invalide:", error);
      return NextResponse.json(
        { success: false, error: "Token invalide" },
        { status: 401 }
      );
    }

    // Vérifier que le post existe
    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true, title: true },
    });

    if (!post) {
      console.log("❌ Post non trouvé:", id);
      return NextResponse.json(
        { success: false, error: "Article non trouvé" },
        { status: 404 }
      );
    }

    console.log("📝 Post trouvé:", post.title);

    // Vérifier que l'utilisateur est l'auteur
    if (post.authorId !== userId) {
      console.log("❌ L'utilisateur n'est pas l'auteur");
      return NextResponse.json(
        { success: false, error: "Non autorisé à supprimer cet article" },
        { status: 403 }
      );
    }

    // Supprimer d'abord les commentaires associés
    const deletedComments = await prisma.comment.deleteMany({
      where: { postId: id },
    });
    console.log("🗑️ Commentaires supprimés:", deletedComments.count);

    // Supprimer le post
    await prisma.post.delete({
      where: { id },
    });

    console.log("✅ Post supprimé avec succès");

    return NextResponse.json({
      success: true,
      message: "Article supprimé avec succès",
    });
  } catch (error) {
    console.error("❌ Erreur DELETE post:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la suppression",
      },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID de l'article manquant" },
        { status: 400 }
      );
    }

    // Vérifier l'authentification
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    let userId: string;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Token invalide" },
        { status: 401 }
      );
    }

    // Vérifier que le post existe et que l'utilisateur est l'auteur
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Article non trouvé" },
        { status: 404 }
      );
    }

    if (post.authorId !== userId) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 403 }
      );
    }

    // Mettre à jour le post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        category: body.category,
        imageUrl: body.imageUrl,
        published: body.published,
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

    return NextResponse.json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.error("Erreur PUT post:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
