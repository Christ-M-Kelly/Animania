import { verifyToken } from "@/app/api/utils/auth";
import { prisma } from "../db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Non autorisé" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      return NextResponse.json(
        { success: false, message: "Token invalide" },
        { status: 401 }
      );
    }

    const { content, postId } = await req.json();

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        authorId: decoded.id as string,
        postId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        comment: {
          ...comment,
          createdAt: comment.createdAt.toISOString()
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur création commentaire:", error);
    return NextResponse.json(
      { success: false, message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}