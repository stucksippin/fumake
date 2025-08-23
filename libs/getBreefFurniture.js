import prisma from "./prisma";

export default async function getBreefFurniture() {
    const furnitures = await prisma.furniture.findMany({
        take: 5,
    });
    return furnitures;
}