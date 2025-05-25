import prisma from "./prisma";

export default async function getBreefFurniture() {
    const furnitures = await prisma.furniture.findMany(
        {
            take: 10,
            where: {
                reviews: {
                    some: {
                        rating: 5
                    }
                }
            },
            // include: {
            //     reviews: true
            // }

        }
    );
    return furnitures
}