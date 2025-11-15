import { generateToken } from "@/app/api/utils/auth";
import { prisma } from "@/app/db/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, rememberMe } = await request.json();

    console.log("🔐 Tentative de connexion:", { email, rememberMe });

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email et mot de passe requis",
        },
        { status: 400 }
      );
    }

    // Rechercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      console.log("❌ Utilisateur non trouvé:", email);
      return NextResponse.json(
        {
          success: false,
          message: "Email ou mot de passe incorrect",
        },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.log("❌ Mot de passe incorrect pour:", email);
      return NextResponse.json(
        {
          success: false,
          message: "Email ou mot de passe incorrect",
        },
        { status: 401 }
      );
    }

    // Générer le token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    console.log("✅ Connexion réussie:", user.email);

    // Créer la réponse avec le token
    const response = NextResponse.json({
      success: true,
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Définir le cookie (optionnel, pour compatibilité)
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60, // 7 jours ou 1 jour
    });

    return response;
  } catch (error: any) {
    console.error("❌ Erreur login:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur lors de la connexion",
      },
      { status: 500 }
    );
  }
}
