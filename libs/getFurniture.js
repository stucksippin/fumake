'use server'
import prisma from "@/libs/prisma";


export default async function getFurniture(searchParams) {
    try {
        const furnitures = await prisma.furniture.findMany({
            where: {
                AND: [
                    searchParams.category ? { category: searchParams.category } : {},
                    searchParams.priceMin ? {
                        price: {
                            gte: parseInt(searchParams.priceMin)
                        }
                    } : {},
                    searchParams.priceMax ? {
                        price: {
                            lte: parseInt(searchParams.priceMax)
                        }
                    } : {},
                    searchParams.name ? {
                        name: {
                            contains: searchParams.name,
                            // mode: 'insensitive',
                        }
                    } : {},
                    searchParams.color ? {
                        variations: {
                            some: {
                                color: {
                                    name: searchParams.color
                                }
                            }
                        }
                    } : {},
                ]
            },

            include: {
                variations: {
                    include: {
                        color: true,
                    }
                }
            }
        });
        return furnitures;
    } catch (error) {
        console.error("Ошибка загрузки мебели:", error);
        // throw new Error("Ошибка при загрузке мебели.");
    }
}
