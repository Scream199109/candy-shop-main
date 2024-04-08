/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    APP_URL: process.env.APP_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'test.ru',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: ''
      }
    ]
  }
};

export default nextConfig;
