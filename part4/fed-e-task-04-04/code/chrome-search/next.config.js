/** @type {import('next').NextConfig} */

const customPathMap = require('./config/customPathMap')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID
    }
    return 'static_build_id'
  },
  exportPathMap: async function (defaultPathMap) {
    return customPathMap
  }
}

module.exports = nextConfig
