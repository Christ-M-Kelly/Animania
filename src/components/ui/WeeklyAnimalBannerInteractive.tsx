"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const animals = [
  {
    id: 1,
    name: "Lion",
    description:
      "Le roi majestueux de la savane africaine, symbole de force et de leadership dans le règne animal.",
    imageUrl: "/images/weekly/lion.jpg",
    category: "TERRESTRES",
    funFact:
      "Un rugissement de lion peut être entendu jusqu'à 8 kilomètres de distance !",
    gradient: "from-orange-600 to-red-700",
    emoji: "🦁",
  },
  {
    id: 2,
    name: "Dauphin",
    description:
      "L'acrobate intelligent des océans, connu pour sa sociabilité et son intelligence remarquable.",
    imageUrl: "/images/weekly/dolphin.jpg",
    category: "MARINS",
    funFact: "Les dauphins dorment avec une moitié de leur cerveau éveillée !",
    gradient: "from-blue-600 to-cyan-700",
    emoji: "🐋",
  },
  {
    id: 3,
    name: "Aigle Royal",
    description:
      "Le rapace majestueux des montagnes, incarnation de la liberté et de la puissance aérienne.",
    imageUrl: "/images/weekly/eagle.jpg",
    category: "AERIENS",
    funFact: "Leur vision est 8 fois plus précise que celle des humains !",
    gradient: "from-amber-600 to-yellow-700",
    emoji: "🦅",
  },
  {
    id: 4,
    name: "Axolotl",
    description:
      "La salamandre souriante des lacs mexicains, capable de régénérer ses organes.",
    imageUrl: "/images/weekly/axolotl.jpg",
    category: "EAU_DOUCE",
    funFact: "Il peut régénérer son cerveau, son cœur et d'autres organes !",
    gradient: "from-amber-500 to-purple-600",
    emoji: "🦎",
  },
];

export default function WeeklyAnimalBannerInteractive() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentAnimal = animals[currentIndex];

  // Auto-rotation toutes les 8 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % animals.length);
        setIsAnimating(false);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleAnimalChange = (index: number) => {
    if (index !== currentIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-6">
      <section
        className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${currentAnimal.gradient} py-16 shadow-2xl transition-all duration-500`}
      >
        {/* Contenu principal */}
        <div
          className={`relative grid grid-cols-1 items-center gap-6 transition-opacity duration-300 lg:grid-cols-2 ${
            isAnimating ? "opacity-70" : "opacity-100"
          }`}
        >
          {/* Contenu textuel */}
          <div className="relative z-10 px-3 lg:px-6">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-lg">
                🌟 Animal de la Semaine
              </div>

              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                {currentAnimal.name}
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-white/95 md:text-xl">
                {currentAnimal.description}
              </p>

              <div className="mb-8 space-y-4">
                <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md">
                  📍 {currentAnimal.category.replace("_", " ")}
                </span>

                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-md">
                  <span className="font-semibold text-amber-200">
                    💡 Le saviez-vous ?{" "}
                  </span>
                  <span className="text-white">{currentAnimal.funFact}</span>
                </div>
              </div>

              <Link
                href="/articles"
                className="inline-flex items-center rounded-lg bg-white px-8 py-4 font-semibold text-gray-900 shadow-lg transition-all hover:scale-105"
              >
                Découvrir nos articles
                <svg
                  className="ml-3 size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5-5 5M6 12h12"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-96 lg:h-full">
            <Image
              src={currentAnimal.imageUrl}
              alt={currentAnimal.name}
              fill
              className="rounded-lg object-cover shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Navigation manuelle */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
          {animals.map((animal, index) => (
            <button
              key={animal.id}
              onClick={() => handleAnimalChange(index)}
              className={`group relative overflow-hidden rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white p-3 shadow-lg"
                  : "bg-white/30 p-2 hover:bg-white/50"
              }`}
            >
              <span className="text-lg">{animal.emoji}</span>

              {/* Tooltip */}
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white">
                  {animal.name}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Emoji décoratif */}
        <div className="absolute right-10 top-10 animate-pulse text-6xl text-white/10">
          {currentAnimal.emoji}
        </div>
      </section>
    </div>
  );
}
