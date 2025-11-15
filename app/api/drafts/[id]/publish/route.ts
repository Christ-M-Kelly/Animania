import { prisma } from "@/app/db/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini");
}

export async function POST(
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

    // Récupérer le brouillon
    const draft = await prisma.draft.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
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
        { error: "Vous n'êtes pas autorisé à publier ce brouillon" },
        { status: 403 }
      );
    }

    console.log("✅ Brouillon trouvé:", draft.title);

    // Générer le slug pour la publication
    const generateSlug = (title: string) => {
      return (
        title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "") +
        "-" +
        Date.now()
      );
    };

    const slug = generateSlug(draft.title);

    // Créer le post à partir du brouillon
    const post = await prisma.post.create({
      data: {
        title: draft.title,
        content: draft.content,
        excerpt: draft.excerpt,
        category: draft.category,
        slug: slug,
        imageUrl: draft.imageUrl,
        published: true,
        featured: false,
        tags: draft.tags,
        authorId: draft.authorId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    // Supprimer le brouillon après publication
    await prisma.draft.delete({
      where: { id },
    });

    console.log("✅ Brouillon publié et transféré:", {
      draftId: id,
      postId: post.id,
      title: post.title,
      slug: post.slug,
    });

    return NextResponse.json({
      message: "Brouillon publié avec succès",
      post: post,
    });
  } catch (error) {
    console.error("❌ Erreur lors de la publication du brouillon:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
