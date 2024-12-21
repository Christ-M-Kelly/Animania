import { prisma } from "@/app/db/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(`Utilisateur avec l'email ${email} non trouvé`); // Log utile pour déboguer
      return new Response(
        JSON.stringify({ success: false, message: "Utilisateur non trouvé." }),
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.error(`Mot de passe incorrect pour l'utilisateur ${email}`);
      return new Response(
        JSON.stringify({ success: false, message: "Mot de passe incorrect." }),
        { status: 401 }
      );
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Inclure les informations de l'utilisateur dans la réponse
    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email
      },
      token: token
    });
  } catch (error) {
    console.error("Erreur interne:", error); // Ajout du log pour les erreurs serveur
    return new Response(
      JSON.stringify({ success: false, message: "Erreur interne." }),
      { status: 500 }
    );
  }
}
