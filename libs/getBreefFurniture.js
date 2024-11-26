import prisma from "./prisma";

export default async function getBreefFurniture() {
    const furnitures = await prisma.furniture.findMany(
        {
            take: 8,
            where: {
                reviews: {
                    some: {
                        rating: 5
                    }
                }
            },
            include: {
                reviews: true
            }

        }
    );
    return furnitures
}