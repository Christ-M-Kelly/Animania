import { Suspense } from "react";

// Composant de fallback pour les données
function PostsDebugContent() {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-bold">
        🔍 Debug - Informations système
      </h1>

      <div className="mb-6 rounded border border-gray-300 p-4">
        <h2 className="mb-2 text-lg font-bold">Configuration</h2>
        <div className="space-y-2">
          <p>
            <strong>Environment:</strong> {process.env.NODE_ENV}
          </p>
          <p>
            <strong>Database:</strong>{" "}
            {process.env.DATABASE_URL ? "Configurée" : "Non configurée"}
          </p>
          <p>
            <strong>Build Time:</strong> {new Date().toISOString()}
          </p>
        </div>
      </div>

      <div className="mb-6 rounded border border-gray-300 p-4">
        <h2 className="mb-2 text-lg font-bold">Statut</h2>
        <p className="text-green-600">✅ Application déployée avec succès</p>
        <p className="text-blue-600">
          ℹ️ Les données sont chargées dynamiquement côté client
        </p>
      </div>
    </div>
  );
}

export default function DebugPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl p-8">
          <div className="animate-pulse">
            <div className="mb-4 h-8 rounded bg-gray-200"></div>
            <div className="h-32 rounded bg-gray-200"></div>
          </div>
        </div>
      }
    >
      <PostsDebugContent />
    </Suspense>
  );
}
