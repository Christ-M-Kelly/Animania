"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import type { GalleryItem } from "./page";
import { motion } from "framer-motion";

// Composant Modal
function ImageModal({
  item,
  onClose,
}: {
  item: GalleryItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 p-4 md:p-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        className="h-full flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full md:w-2/3 h-[50vh] md:h-[80vh]">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>

        {/* Informations */}
        <div className="w-full md:w-1/3 text-white">
          <span className="inline-block px-3 py-1 bg-green-600/90 text-white text-sm rounded-full mb-4">
            {item.category.replace("_", " ")}
          </span>
          <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
          <p className="text-gray-300">Photographié par {item.author.name}</p>
        </div>
      </div>
    </div>
  );
}

// Composant principal de la galerie
export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const masonryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeGridItem = (item: HTMLElement) => {
      const grid = masonryRef.current;
      const rowHeight = 20;
      const rowGap = 32; // gap-8 = 2rem = 32px
      if (grid) {
        const imageContainer = item.querySelector(
          ".image-container"
        ) as HTMLElement;
        if (imageContainer) {
          const contentHeight = imageContainer.getBoundingClientRect().height;
          const rowSpan = Math.ceil(
            (contentHeight + rowGap) / (rowHeight + rowGap)
          );
          item.style.gridRowEnd = `span ${rowSpan}`;
        }
      }
    };

    const resizeAllGridItems = () => {
      const allItems = document.getElementsByClassName("masonry-item");
      for (let x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x] as HTMLElement);
      }
    };

    resizeAllGridItems();
    window.addEventListener("resize", resizeAllGridItems);

    // Réappliquer après le chargement des images
    const images = document.querySelectorAll(".masonry-image");
    images.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        if (img.complete) {
          resizeAllGridItems();
        } else {
          img.addEventListener("load", resizeAllGridItems);
        }
      }
    });

    return () => {
      window.removeEventListener("resize", resizeAllGridItems);
    };
  }, [items]);

  return (
    <main className="flex-grow">
      {/* Bannière améliorée */}
      <div className="relative overflow-hidden">
        {/* Fond animé avec parallaxe */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-20 animate-slide"></div>
            {items.slice(0, 6).map((item, index) => (
              <motion.div
                key={item.id}
                className="absolute w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden opacity-20 transform rotate-12 blur-sm"
                initial={{ y: 0 }}
                animate={{
                  y: [-20, 20],
                  x: [-10, 10],
                  rotate: [12, 8, 12],
                }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contenu de la bannière */}
        <div className="relative py-20 md:py-28">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                Galerie Animania
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-12 leading-relaxed max-w-3xl mx-auto">
                Découvrez notre collection de photographies d'animaux
                extraordinaires à travers le monde
              </p>

              {/* Statistiques améliorées */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto">
                <motion.div
                  className="stats-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl font-bold text-white mb-2">
                    {items.length}
                  </div>
                  <div className="text-green-200 text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Photos
                  </div>
                </motion.div>

                <motion.div
                  className="stats-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl font-bold text-white mb-2">
                    {new Set(items.map((item) => item.category)).size}
                  </div>
                  <div className="text-green-200 text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    Catégories
                  </div>
                </motion.div>

                <motion.div
                  className="stats-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl font-bold text-white mb-2">
                    {new Set(items.map((item) => item.author.name)).size}
                  </div>
                  <div className="text-green-200 text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Photographes
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Effet de vague amélioré */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg
            className="relative block w-full h-12 md:h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white/5"
            ></path>
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </div>

      {/* Le reste du composant reste inchangé */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(12deg);
          }
        }
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        /* Ajoutez d'autres styles globaux ici si nécessaire */
      `}</style>

      {/* Grille Masonry */}
      <div className="container mx-auto px-4 py-12">
        <div
          ref={masonryRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8"
          style={{ gridAutoRows: "20px" }} // Hauteur de base pour le calcul
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="masonry-item group cursor-pointer perspective-1000"
              onClick={() => setSelectedItem(item)}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 h-full">
                {/* Image Container */}
                <div className="image-container relative overflow-hidden">
                  <div className="masonry-image-wrapper">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="masonry-image w-full h-auto object-cover transform group-hover:scale-110 transition-all duration-700 ease-in-out"
                      loading="lazy"
                      quality={90}
                    />
                  </div>

                  {/* Overlay avec dégradé amélioré */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                        {item.title}
                      </h3>
                      <p className="text-white/90 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Par {item.author.name}
                      </p>
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                        <span className="px-4 py-1.5 bg-green-600/90 text-white text-sm font-medium rounded-full backdrop-blur-sm shadow-lg border border-green-500/20">
                          {item.category.replace("_", " ")}
                        </span>
                        <span className="text-white/80 text-sm">
                          Cliquez pour agrandir
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </main>
  );
}
