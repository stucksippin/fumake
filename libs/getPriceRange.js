import prisma from "./prisma";

export default async function getPriceRange() {
    const minMaxPrice = await prisma.furniture.aggregate({
        _min: {
            price: true,
        },
        _max: {
            price: true,
        },
    });

    return {
        min: minMaxPrice._min.price || 1000,
        max: minMaxPrice._max.price || 100000
    };
}
