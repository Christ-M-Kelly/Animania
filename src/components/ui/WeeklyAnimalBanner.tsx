import React from "react";
import Image from "next/image";

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
  },
  {
    id: 2,
    name: "Dauphin",
    description:
      "L'acrobate intelligent des océans, connu pour sa sociabilité et son intelligence remarquable.",
    imageUrl: "/images/weekly/dolphin.jpg",
    category: "MARINS",
    funFact: "Les dauphins dorment avec une moitié de leur cerveau éveillée !",
  },
  {
    id: 3,
    name: "Aigle Royal",
    description:
      "Le rapace majestueux des montagnes, incarnation de la liberté et de la puissance aérienne.",
    imageUrl: "/images/weekly/aigle_royal.jpg",
    category: "AERIENS",
    funFact: "Leur vision est 8 fois plus précise que celle des humains !",
  },
  {
    id: 4,
    name: "Axolotl",
    description:
      "La salamandre souriante des lacs mexicains, capable de régénérer ses organes.",
    imageUrl: "/images/weekly/axolotl.jpg",
    category: "EAU_DOUCE",
    funFact: "Il peut régénérer son cerveau, son cœur et d'autres organes !",
  },
];

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek);
}

export default function WeeklyAnimalBanner() {
  const weekNumber = getWeekNumber();
  const selectedAnimal = animals[weekNumber % animals.length];

  return (
    <>
      <div className="relative w-full bg-gradient-to-b from-white to-green-50/80 h-32">
        <div className="absolute -bottom-px left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-24"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-green-600/10"
              opacity=".25"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              className="fill-green-600/10"
              opacity=".5"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-green-600/10"
            />
          </svg>
        </div>

        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-10">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-4 shadow-xl hover:shadow-green-500/20 transition-shadow duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="h-16"></div>

      <div className="container mx-auto px-4 lg:px-6">
        <section className="relative bg-gradient-to-r from-green-600 to-green-800 py-16 rounded-xl overflow-hidden">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="relative px-3 lg:px-6 z-10">
              <div className="text-center lg:text-left">
                <div className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 transform -rotate-1 hover:rotate-0 transition-all duration-300 shadow-lg hover:shadow-xl">
                  🌟 Animal de la Semaine
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow-lg tracking-tight">
                  {selectedAnimal.name}
                </h2>

                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                  {selectedAnimal.description}
                </p>

                <div className="flex flex-col md:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-4">
                  <span className="px-5 py-2 bg-green-700/30 backdrop-blur-md rounded-full text-white text-sm font-medium border border-green-400/20 shadow-lg">
                    {selectedAnimal.category.replace("_", " ")}
                  </span>

                  <div className="bg-gradient-to-r from-amber-500/80 to-amber-600/80 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm shadow-lg">
                    <span className="font-semibold">Le saviez-vous ? </span>
                    {selectedAnimal.funFact}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block h-full min-h-[350px]">
              <div className="absolute inset-0 rounded-l-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-800/50 to-transparent z-10"></div>
                <Image
                  src={selectedAnimal.imageUrl}
                  alt={selectedAnimal.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  priority
                  className="transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="absolute inset-0 lg:hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/40"></div>
              <Image
                src={selectedAnimal.imageUrl}
                alt={selectedAnimal.name}
                fill
                style={{ objectFit: "cover" }}
                priority
                className="transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
            <svg
              className="relative block w-full h-6"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="fill-green-600/20"
              ></path>
            </svg>
          </div>
        </section>
      </div>
    </>
  );
}
