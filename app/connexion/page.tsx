"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import C_Footer from "./C_Footer";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      } else {
        if (!data.user?.name || !data.token) {
          throw new Error("Données de connexion invalides");
        }

        const userData = {
          name: data.user.name,
          email: data.user.email,
        };

        login(userData, data.token);
        setSuccess(`Bonjour, ${userData.name} !`);
        router.push(decodeURIComponent(returnUrl));
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <main className="relative flex min-h-screen flex-col items-center justify-center py-12">
        <video
          src="/videos/2_chiots.mp4"
          autoPlay
          muted
          loop
          className="fixed left-0 top-0 z-[-1] size-full object-cover"
        />
        <div className="fixed left-0 top-0 z-[-1] size-full bg-gradient-to-b from-black/80 via-black/60 to-green-900/40" />

        <div className="relative z-10 w-[90%] max-w-md rounded-3xl border border-green-200/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md md:p-10">
          <h2 className="mb-6 text-center text-2xl font-bold text-green-100 md:mb-8 md:text-3xl">
            Connexion
          </h2>
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
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-green-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="mt-1 block w-full rounded-xl border border-green-200/20 bg-white/10 px-3 py-2.5 text-sm text-green-100 transition-all duration-200 placeholder:text-green-300/50 focus:border-green-400 focus:ring-2 focus:ring-green-300/40"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-green-200"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1 block w-full rounded-xl border border-green-200/20 bg-white/10 px-3 py-2.5 text-sm text-green-100 transition-all duration-200 placeholder:text-green-300/50 focus:border-green-400 focus:ring-2 focus:ring-green-300/40"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-100 transition-colors duration-200 hover:text-green-400"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-green-500 to-green-700 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:from-green-600 hover:to-green-800"
            >
              Se connecter
            </button>
            <div className="mt-20 text-center text-green-200">
              <div className="mb-6 flex items-center">
                <div className="grow border-t border-green-200/30" />
                <span className="mx-4 text-sm">Pas encore de compte ?</span>
                <div className="grow border-t border-green-200/30" />
              </div>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  router.push("/formulaire_inscription");
                }}
                className="w-full rounded-xl border-2 border-green-200/20 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-green-200/20"
              >
                S'inscrire
              </button>
            </div>
          </form>
        </div>

        <C_Footer />
      </main>
    </div>
  );
}
