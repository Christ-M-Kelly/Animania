"use client";

import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

interface HeaderProps {
  className?: string;
}

// Ajouter cette interface
interface DecodedToken {
  exp: number;
}

// Ajouter cette interface pour définir la structure du menu
interface MenuItem {
  name: string;
  href: string;
  subMenu?: {
    name: string;
    href: string;
  }[];
}

export default function Header({ className }: HeaderProps) {
  const [isClient, setIsClient] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Gestionnaire de clic à l'extérieur amélioré
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('[role="menu"]') &&
        !target.closest('[aria-haspopup="true"]')
      ) {
        setActiveSubMenu(null);
        setLastClickTime(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (e: React.MouseEvent, link: MenuItem) => {
    e.preventDefault();
    const currentTime = new Date().getTime();

    if (!link.subMenu) {
      window.location.href = link.href;
      return;
    }

    // Double-clic détection (300ms d'intervalle)
    if (currentTime - lastClickTime < 300 && activeSubMenu === link.name) {
      // Navigation sur double-clic rapide
      window.location.href = link.href;
      setActiveSubMenu(null);
    } else if (activeSubMenu === link.name) {
      // Simple clic sur menu ouvert : fermer le menu
      setActiveSubMenu(null);
    } else {
      // Simple clic sur menu fermé : ouvrir le menu
      setActiveSubMenu(link.name);
    }

    setLastClickTime(currentTime);
  };

  // Fonction pour vérifier si le token est valide
  const isTokenValid = () => {
    if (!isClient) return false;
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp > currentTime;
      } catch {
        return false;
      }
    }
    return false;
  };

  const userName = isClient ? localStorage.getItem("userName") : null;

  // Vérification de l'état de l'authentification
  const isAuthenticated = isTokenValid();

  const menu_navigation = [
    {
      name: "Accueil",
      href: "/",
    },
    {
      name: "A propos",
      href: "/a-propos",
      subMenu: [
        {
          name: "Qui sommes-nous",
          href: "/a-propos/qui-sommes-nous",
        },
        {
          name: "Notre équipe",
          href: "/a-propos/notre-equipe",
        },
        {
          name: "Nous contacter",
          href: "/a-propos/contact",
        },
      ],
    },
    {
      name: "Articles",
      href: "/articles",
      subMenu: [
        {
          name: "Toutes les catégories",
          href: "/articles",
        },
        {
          name: "Animaux Marins",
          href: "/articles/animaux-marins",
        },
        {
          name: "Animaux Terrestres",
          href: "/articles/animaux-terrestres",
        },
        {
          name: "Animaux Aériens  ",
          href: "/articles/animaux-aerien",
        },
        {
          name: "Animaux d'eau douce",
          href: "/articles/animaux-d-eau-douce",
        },
      ],
    },
    {
      name: "Galerie",
      href: "/galerie",
    },
  ];

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    window.location.reload(); // Recharger la page pour mettre à jour l'interface
  };

  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="relative">
      <header
        className={`my-4 flex items-center gap-2 rounded-lg border bg-gradient-to-r from-green-400 to-green-600 shadow-xl ${className} mx-4 px-3 transition-all duration-300 lg:mx-24`}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Section gauche avec logo */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image
                src="/images/logo_rbg.png"
                width={90}
                height={90}
                alt="logo = image d'un chien et d'un chat"
                className="rounded-full border-2 border-white bg-white shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Bouton hamburger pour mobile - ajouté ici pour garder la structure originale */}
            <button
              className="p-2 text-white transition-colors hover:text-amber-200 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            <nav aria-label="Navigation principale">
              <ul className="ml-8 hidden flex-row space-x-12 md:flex">
                {/* Ajout de ml-4 pour décaler le menu vers le centre */}
                {menu_navigation.map((link) => (
                  <li key={link.name} className="group relative">
                    <Link
                      href={link.href}
                      className={`
                        relative z-10 flex items-center gap-1 
                        px-3 py-1 text-white duration-300 
                        after:absolute after:inset-x-0 after:-bottom-2 
                        after:h-1 after:origin-left after:bg-amber-700 
                        after:transition-transform after:content-[''] hover:text-amber-700
                        ${
                          isActivePath(link.href)
                            ? "text-amber-400 after:scale-x-100"
                            : "after:scale-x-0 group-hover:after:scale-x-100"
                        }
                      `}
                      onClick={(e) => link.subMenu && handleMenuClick(e, link)}
                      aria-expanded={activeSubMenu === link.name}
                      aria-haspopup={!!link.subMenu}
                    >
                      {link.name}
                      {link.subMenu && (
                        <span
                          className={`ml-0.5 text-[10px] transition-all duration-200 ${
                            activeSubMenu === link.name ? "-rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        >
                          ▼
                        </span>
                      )}
                    </Link>
                    {link.subMenu && activeSubMenu === link.name && (
                      <div
                        className={`
                          animate-dropdownFade absolute left-0 z-50 mt-4 w-64 origin-top-left rounded-lg
                          border-t-2 border-amber-500/50 bg-white/95 py-2 shadow-lg backdrop-blur-sm 
                          transition-all duration-200 ease-out
                        `}
                        style={{
                          marginTop: "1.25rem",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={`${link.name}-menu`}
                      >
                        <div className="absolute left-0 top-0 h-4 w-full -translate-y-full bg-transparent" />
                        {link.subMenu.map((subLink, index) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            className={`
                              group/item relative block px-5 py-3 text-gray-600 
                              transition-all duration-200 hover:bg-amber-50/80 hover:text-amber-700
                              ${index === 0 ? "rounded-t-lg" : ""}
                              ${
                                index === link.subMenu.length - 1
                                  ? "rounded-b-lg"
                                  : ""
                              }
                            `}
                            role="menuitem"
                            onClick={() => {
                              setActiveSubMenu(null);
                              setLastClickTime(0);
                            }}
                          >
                            <span className="relative flex items-center">
                              <span className="absolute left-0 h-full w-0.5 scale-y-0 bg-amber-500 transition-transform duration-200 group-hover/item:scale-y-100" />
                              <span className="relative pl-3">
                                {subLink.name}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Barre de recherche et utilisateur */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="group relative">
                  <button
                    className="flex items-center gap-2 font-semibold text-white transition-colors duration-200 hover:text-amber-200"
                    aria-haspopup="true"
                    aria-expanded={activeSubMenu === "userMenu"}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSubMenu(
                        activeSubMenu === "userMenu" ? null : "userMenu"
                      );
                    }}
                  >
                    <span className="hidden sm:inline">{`Bonjour, ${userName}`}</span>
                    <span className="sm:hidden">👤</span>
                    <span
                      className={`text-[10px] transition-transform duration-200 ${
                        activeSubMenu === "userMenu" ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {activeSubMenu === "userMenu" && (
                    <div
                      className="animate-dropdownFade absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-lg border-t-2
                        border-amber-500/50 bg-white/95 py-2 shadow-lg backdrop-blur-sm transition-all 
                        duration-200 ease-out"
                      role="menu"
                    >
                      <Link
                        href="/profil"
                        className="flex items-center px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-amber-50 hover:text-amber-700"
                        role="menuitem"
                      >
                        <svg
                          className="mr-3 size-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Mon Profil
                      </Link>
                      <Link
                        href="/profil/formulaire_post"
                        className="flex items-center px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-amber-50 hover:text-amber-700"
                        role="menuitem"
                      >
                        <svg
                          className="mr-3 size-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Créer un Post
                      </Link>
                      <div className="my-1 border-t border-gray-100"></div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-amber-50 hover:text-amber-700"
                        role="menuitem"
                      >
                        <svg
                          className="mr-3 size-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/connexion"
                className="rounded-lg bg-green-600 px-2 py-1 text-sm text-white shadow-md transition-all duration-300 hover:bg-green-200 hover:text-green-800 hover:shadow-lg sm:px-4 sm:py-2 sm:text-base"
              >
                <span className="hidden sm:inline">Se connecter</span>
                <span className="sm:hidden">👤</span>
              </Link>
            )}
            {/* Recherche */}
            <div className="hidden md:block">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile - Maintenant à l'extérieur du header avec un positionnement absolu correct */}
      {isMobileMenuOpen && (
        <div className="absolute inset-x-4 top-full z-50 mt-2 rounded-lg border bg-gradient-to-r from-green-400 to-green-600 shadow-lg md:hidden lg:inset-x-24">
          {/* Barre de recherche mobile */}
          <div className="border-b border-white/30 p-4">
            <SearchBar />
          </div>

          <nav className="space-y-1 p-4">
            {menu_navigation.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className="block py-2 font-medium text-white transition-colors hover:text-amber-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {/* Sous-menu mobile */}
                {link.subMenu && (
                  <div className="ml-4 space-y-1">
                    {link.subMenu.map((subLink) => (
                      <Link
                        key={subLink.name}
                        href={subLink.href}
                        className="block py-1 text-sm text-white/80 transition-colors hover:text-amber-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Actions utilisateur mobile */}
            {isAuthenticated && (
              <div className="mt-3 border-t border-white/30 pt-3">
                <Link
                  href="/profil"
                  className="block py-2 font-medium text-white transition-colors hover:text-amber-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mon Profil
                </Link>
                <Link
                  href="/profil/formulaire_post"
                  className="block py-2 font-medium text-white transition-colors hover:text-amber-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Créer un Post
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full py-2 text-left font-medium text-white transition-colors hover:text-amber-200"
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
