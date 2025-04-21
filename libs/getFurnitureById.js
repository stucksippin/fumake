import prisma from "./prisma";

export default async function getFurnitureById(id) {


    const furniture = await prisma.furniture.findUnique({

        where: {
            id: parseInt(id),
        },
        include: {
            reviews: true,
            tags: true,
            variations: {
                include: {
                    color: true,
                    size: true,
                    images: true,
                },
            },
        },

    });

    return furniture;

}
