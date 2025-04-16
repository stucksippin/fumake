'use server'
import prisma from "./libs/prisma"
export async function editFurniture(data) {
    const { id, name, price, category, tags, colors, sizes } = data;

    try {

        // Удалим все старые вариации
        await prisma.furnitureVariations.deleteMany({
            where: {
                furnitureId: Number(id)
            }
        });

        // Обновление мебели
        const updated = await prisma.furniture.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                price: Number(price),
                category,
                tags: {
                    set: [], // очищаем старые
                    connect: tags.map(tag => ({ id: tag.value }))
                },
                variations: {
                    set: [],
                    create: colors.map(color => {
                        return sizes.map(size => ({
                            size: size.label || size, // вдруг просто строка
                            color: {
                                connect: { id: color.value }
                            }
                        }));
                    }).flat()
                }
            },
            include: {
                tags: true,
                variations: {
                    include: {
                        color: true
                    }
                }
            }
        });

        return { success: true, data: updated };
    } catch (error) {
        console.error('Ошибка при обновлении мебели:', error);
        return { success: false, error: error.message };
    }
}

export async function createFurniture(data) {
    const { name, price, category, tags, colors, sizes, image, discription } = data;

    try {
        const created = await prisma.furniture.create({
            data: {
                name,
                price: Number(price),
                category,
                image,
                discription, // добавили
                tags: {
                    connect: tags.map(tag => ({ id: tag.value }))
                },
                variations: {
                    create: colors.map(color =>
                        sizes.map(size => ({
                            size: size.label || size,
                            color: {
                                connect: { id: color.value }
                            }
                        }))
                    ).flat()
                }
            }
        });

        return { success: true, data: created };
    } catch (error) {
        console.error('Ошибка при создании товара:', error);
        return { success: false, error: error.message };
    }
}




export async function getColorsOptions() {
    const tags = await prisma.colors.findMany()
    return tags
}
export async function getSizesOptions() {
    const sizes = await prisma.furnitureVariations.findMany()
    const res = [...new Map(sizes.map(item =>
        [item['size'], item])).values()
    ]
    console.log(res)
    return res

}
export async function getTagsOptions() {
    const tags = await prisma.tag.findMany()
    return tags
}