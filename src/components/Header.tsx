"use client";

import Link from "next/link";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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
    <header
      className={`my-4 flex border items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-xl ${className} px-3 mx-24 transition-all duration-300 `}
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
              className="rounded-full border-2 border-white shadow-lg hover:scale-105 transition-transform duration-300 bg-white"
            />
          </Link>
          <nav aria-label="Navigation principale">
            <ul className="flex flex-row space-x-12 ml-8">
              {/* Ajout de ml-4 pour décaler le menu vers le centre */}
              {menu_navigation.map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`
                      relative text-white flex items-center gap-1 
                      after:content-[''] after:absolute after:left-0 after:right-0 
                      after:-bottom-2 after:h-1 after:bg-amber-700 
                      after:origin-left after:transition-transform duration-300 
                      hover:text-amber-700 z-10 px-3 py-1
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
                        className={`text-[10px] ml-0.5 transition-all duration-200 ${
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
                        absolute left-0 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg py-2
                        border-t-2 border-amber-500/50 transform origin-top-left transition-all duration-200 
                        ease-out animate-dropdownFade mt-4 z-50
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
                      <div className="absolute top-0 left-0 w-full h-4 -translate-y-full bg-transparent" />
                      {link.subMenu.map((subLink, index) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          className={`
                            block px-5 py-3 text-gray-600 hover:bg-amber-50/80 hover:text-amber-700 
                            transition-all duration-200 group/item relative
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
                            <span className="absolute left-0 w-0.5 h-full bg-amber-500 scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200" />
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
              <div className="relative group">
                <button
                  className="flex items-center gap-2 font-semibold text-white hover:text-amber-200 transition-colors duration-200"
                  aria-haspopup="true"
                  aria-expanded={activeSubMenu === "userMenu"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSubMenu(
                      activeSubMenu === "userMenu" ? null : "userMenu"
                    );
                  }}
                >
                  <span>{`Bonjour, ${userName}`}</span>
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
                    className="absolute right-0 w-56 mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg py-2
                      border-t-2 border-amber-500/50 transform origin-top-right transition-all duration-200 
                      ease-out animate-dropdownFade z-50"
                    role="menu"
                  >
                    <Link
                      href="/profil"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                      role="menuitem"
                    >
                      <svg
                        className="w-5 h-5 mr-3"
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
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                      role="menuitem"
                    >
                      <svg
                        className="w-5 h-5 mr-3"
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
                    <Link
                      href="/dashboard/statistiques"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                      role="menuitem"
                    >
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Statistiques
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                      role="menuitem"
                    >
                      <svg
                        className="w-5 h-5 mr-3"
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
              className="rounded-lg bg-green-600 px-4 py-2 text-white transition-all duration-300 hover:bg-green-200 shadow-md hover:shadow-lg hover:text-green-800"
            >
              Se connecter
            </Link>
          )}
          {/* Recherche */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 4a6 6 0 100 12 6 6 0 000-12zM21 21l-4.35-4.35"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:border-green-500"
              aria-label="Barre de recherche"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
