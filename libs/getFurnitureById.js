import prisma from "./prisma";

export default async function getFurnitureById(id) {
    const furnitures = await prisma.furniture.findFirst({
        where: {
            id: parseInt(id)
        }
    }
    );
    return furnitures
}