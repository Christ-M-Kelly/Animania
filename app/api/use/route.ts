import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prisma";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "votre_clé_secrète";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

      const userId = decoded.id;
      console.log("ID utilisateur décodé:", userId);

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Utilisateur non trouvé." },
          { status: 404 }
        );
      }

      const { ...userWithoutPassword } = user;
      return NextResponse.json({
        ...userWithoutPassword,
        createdAt: user.createdAt.toISOString(),
      });
    } catch {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de l'utilisateur:",
      error
    );
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données." },
      { status: 500 }
    );
  }
}
