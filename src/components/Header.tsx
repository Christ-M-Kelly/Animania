"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isAuthenticated, logout, getUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const currentUser = getUser();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { href: "/", label: "Accueil" },
    { href: "/posts", label: "Articles" },
    { href: "/galerie", label: "Galerie" },
    { href: "/a-propos", label: "À propos" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-green-600 transition-colors hover:text-green-700"
              onClick={closeMenu}
            >
              🐾 Animania
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Boutons desktop */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-3 md:ml-6">
              {isAuthenticated() ? (
                <>
                  <span className="text-sm text-gray-700">
                    Salut, {currentUser?.name}
                  </span>
                  <Link
                    href="/profil"
                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                  >
                    Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/connexion"
                    className="rounded-md border border-green-600 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/inscription"
                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors hover:bg-green-50 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isMenuOpen ? (
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-600"
                >
                  {item.label}
                </Link>
              ))}

              {/* Separator */}
              <div className="my-2 border-t border-gray-200"></div>

              {/* Auth buttons mobile */}
              {isAuthenticated() ? (
                <>
                  <div className="px-3 py-2 text-base font-medium text-gray-700">
                    Salut, {currentUser?.name}
                  </div>
                  <Link
                    href="/profil"
                    onClick={closeMenu}
                    className="block rounded-md px-3 py-2 text-base font-medium text-green-600 transition-colors hover:bg-green-50"
                  >
                    Mon Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/connexion"
                    onClick={closeMenu}
                    className="block rounded-md px-3 py-2 text-base font-medium text-green-600 transition-colors hover:bg-green-50"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/inscription"
                    onClick={closeMenu}
                    className="block rounded-md bg-green-600 px-3 py-2 text-base font-medium text-white transition-colors hover:bg-green-700"
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
