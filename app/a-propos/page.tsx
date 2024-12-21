"use client";

import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Link from "next/link";

interface AboutSection {
  title: string;
  description: string;
  link: string;
  icon: string;
}

const aboutSections: AboutSection[] = [
  {
    title: "Qui Sommes-Nous",
    description:
      "Découvrez notre histoire, notre mission et nos valeurs qui guident nos actions au quotidien.",
    link: "/a-propos/qui-sommes-nous",
    icon: "👥",
  },
  {
    title: "Notre Équipe",
    description:
      "Rencontrez les passionnés qui contribuent à faire vivre notre plateforme et à partager leurs connaissances.",
    link: "/a-propos/notre-equipe",
    icon: "🤝",
  },
  {
    title: "Nous Contacter",
    description:
      "Une question, une suggestion ? N'hésitez pas à nous contacter, nous sommes à votre écoute.",
    link: "/a-propos/contact",
    icon: "📧",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">À Propos</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explorez notre univers et découvrez comment nous contribuons à
              partager la connaissance sur le monde animal.
            </p>
          </div>

          {/* Section Mission */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Notre Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Nous nous engageons à fournir des informations précises et à jour
              sur le monde animal, tout en créant une communauté passionnée par
              la protection et le bien-être des animaux.
            </p>
          </section>

          {/* Sections de navigation */}
          <div className="grid md:grid-cols-3 gap-8">
            {aboutSections.map((section) => (
              <Link
                key={section.title}
                href={section.link}
                className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-green-500"
              >
                <div className="text-center mb-4">
                  <span className="text-4xl mb-4 block">{section.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-center">
                  {section.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Section Valeurs */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Nos Valeurs
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">
                  Respect
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nous promouvons le respect de toutes les formes de vie et de
                  leur habitat naturel.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">
                  Éducation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nous croyons en la puissance de l'éducation pour sensibiliser
                  aux enjeux de la protection animale.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">
                  Innovation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nous utilisons les technologies modernes pour rendre
                  l'information accessible et engageante.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
