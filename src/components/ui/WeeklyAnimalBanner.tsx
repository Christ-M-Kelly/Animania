import Image from "next/image";
import Link from "next/link";

const animals = [
  {
    id: 1,
    name: "Lion",
    description:
      "Le roi majestueux de la savane africaine, symbole de force et de leadership dans le règne animal.",
    imageUrl: "/images/weekly/lion.jpg", // Votre image du lion
    category: "TERRESTRES",
    funFact:
      "Un rugissement de lion peut être entendu jusqu'à 8 kilomètres de distance !",
    slug: "lion",
    gradient: "from-orange-600 to-red-700", // Couleurs chaudes pour le lion
  },
  {
    id: 2,
    name: "Dauphin",
    description:
      "L'acrobate intelligent des océans, connu pour sa sociabilité et son intelligence remarquable.",
    imageUrl: "/images/weekly/dolphin.jpg", // Votre image du dauphin
    category: "MARINS",
    funFact: "Les dauphins dorment avec une moitié de leur cerveau éveillée !",
    slug: "dauphin",
    gradient: "from-blue-600 to-cyan-700", // Couleurs océan
  },
  {
    id: 3,
    name: "Aigle Royal",
    description:
      "Le rapace majestueux des montagnes, incarnation de la liberté et de la puissance aérienne.",
    imageUrl: "/images/weekly/eagle.jpg", // Votre image de l'aigle
    category: "AERIENS",
    funFact: "Leur vision est 8 fois plus précise que celle des humains !",
    slug: "aigle-royal",
    gradient: "from-amber-600 to-yellow-700", // Couleurs dorées
  },
  {
    id: 4,
    name: "Axolotl",
    description:
      "La salamandre souriante des lacs mexicains, capable de régénérer ses organes.",
    imageUrl: "/images/weekly/axolotl.jpg", // Votre image de l'axolotl
    category: "EAU_DOUCE",
    funFact: "Il peut régénérer son cerveau, son cœur et d'autres organes !",
    slug: "axolotl",
    gradient: "from-amber-500 to-purple-600", // Couleurs douces pour l'axolotl
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
      {/* Séparateur décoratif */}
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
        <section
          className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${selectedAnimal.gradient} py-16 shadow-2xl`}
        >
          <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            {/* Contenu textuel */}
            <div className="relative z-10 px-3 lg:px-6">
              <div className="text-center lg:text-left">
                {/* Badge Weekly avec animation */}
                <div className="mb-6 inline-block -rotate-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:rotate-0 hover:shadow-xl">
                  🌟 Animal de la Semaine #{(weekNumber % 4) + 1}
                </div>

                {/* Titre avec effet */}
                <h2 className="text-shadow-lg mb-6 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
                  {selectedAnimal.name}
                </h2>

                {/* Description */}
                <p className="mb-8 text-lg leading-relaxed text-white/95 md:text-xl">
                  {selectedAnimal.description}
                </p>

                {/* Badges informatifs */}
                <div className="mb-8 flex flex-col items-center justify-center gap-4 md:flex-row lg:items-start lg:justify-start">
                  {/* Badge catégorie */}
                  <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md">
                    📍 {selectedAnimal.category.replace("_", " ")}
                  </span>

                  {/* Fun fact */}
                  <div className="max-w-sm rounded-full bg-gradient-to-r from-amber-500/80 to-amber-600/80 px-6 py-2 text-sm text-white shadow-lg backdrop-blur-md">
                    <span className="font-semibold">💡 Le saviez-vous ? </span>
                    {selectedAnimal.funFact}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/articles/${categoryPath}`}
                  className="group inline-flex items-center rounded-lg bg-white px-8 py-4 font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-xl"
                >
                  <span>Découvrir cette catégorie</span>
                  <svg
                    className="ml-3 size-5 transition-transform duration-200 group-hover:translate-x-1"
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

            {/* Image de l'animal */}
            <div className="relative hidden h-full min-h-[400px] lg:block">
              <div className="absolute inset-0 overflow-hidden rounded-l-xl">
                {/* Overlay dégradé pour meilleure lisibilité */}
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/30 via-transparent to-transparent"></div>

                {/* Image avec effet hover */}
                <Image
                  src={selectedAnimal.imageUrl}
                  alt={`${selectedAnimal.name} - Animal de la semaine`}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  priority
                  className="transition-transform duration-700 hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Cadre décoratif */}
                <div className="pointer-events-none absolute inset-2 rounded-lg border-2 border-white/20"></div>
              </div>
            </div>

            {/* Image mobile en arrière-plan */}
            <div className="absolute inset-0 lg:hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
              <Image
                src={selectedAnimal.imageUrl}
                alt={`${selectedAnimal.name} - Animal de la semaine`}
                fill
                style={{ objectFit: "cover" }}
                priority
                className="transition-transform duration-700"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Indicateurs de navigation hebdomadaire */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {animals.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  index === weekNumber % animals.length
                    ? "bg-white shadow-lg"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Particules décoratives */}
          <div className="absolute right-10 top-10 animate-pulse text-6xl text-white/10">
            {selectedAnimal.category === "TERRESTRES" && "🦁"}
            {selectedAnimal.category === "MARINS" && "🐋"}
            {selectedAnimal.category === "AERIENS" && "🦅"}
            {selectedAnimal.category === "EAU_DOUCE" && "🦎"}
          </div>

          {/* Effet de vague en bas */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block h-8 w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="fill-white/10"
              />
            </svg>
          </div>
        </section>
      </div>
    </>
  );
}
