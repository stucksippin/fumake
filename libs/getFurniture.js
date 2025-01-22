import prisma from "./prisma";

export default async function getFurniture() {
    const furnitures = await prisma.furniture.findMany({
        include: {
            variations: true
        }
    });
    return furnitures
}