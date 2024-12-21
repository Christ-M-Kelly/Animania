"use client";

import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

interface TeamMember {
  name: string;
  role: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Kelly",
    role: "Fondatrice & Développeuse Frontend",
    description:
      "Créatrice de l'interface utilisateur intuitives et de la navigation.",
  },
  {
    name: "Sébastien",
    role: "Développeur Frontend",
    description: "Expert en animations et design responsive.",
  },
  {
    name: "Méhdi",
    role: "Développeur Backend",
    description:
      "Expert en MongoDB et APIs Next.js, passionné par l'optimisation et la performance des systèmes.",
  },
  {
    name: "Geremy",
    role: "Développeur Backend",
    description:
      "Spécialiste des structures de données et de la sécurité des APIs.",
  },
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une équipe passionnée dédiée à partager des connaissances sur le
              monde animal et à créer une communauté engagée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border-t-4 border-green-500 min-h-[350px] flex flex-col"
              >
                <div className="p-8 flex flex-col h-full justify-between">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-3xl text-green-600 font-semibold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {member.name}
                    </h3>
                    <p className="text-lg text-green-600 font-medium mb-6">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-gray-600 text-center text-base leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
