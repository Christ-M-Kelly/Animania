import { prisma } from "@/app/db/prisma";
import { put } from "@vercel/blob";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export async function POST(req: Request) {
  console.log("🔥 API /api/posts POST appelée");

  try {
    // Vérifier l'authentification
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
      console.log("✅ Token valide pour l'utilisateur:", decoded.userId);
    } catch (jwtError) {
      return NextResponse.json(
        { error: "Token d'authentification invalide" },
        { status: 401 }
      );
    }

    // Lecture des données du formulaire
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const isDraft = formData.get("isDraft") === "true";
    const imageFile = formData.get("image") as File | null;

    console.log("📦 Données extraites:", {
      title: title?.substring(0, 50),
      category,
      hasContent: !!content,
      hasImage: !!imageFile,
      isDraft: isDraft,
      userId: decoded.userId,
    });

    // Validation des champs requis
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "Titre, contenu et catégorie sont requis" },
        { status: 400 }
      );
    }

    // Validation de la catégorie
    const validCategories = ["TERRESTRES", "MARINS", "AERIENS", "EAU_DOUCE"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Catégorie invalide" },
        { status: 400 }
      );
    }

    // Upload de l'image sur Vercel Blob si présente
    let imageUrl = null;
    if (imageFile && imageFile.size > 0 && BLOB_TOKEN) {
      try {
        console.log("🖼️ Upload de l'image:", imageFile.name);

        const timestamp = Date.now();
        const cleanName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${
          isDraft ? "drafts" : "posts"
        }/${timestamp}-${cleanName}`;

        const buffer = Buffer.from(await imageFile.arrayBuffer());

        const blob = await put(fileName, buffer, {
          access: "public",
          token: BLOB_TOKEN,
        });

        imageUrl = blob.url;
        console.log("✅ Image uploadée:", imageUrl);
      } catch (uploadError) {
        console.error("❌ Erreur upload image:", uploadError);
      }
    }

    // Vérification de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      console.error(
        "❌ ERREUR CRITIQUE: Utilisateur non trouvé avec l'ID:",
        decoded.userId
      );
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    console.log("✅ Utilisateur vérifié:", {
      id: user.id,
      name: user.name,
      email: user.email,
    });

    if (isDraft) {
      // SAUVEGARDER COMME BROUILLON dans la table Draft
      console.log("📝 Sauvegarde comme brouillon dans table Draft");

      const draftData = {
        title: title,
        content: content,
        excerpt: excerpt || content.substring(0, 200) + "...",
        category: category,
        imageUrl: imageUrl,
        tags: [],
        authorId: user.id,
      };

      const draft = await prisma.draft.create({
        data: draftData,
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

      console.log("✅ Brouillon créé avec succès:", {
        draftId: draft.id,
        title: draft.title,
        authorId: draft.authorId,
        authorName: draft.author.name,
      });

      return NextResponse.json(
        {
          message: "Brouillon sauvegardé avec succès",
          draft: draft,
          type: "draft",
        },
        { status: 201 }
      );
    } else {
      // PUBLIER DIRECTEMENT comme Post
      console.log("📢 Publication directe dans table Post");

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

      const slug = generateSlug(title);

      const postData = {
        title: title,
        content: content,
        excerpt: excerpt || content.substring(0, 200) + "...",
        category: category,
        slug: slug,
        imageUrl: imageUrl,
        published: true, // ← Toujours publié quand ce n'est pas un brouillon
        featured: false,
        tags: [],
        authorId: user.id,
      };

      const post = await prisma.post.create({
        data: postData,
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

      console.log("✅ Post publié avec succès:", {
        postId: post.id,
        title: post.title,
        slug: post.slug,
        authorId: post.authorId,
        authorName: post.author.name,
      });

      return NextResponse.json(
        {
          message: "Article publié avec succès",
          post: post,
          type: "post",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("💥 Erreur générale dans l'API posts:", error);
    return NextResponse.json(
      {
        error: "Erreur interne du serveur",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
