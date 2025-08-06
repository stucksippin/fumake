/** @type {import('next').NextConfig} */
const nextConfig = {
    // Необходимо для Three.js
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(glb|gltf|hdr)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/assets/',
                    outputPath: 'static/assets/',
                },
            },
        });

        return config;
    },

    // Для оптимизации сборки
    experimental: {
        serverComponentsExternalPackages: [
            'three',
            '@react-three/fiber',
            '@react-three/drei'
        ],
        esmExternals: 'loose',
    },

    // Для статических ресурсов
    images: {
        domains: ['assets.vercel.com'],
        unoptimized: true, // Отключает оптимизацию изображений
    },

    // Увеличивает лимит для HDR-файлов
    staticPageGenerationTimeout: 300,
}

export default nextConfig;