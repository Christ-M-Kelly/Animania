import { handleUpload } from "@/app/upload/uploadActions";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prisma";
import { AnimalCategory } from "@prisma/client";

interface DecodedToken {
  id: string;
}
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "true";
    const image = formData.get("image") as File;
    const category = formData.get("category") as AnimalCategory;

    console.log("Données reçues:", {
      title,
      content,
      published,
      image,
      category,
    });

    if (!title || !content) {
      return NextResponse.json(
        { error: "Le titre et le contenu sont requis" },
        { status: 400 }
      );
    }

    let imagePath = null;
    if (image) {
      try {
        const { url } = await handleUpload({
          file: image,
          input: { type: "post" },
        });

        imagePath = url;
      } catch (uploadError) {
        console.error("Erreur upload:", uploadError);
        return NextResponse.json(
          {
            error: "Erreur lors de l'upload de l'image",
            details: String(uploadError),
          },
          { status: 500 }
        );
      }
    }

    const token = request.headers.get("Authorization")?.split(" ")[1];
    let userId: string | null = null;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as DecodedToken;
        userId = decoded.id;
      } catch (error) {
        console.error("Erreur de vérification du token:", error);
        return NextResponse.json({ error: "Token invalide" }, { status: 401 });
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { error: "Aucun utilisateur trouvé" },
        { status: 404 }
      );
    }

    console.log("Catégorie reçue:", category);

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        category,
        imageUrl: imagePath,
        slug: title.toLowerCase().replace(/ /g, "-") + "-" + Date.now(),
        author: {
          connect: { id: user.id },
        },
        views: 0,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Erreur serveur détaillée:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la création du post",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
