import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/chandra_choodeshwaran',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
