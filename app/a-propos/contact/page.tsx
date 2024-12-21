"use client";

import React, { useState } from "react";

export default function ContactForm() {
  // État du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companySize: "",
    country: "",
    message: "",
  });

  // État pour afficher un message de confirmation
  const [showPopup, setShowPopup] = useState(false);

  // Gestion des changements dans les champs du formulaire
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire soumis avec les données suivantes :", formData);

    // Afficher le pop-up de succès
    setShowPopup(true);

    // Réinitialiser le formulaire
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companySize: "",
      country: "",
      message: "",
    });

    // Masquer le pop-up après 3 secondes
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="fixed h-screen w-screen">
      {/* Vidéo en arrière-plan */}
      <video
        className="absolute top-0 left-0 h-full w-full object-cover"
        src="https://videos.pexels.com/video-files/1526909/1526909-hd_1920_1080_24fps.mp4"
        autoPlay
        muted
        loop
      />

      {/* Calque sombre */}
      <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-50 z-0"></div>

      {/* Formulaire en avant-plan */}
      <div className="relative z-10 max-w-2xl mx-auto p-8 bg-white bg-opacity-80 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Contactez-nous</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champs de formulaire */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Nom *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g., John"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {/* Ajoutez ici les autres champs (comme dans votre code existant) */}

          {/* Nom */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Prénom *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Smith"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Addresse Mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Numéro de téléphone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Numéro de télephone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 555 555 5556"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Taille de l'entreprise */}
          <div>
            <label
              htmlFor="companySize"
              className="block text-sm font-medium text-gray-700"
            >
              Votre situation *
            </label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select...</option>
              <option value="none">Je suis un particulier</option>{" "}
              {/* Option ajoutée */}
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
          </div>

          {/* Pays */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Pays *
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select...</option>
              <option value="USA">USA</option>
              <option value="France">France</option>
              <option value="Canada">Canada</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              De quoi aimeriez-vous discuter ? *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Parlez-nous de ce que vous avez besoin..."
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          {/* Bouton de soumission */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {showPopup && (
  <div
    className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50"
  >
    Message envoyé avec succès !
  </div>
)}

    </div>
  );
}