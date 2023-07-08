/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: '/api/graphql',
      },
    ];
  },
}

module.exports = nextConfig
