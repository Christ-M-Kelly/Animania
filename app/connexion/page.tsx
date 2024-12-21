"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import C_Footer from "./C_Footer";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        toast.success(`Bonjour, ${userData.name} !`);
        router.push(decodeURIComponent(returnUrl));
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <main className="relative min-h-screen flex flex-col items-center justify-center py-12">
        <video
          src="/videos/2_chiots.mp4"
          autoPlay
          muted
          loop
          className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
        />
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-black/60 to-green-900/40 z-[-1]" />

        <div className="relative bg-white/10 p-6 md:p-10 rounded-3xl shadow-2xl w-[90%] max-w-md backdrop-blur-md border border-green-200/20 z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-green-100">
            Connexion
          </h2>
          {error && (
            <div className="text-red-600 text-sm text-center mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-200 mb-1.5"
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
                className="mt-1 block w-full px-3 py-2.5 rounded-xl bg-white/10 border border-green-200/20 focus:border-green-400 focus:ring-2 focus:ring-green-300/40 transition-all duration-200 text-green-100 placeholder-green-300/50 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-green-200 mb-1.5"
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
                  className="mt-1 block w-full px-3 py-2.5 rounded-xl bg-white/10 border border-green-200/20 focus:border-green-400 focus:ring-2 focus:ring-green-300/40 transition-all duration-200 text-green-100 placeholder-green-300/50 text-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-100 hover:text-green-400 transition-colors duration-200"
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
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2.5 rounded-xl hover:from-green-600 hover:to-green-800 transform hover:scale-[1.02] transition-all duration-200 font-medium text-sm mt-6"
            >
              Se connecter
            </button>
            <div className="text-center text-green-200 mt-20">
              <div className="flex items-center mb-6">
                <div className="flex-grow border-t border-green-200/30" />
                <span className="mx-4 text-sm">Pas encore de compte ?</span>
                <div className="flex-grow border-t border-green-200/30" />
              </div>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  router.push("/formulaire_inscription");
                }}
                className="w-full border-2 border-green-200/20 text-white py-2.5 rounded-xl hover:bg-green-200/20 transition-all duration-200 font-medium text-sm"
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
