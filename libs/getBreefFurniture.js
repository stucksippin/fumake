import prisma from "./prisma";

export default async function getFurniture() {
    const furnitures = await prisma.furniture.findMany(
        {
            where: {
                rating: 5
            }
        }
    );
    return furnitures
}