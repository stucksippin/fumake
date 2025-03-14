import prisma from "@/libs/prisma";


export default async function getFurniture(searchParams) {
    console.log('параметры в призме', parseInt(searchParams.priceMin))
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
                    searchParams.query ? {
                        name: {
                            contains: searchParams.query
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
        console.log('мебель', furnitures);


        return furnitures;
    } catch (error) {
        console.error("Ошибка загрузки мебели:", error);
        // throw new Error("Ошибка при загрузке мебели.");
    }
}
