/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Disable image optimization for export
  },
  output: 'export', // Enable static export
};

module.exports = nextConfig;
