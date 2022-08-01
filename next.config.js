/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.infura.io']
  },
  swcMinify: true,
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
