/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gérer les erreurs de build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Configuration des images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Optimisations pour le déploiement
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },

  // Gérer les timeouts de base de données
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
  },

  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
  },
};

module.exports = nextConfig;
