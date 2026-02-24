/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Tắt khi dev, bật khi build
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
