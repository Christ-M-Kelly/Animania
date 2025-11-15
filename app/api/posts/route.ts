import { getCurrentUser } from "@/app/api/utils/auth";
import { prisma } from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📝 Données reçues:", body);

    // Vérifier l'authentification
    const currentUser = await getCurrentUser(request);

    let authorId = currentUser?.id;

    // Si pas d'utilisateur connecté, utiliser l'authorId fourni ou créer un utilisateur temporaire
    if (!authorId) {
      if (body.authorId) {
        // Vérifier que l'utilisateur existe
        const existingUser = await prisma.user.findUnique({
          where: { id: body.authorId },
        });

        if (existingUser) {
          authorId = body.authorId;
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Utilisateur spécifié non trouvé",
            },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Authentification requise",
          },
          { status: 401 }
        );
      }
    }

    const { title, content, category, published = false } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Données manquantes",
          required: ["title", "content", "category"],
          received: {
            title: !!title,
            content: !!content,
            category: !!category,
          },
        },
        { status: 400 }
      );
    }

    // Création du post
    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        excerpt: body.excerpt?.trim() || null,
        category: category,
        imageUrl: body.imageUrl || null,
        published: published,
        authorId: authorId,
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

    const statusMessage = published
      ? "Article publié avec succès"
      : "Brouillon enregistré avec succès";
    console.log(`✅ ${statusMessage}:`, post.id);

    return NextResponse.json(
      {
        success: true,
        message: statusMessage,
        post: post,
        isDraft: !published,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Erreur création post:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Un article avec ce titre existe déjà",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la création de l'article",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// GET pour récupérer les posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const authorId = searchParams.get("authorId");
    const category = searchParams.get("category");

    const whereCondition: any = {};

    if (published !== null) {
      whereCondition.published = published === "true";
    }

    if (authorId) {
      whereCondition.authorId = authorId;
    }

    if (category) {
      whereCondition.category = category;
    }

    const posts = await prisma.post.findMany({
      where: whereCondition,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      posts: posts,
      count: posts.length,
    });
  } catch (error: any) {
    console.error("❌ Erreur récupération posts:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des articles",
      },
      { status: 500 }
    );
  }
}
