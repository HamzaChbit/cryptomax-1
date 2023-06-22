/** @type {import('next').NextConfig} */

const nextConfig = {
 
  // reactStrictMode: true,
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


