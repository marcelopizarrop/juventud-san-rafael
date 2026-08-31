/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ]
  },
  async redirects() {
    return [
      { source: "/directiva", destination: "/jugadores", permanent: true }
    ];
  }
};

export default nextConfig;
