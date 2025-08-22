/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fumake.vercel.app',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'minio.event-hub.space',
                pathname: '/**',
            },
        ],
    },

};

export default nextConfig;
