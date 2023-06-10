/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify : true,
  reactStrictMode: true,
  optimizeFonts: true,
  images: {
    domains: ['assets.coingecko.com'],
    remotePatterns : [
      {
        protocol : 'https',
        hostname :  "assets.coingecko.com",
       
      }
    ]
   
  },

}




 module.exports = nextConfig


