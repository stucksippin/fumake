'use server';
import prisma from '@/libs/prisma';

// Приводим объекты к сериализуемому виду
function serializeFurniture(f) {
    return {
        ...f,
        price: Number(f.price),
        createdAt: f.createdAt?.toISOString?.() ?? null,
        updatedAt: f.updatedAt?.toISOString?.() ?? null,
        tags: f.tags || [],
        variations: f.variations?.map((v) => ({
            ...v,
            price: v.price ? Number(v.price) : 0,
            createdAt: v.createdAt?.toISOString?.() ?? null,
            updatedAt: v.updatedAt?.toISOString?.() ?? null,
            color: v.color ? {
                ...v.color
            } : null
        })) || []
    };
}

export default async function getFurniture(searchParams = {}) {
    try {
        const furnitures = await prisma.furniture.findMany({
            where: {
                AND: [
                    searchParams.category
                        ? { category: searchParams.category }
                        : {},

                    searchParams.tags
                        ? {
                            tags: {
                                some: { name: searchParams.tags },
                            },
                        }
                        : {},

                    searchParams.priceMin
                        ? {
                            price: { gte: Number(searchParams.priceMin) || 0 },
                        }
                        : {},

                    searchParams.priceMax
                        ? {
                            price: { lte: Number(searchParams.priceMax) || 0 },
                        }
                        : {},

                    searchParams.name
                        ? { name: { contains: searchParams.name } }
                        : {},

                    searchParams.color
                        ? {
                            variations: {
                                some: { color: { name: searchParams.color } },
                            },
                        }
                        : {},
                ],
            },

            orderBy:
                searchParams.priceSort === 'asc'
                    ? { price: 'asc' }
                    : searchParams.priceSort === 'desc'
                        ? { price: 'desc' }
                        : undefined,

            include: {
                tags: true,
                variations: {
                    include: { color: true },
                },
            },
        });

        // Сериализуем результат
        return furnitures.map(serializeFurniture);
    } catch (error) {
        console.error('Ошибка загрузки мебели:', error);
        return [];
    }
}
