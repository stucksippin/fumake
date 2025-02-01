import prisma from "@/libs/prisma";


export default async function getFurniture() {
    try {
        // const furnitures = await prisma.furniture.findMany({
        //     include: {
        //         variations: true
        //     }
        // });
        const furnitures = await prisma.furniture.findMany({
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
        throw new Error("Ошибка при загрузке мебели.");
    }
}
