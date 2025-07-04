'use server';
import prisma from '@/libs/prisma';

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

        return furnitures;
    } catch (error) {
        console.error('Ошибка загрузки мебели:', error);
        return [];
    }
}
