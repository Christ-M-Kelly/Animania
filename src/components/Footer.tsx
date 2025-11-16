import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold text-green-400 transition-colors hover:text-green-300"
            >
              🐾 Animania
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              Votre communauté dédiée aux animaux. Partagez, découvrez et
              connectez-vous avec d&apos;autres passionnés d&apos;animaux.
            </p>

            {/* Réseaux sociaux */}
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-green-400"
                aria-label="Facebook"
              >
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-green-400"
                aria-label="Instagram"
              >
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.316-1.357C4.265 14.764 3.776 13.613 3.776 12.316c0-1.297.49-2.448 1.357-3.316C5.999 8.133 7.15 7.644 8.449 7.644c1.297 0 2.448.49 3.316 1.357c.867.867 1.357 2.018 1.357 3.316c0 1.297-.49 2.448-1.357 3.316C10.897 16.498 9.746 16.988 8.449 16.988z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-green-400"
                aria-label="Twitter"
              >
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/galerie"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  Galerie
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Catégories
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/posts?category=CHIENS"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  Chiens
                </Link>
              </li>
              <li>
                <Link
                  href="/posts?category=CHATS"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  Chats
                </Link>
              </li>
              <li>
                <Link
                  href="/posts?category=OISEAUX"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  Oiseaux
                </Link>
              </li>
              <li>
                <Link
                  href="/posts?category=AUTRES"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  Autres
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/aide"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  Aide
                </Link>
              </li>
              <li>
                <Link
                  href="/conditions"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-400">
              © 2024 Animania. Tous droits réservés.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link
                href="/mentions-legales"
                className="text-sm text-gray-400 transition-colors hover:text-green-400"
              >
                Mentions légales
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-400 transition-colors hover:text-green-400"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
