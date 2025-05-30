/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* ここにオプション設定を書きます */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
