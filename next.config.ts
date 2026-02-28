import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const hasCustomDomain = process.env.CUSTOM_DOMAIN === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  // When served from GitHub Pages subdirectory (jddunn.github.io/wunderland-sh/)
  // we need basePath. Once DNS is set for wunderland.sh, set CUSTOM_DOMAIN=true to remove it.
  basePath: isProd && !hasCustomDomain ? '/wunderland-sh' : '',
  assetPrefix: isProd && !hasCustomDomain ? '/wunderland-sh' : '',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
