import React from "react";
import Image from "next/image";
import Link from "next/link";

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
    slug: "lion",
  },
  {
    id: 2,
    name: "Dauphin",
    description:
      "L'acrobate intelligent des océans, connu pour sa sociabilité et son intelligence remarquable.",
    imageUrl: "/images/weekly/dolphin.jpg",
    category: "MARINS",
    funFact: "Les dauphins dorment avec une moitié de leur cerveau éveillée !",
    slug: "dauphin",
  },
  {
    id: 3,
    name: "Aigle Royal",
    description:
      "Le rapace majestueux des montagnes, incarnation de la liberté et de la puissance aérienne.",
    imageUrl: "/images/weekly/aigle_royal.jpg",
    category: "AERIENS",
    funFact: "Leur vision est 8 fois plus précise que celle des humains !",
    slug: "aigle-royal",
  },
  {
    id: 4,
    name: "Axolotl",
    description:
      "La salamandre souriante des lacs mexicains, capable de régénérer ses organes.",
    imageUrl: "/images/weekly/axolotl.jpg",
    category: "EAU_DOUCE",
    funFact: "Il peut régénérer son cerveau, son cœur et d'autres organes !",
    slug: "axolotl",
  },
];

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek);
}

function getCategoryPath(category: string) {
  const categoryMap: Record<string, string> = {
    TERRESTRES: "animaux-terrestres",
    MARINS: "animaux-marins",
    AERIENS: "animaux-aerien",
    EAU_DOUCE: "animaux-d-eau-douce",
  };
  return categoryMap[category] || "articles";
}

export default function WeeklyAnimalBanner() {
  const weekNumber = getWeekNumber();
  const selectedAnimal = animals[weekNumber % animals.length];
  const categoryPath = getCategoryPath(selectedAnimal.category);

  return (
    <>
      {/* Séparateur décoratif simplifié */}
      <div className="relative h-20 w-full bg-gradient-to-b from-white to-green-50/50">
        <div className="absolute -bottom-px left-0 w-full overflow-hidden">
          <svg
            className="relative block h-12 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-green-600/5"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6">
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-800 py-16">
          <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="relative z-10 px-3 lg:px-6">
              <div className="text-center lg:text-left">
                <div className="mb-6 inline-block -rotate-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:rotate-0 hover:shadow-xl">
                  🌟 Animal de la Semaine
                </div>

                <h2 className="text-shadow-lg mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                  {selectedAnimal.name}
                </h2>

                <p className="mb-8 text-lg leading-relaxed text-white/90 md:text-xl">
                  {selectedAnimal.description}
                </p>

                <div className="mb-8 flex flex-col items-center justify-center gap-4 md:flex-row lg:items-start lg:justify-start">
                  <span className="rounded-full border border-green-400/20 bg-green-700/30 px-5 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md">
                    {selectedAnimal.category.replace("_", " ")}
                  </span>

                  <div className="rounded-full bg-gradient-to-r from-amber-500/80 to-amber-600/80 px-6 py-2 text-sm text-white shadow-lg backdrop-blur-md">
                    <span className="font-semibold">Le saviez-vous ? </span>
                    {selectedAnimal.funFact}
                  </div>
                </div>

                <Link
                  href={`/articles/${categoryPath}`}
                  className="group inline-flex items-center rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-amber-600 hover:shadow-lg"
                >
                  En savoir plus
                  <svg
                    className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="relative hidden h-full min-h-[350px] lg:block">
              <div className="absolute inset-0 overflow-hidden rounded-l-xl">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-green-800/50 to-transparent"></div>
                <Image
                  src={selectedAnimal.imageUrl}
                  alt={`${selectedAnimal.name} - Animal de la semaine`}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  priority
                  className="transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Image mobile */}
            <div className="absolute inset-0 lg:hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/40"></div>
              <Image
                src={selectedAnimal.imageUrl}
                alt={`${selectedAnimal.name} - Animal de la semaine`}
                fill
                style={{ objectFit: "cover" }}
                priority
                className="transition-transform duration-700 hover:scale-105"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Vague décorative en bas */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block h-6 w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="fill-green-600/20"
              />
            </svg>
          </div>
        </section>
      </div>
    </>
  );
}
