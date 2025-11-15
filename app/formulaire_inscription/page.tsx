"use client";

import { useState } from "react";
import Link from "next/link";

export default function Formulaire() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Le nom est requis.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Envoi des données:", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: "***",
        role: "USER",
      });

      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: "USER",
        }),
      });

      console.log("📡 Statut de la réponse:", response.status);
      console.log("📡 Headers de la réponse:", response.headers);

      const result = await response.json();
      console.log("📦 Données reçues:", result);

      if (!response.ok) {
        console.error("Erreur de l'API:", result);
        throw new Error(result.error || `Erreur HTTP: ${response.status}`);
      }

      console.log("Résultat de la création de l'utilisateur:", result);

      setSuccess(`Bienvenue ${result.user.name} !`);

      // Réinitialiser le formulaire
      setFormData({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });

      setTimeout(() => {
        window.location.href = "/connexion";
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      const message =
        (error as Error).message || "Erreur lors de l'envoi des données.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Réinitialiser les messages d'erreur
    if (error) setError("");
    if (success) setSuccess("");
  };

  return (
    <div>
      <main className="relative flex min-h-screen flex-col items-center justify-center py-12">
        <video
          src="https://videos.pexels.com/video-files/856354/856354-hd_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          className="fixed left-0 top-0 z-[-1] size-full object-cover"
        />
        <div className="fixed left-0 top-0 z-[-1] size-full bg-gradient-to-b from-black/80 via-black/60 to-amber-900/40" />

        <div className="relative z-10 w-[90%] max-w-md rounded-3xl border border-amber-200/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md md:p-10">
          <h2 className="mb-6 text-center text-2xl font-bold text-amber-100 md:mb-8 md:text-3xl">
            Créer un compte
          </h2>

          {/* Messages d'erreur et de succès */}
          {error && (
            <div className="mb-4 rounded-xl border border-red-400/50 bg-red-500/20 p-3 text-red-200 backdrop-blur-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-xl border border-green-400/50 bg-green-500/20 p-3 text-green-200 backdrop-blur-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-amber-200"
              >
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                required
                className="mt-1 block w-full rounded-xl border border-amber-200/20 bg-white/10 px-3 py-2.5 text-sm text-amber-100 transition-all duration-200 placeholder:text-amber-300/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-300/40"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-amber-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
                className="mt-1 block w-full rounded-xl border border-amber-200/20 bg-white/10 px-3 py-2.5 text-sm text-amber-100 transition-all duration-200 placeholder:text-amber-300/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-300/40"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-amber-200"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="mt-1 block w-full rounded-xl border border-amber-200/20 bg-white/10 px-3 py-2.5 text-sm text-amber-100 transition-all duration-200 placeholder:text-amber-300/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-300/40"
              />
            </div>
            <div>
              <label
                htmlFor="passwordConfirmation"
                className="mb-1.5 block text-sm font-medium text-amber-200"
              >
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="mt-1 block w-full rounded-xl border border-amber-200/20 bg-white/10 px-3 py-2.5 text-sm text-amber-100 transition-all duration-200 placeholder:text-amber-300/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-300/40"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:from-amber-600 hover:to-amber-800 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 size-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Inscription...
                </div>
              ) : (
                "S'inscrire"
              )}
            </button>
          </form>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/95 via-amber-950/40 to-transparent backdrop-blur-sm">
          <div className="container mx-auto p-8">
            <div className="flex flex-col items-center justify-between space-y-6 border-t border-amber-100/10 pt-6 md:flex-row md:space-y-0">
              <div className="flex items-center space-x-6 md:pl-4">
                <Link
                  href="/"
                  className="text-sm text-amber-100 transition-colors duration-200 hover:scale-105 hover:text-white"
                >
                  Accueil
                </Link>
                <span className="text-amber-100/30">•</span>
                <Link
                  href="/connexion"
                  className="text-sm text-amber-100 transition-colors duration-200 hover:scale-105 hover:text-white"
                >
                  Connexion
                </Link>
              </div>
              <div className="flex flex-1 justify-center">
                <div className="flex items-center space-x-10">
                  <a
                    href="#"
                    className="text-amber-100 transition-all duration-200 hover:rotate-6 hover:scale-110 hover:text-white"
                    aria-label="Facebook"
                  >
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-amber-100 transition-all duration-200 hover:-rotate-6 hover:scale-110 hover:text-white"
                    aria-label="Twitter"
                  >
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-amber-100 transition-all duration-200 hover:rotate-6 hover:scale-110 hover:text-white"
                    aria-label="Instagram"
                  >
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.875.926 1.365 2.077 1.365 3.374s-.49 2.448-1.365 3.323c-.875.807-2.026 1.167-3.323 1.167zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.875-.926-1.365-2.077-1.365-3.374s.49-2.448 1.365-3.323c.875-.926 2.026-1.416 3.323-1.416s2.448.49 3.323 1.416c.875.926 1.365 2.077 1.365 3.374s-.49 2.448-1.365 3.323c-.875.807-2.026 1.167-3.323 1.167z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="text-sm font-light tracking-wider text-amber-100/80 md:pr-4">
                © 2024 Animania. Tous droits réservés.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
