"use client";

interface User {
  name: string;
  email: string;
}

export function useAuth() {
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const getUser = (): User | null => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      try {
        return userStr ? JSON.parse(userStr) : null;
      } catch (error) {
        console.error(
          "Erreur lors de la lecture des données utilisateur:",
          error
        );
        return null;
      }
    }
    return null;
  };

  const login = (userData: User, token: string) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userData.name);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    return !!getToken() && !!getUser();
  };

  return {
    login,
    logout,
    getToken,
    getUser,
    isAuthenticated,
  };
}
