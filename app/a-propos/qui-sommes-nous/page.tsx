"use client";

import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function QuiSommesNousPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Qui Sommes-Nous ?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Découvrez notre passion pour les animaux et notre engagement à
              partager des connaissances.
            </p>
          </div>

          <div className="grid gap-12">
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Nous nous engageons à fournir des informations précises et à
                jour sur le monde animal, tout en créant une communauté
                passionnée par la protection et le bien-être des animaux.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Notre plateforme vise à éduquer, informer et sensibiliser le
                public sur la diversité et la richesse du règne animal, tout en
                promouvant des pratiques respectueuses de l'environnement et des
                animaux.
              </p>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Notre Approche
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-4">
                    Expertise et Rigueur
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nos articles sont rédigés par des experts passionnés,
                    garantissant des informations fiables et vérifiées sur les
                    différentes espèces animales.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-4">
                    Communauté et Partage
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nous encourageons les échanges et le partage d'expériences
                    entre passionnés d'animaux, créant ainsi une communauté
                    dynamique et engagée.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-8">
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
                    Nous croyons en la puissance de l'éducation pour
                    sensibiliser aux enjeux de la protection animale.
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
        </div>
      </main>
      <Footer />
    </>
  );
}
