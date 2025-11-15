import { prisma } from "@/app/db/prisma";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET =
  process.env.JWT_SECRET as string ;

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export function generateToken(
  payload: Omit<JWTPayload, "iat" | "exp">
): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error("Token invalide");
  }
}

export async function getCurrentUser(request: NextRequest) {
  try {
    // Essayer d'abord les cookies
    let token = request.cookies.get("auth-token")?.value;

    // Si pas de cookie, essayer l'header Authorization
    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      console.log("🔍 Aucun token trouvé");
      return null;
    }

    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      console.log("❌ Utilisateur non trouvé pour le token");
      return null;
    }

    return user;
  } catch (error) {
    console.error("❌ Erreur vérification token:", error);
    return null;
  }
}
