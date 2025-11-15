import { generateToken } from "@/app/api/utils/auth";
import { prisma } from "@/app/db/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    console.log("📝 Tentative d'inscription:", { name, email });

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Nom, email et mot de passe requis",
        },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Format d'email invalide",
        },
        { status: 400 }
      );
    }

    // Validation mot de passe
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Le mot de passe doit contenir au moins 6 caractères",
        },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Un compte avec cet email existe déjà",
        },
        { status: 409 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: "USER",
      },
    });

    // Générer le token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    console.log("✅ Inscription réussie:", user.email);

    // Créer la réponse avec le token
    const response = NextResponse.json({
      success: true,
      message: "Inscription réussie",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Définir le cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 jours
    });

    return response;
  } catch (error: any) {
    console.error("❌ Erreur inscription:", error);

    // Gestion des erreurs Prisma
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Un compte avec cet email existe déjà",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur lors de l'inscription",
      },
      { status: 500 }
    );
  }
}
