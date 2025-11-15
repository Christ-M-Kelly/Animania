import { prisma } from "@/app/db/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini");
}

export async function GET(req: Request) {
  try {
    console.log("🔍 API auth/verify appelée");

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Token manquant");
      return NextResponse.json({ error: "Token manquant" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    console.log("🎫 Vérification du token...");

    // Vérifier le token JWT
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
        name: string;
      };
    } catch (jwtError) {
      console.log("❌ Token invalide");
      return NextResponse.json({ error: "Token invalide" }, { status: 401 });
    }

    console.log("✅ Token valide pour:", decoded.userId);

    // Vérifier que l'utilisateur existe toujours
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      console.log("❌ Utilisateur non trouvé");
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    console.log("✅ Utilisateur vérifié:", user.name);

    return NextResponse.json({
      message: "Authentification valide",
      user: user,
    });
  } catch (error) {
    console.error("❌ Erreur vérification auth:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
