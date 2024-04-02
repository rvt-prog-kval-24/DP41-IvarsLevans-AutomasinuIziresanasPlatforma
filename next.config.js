/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  images: {
    domains: ["cdn.imagin.studio"]
  }
}

module.exports = {
  nextConfig
};