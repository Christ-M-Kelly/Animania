import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🧪 Test de connexion à MongoDB...");

    // Test 1: Import de Prisma
    console.log("📦 Import de Prisma...");
    const { prisma } = await import("@/app/db/prisma");
    console.log("✅ Import Prisma réussi");

    // Test 2: Connexion
    console.log("🔌 Test de connexion...");
    await prisma.$connect();
    console.log("✅ Connexion MongoDB réussie");

    // Test 3: Requête simple
    console.log("📊 Test de requête...");
    const userCount = await prisma.user.count();
    console.log("📊 Nombre d'utilisateurs:", userCount);

    // Test 4: Variables d'environnement
    const dbUrl = process.env.DATABASE_URL;
    console.log(
      "🔗 URL de base de données:",
      dbUrl ? "DÉFINIE" : "NON DÉFINIE"
    );

    return NextResponse.json({
      status: "success",
      message: "Tous les tests sont passés",
      data: {
        userCount: userCount,
        databaseUrl: dbUrl ? "DÉFINIE" : "NON DÉFINIE",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Erreur de test:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Erreur lors des tests",
        error: error instanceof Error ? error.message : "Erreur inconnue",
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  } finally {
    try {
      const { prisma } = await import("@/app/db/prisma");
      await prisma.$disconnect();
      console.log("🔌 Déconnexion réussie");
    } catch (disconnectError) {
      console.error("⚠️ Erreur lors de la déconnexion:", disconnectError);
    }
  }
}
