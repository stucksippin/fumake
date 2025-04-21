import prisma from "../prisma";

export default async function getFurnitureAdmin() {
    try {
        const furnitures = await prisma.furniture.findMany({
            include: {
                variations: {
                    include: {
                        color: true,
                        images: true,
                        size: true,
                    }
                },
                tags: true,
                reviews: true,

            },
        });


        return furnitures;

    } catch (error) {
        console.error("Ошибка загрузки мебели:", error);
    }
}

