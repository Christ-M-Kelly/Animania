import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Données reçues:", body);
    const { name, email, password: passwordFromBody, role } = body;

    // Vérifiez si tous les champs requis sont présents
    if (!name || !email || !passwordFromBody || !role) {
      console.error("Champs manquants:", {
        name,
        email,
        passwordFromBody,
        role,
      });
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé." },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(passwordFromBody, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Retourner la réponse sans le mot de passe
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'insertion des données:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de l'insertion des données",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
