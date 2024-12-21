"use client";

import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token récupéré:", token);

        if (!token) {
          router.push("/connexion");
          return;
        }

        const response = await fetch("/api/use", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Réponse de l'API:", response);

        if (response.status === 401) {
          localStorage.removeItem("token");
          router.push("/connexion");
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Erreur: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Données de l'utilisateur récupérées:", data);
        setUser(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur:",
          error
        );
        setError(
          "Impossible de récupérer les données de l'utilisateur. Veuillez réessayer plus tard."
        );
        toast.error(
          "Erreur lors de la récupération des données de l'utilisateur."
        );
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-lg w-full p-6 bg-white rounded shadow-lg">
          {error ? (
            <div>{error}</div>
          ) : !user ? (
            <div>Chargement...</div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Profil de {user.name}</h1>
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-700">
                    Date de création :
                  </span>{" "}
                  {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email :</span>{" "}
                  {user.email}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
