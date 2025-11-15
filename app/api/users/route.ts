import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  console.log("🔥 API /api/users POST appelée");

  try {
    console.log("📥 Lecture du body...");
    const body = await req.json();
    console.log("📦 Body reçu:", { ...body, password: "***" });

    const { name, email, password, role = "USER" } = body;

    // Validation des données
    if (!name || !email || !password) {
      console.log("❌ Validation échouée: champs manquants");
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Validation échouée: email invalide");
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Validation du mot de passe
    if (password.length < 6) {
      console.log("❌ Validation échouée: mot de passe trop court");
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères" },
        { status: 400 }
      );
    }

    console.log("🔍 Vérification de l'utilisateur existant...");

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    console.log(
      "🔍 Utilisateur existant trouvé:",
      existingUser ? "OUI" : "NON"
    );

    if (existingUser) {
      console.log("❌ Utilisateur existe déjà");
      return NextResponse.json(
        { error: "Un compte avec cet email existe déjà" },
        { status: 409 }
      );
    }

    console.log("🔐 Hashage du mot de passe...");
    // Hasher le mot de passe
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("✅ Mot de passe hashé");

    console.log("👤 Création de l'utilisateur...");

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: role,
      },
    });

    console.log("✅ Utilisateur créé avec l'ID:", user.id);

    // Retourner les données sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    const response = {
      message: "Utilisateur créé avec succès",
      user: userWithoutPassword,
    };

    console.log("📤 Réponse envoyée:", {
      ...response,
      user: { ...response.user, id: "***" },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("💥 Erreur dans l'API users:", error);

    if (error instanceof Error) {
      console.error("Message d'erreur:", error.message);
      console.error("Stack trace:", error.stack);
    }

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
  console.log("📋 API GET /api/users appelée");

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        // Ne pas inclure le mot de passe
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("📋 Nombre d'utilisateurs trouvés:", users.length);
    return NextResponse.json({ users });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
