// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        serverActions: true, // если используете server actions
    },
};

module.exports = nextConfig;
