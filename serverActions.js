'use server'
import prisma from "./libs/prisma"
export async function editFurniture(data) {
    const { id, name, price, category, tags, colors, sizes } = data;

    try {
        // Собираем id тегов
        const tagIds = tags.map(tag => ({ id: tag.value }));
        // const colorIds = colors.map(color => color.value)
        console.log(data)
        // Удалим все старые вариации
        await prisma.furnitureVariations.deleteMany({
            where: {
                furnitureId: Number(id)
            }
        });

        // Создаем новые вариации
        const variations = colors.map(color => {
            return sizes.map(size => ({
                size: size.label || size, // вдруг просто строка
                color: {
                    connect: { id: color.value }
                }
            }));
        }).flat();

        console.log('vars', variations)

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
                    connect: tagIds
                },
                variations: {
                    set: [],
                    create: variations
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