'use server'
import prisma from './prisma';
import { writeFile, mkdir } from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export async function editFurniture(data) {
    const { id, name, price, category, tags, image, discription } = data;

    try {
        const existing = await prisma.furniture.findUnique({
            where: { id: Number(id) },
            include: { tags: true }
        });

        const newTagIds = tags.map(tag => tag.value);
        const oldTagIds = existing.tags.map(tag => tag.id);

        const toConnect = newTagIds
            .filter(tagId => !oldTagIds.includes(tagId))
            .map(id => ({ id }));

        const toDisconnect = oldTagIds
            .filter(tagId => !newTagIds.includes(tagId))
            .map(id => ({ id }));

        const updated = await prisma.furniture.update({
            where: { id: Number(id) },
            data: {
                name,
                price: Number(price),
                category,
                discription,   // 👈 теперь описание обновляется
                image,
                tags: {
                    connect: toConnect,
                    disconnect: toDisconnect
                }
            },
            include: { tags: true }
        });

        return { success: true, data: updated };
    } catch (error) {
        console.error('Ошибка при обновлении мебели:', error);
        return { success: false, error: error.message };
    }
}


export async function deleteVariation(id) {
    try {
        await prisma.furnitureVariations.delete({
            where: { id: Number(id) }
        });

        return { success: true };
    } catch (error) {
        console.error('Ошибка при удалении вариации:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteFurniture(id) {
    try {
        // 1. Найдём все вариации, чтобы удалить картинки и вариации
        const variations = await prisma.furnitureVariations.findMany({
            where: { furnitureId: id },
            select: { id: true },
        });

        const variationIds = variations.map(v => v.id);

        // 2. Удаляем изображения вариаций
        await prisma.images.deleteMany({
            where: {
                furnitureVariationId: { in: variationIds },
            },
        });

        // 3. Удаляем сами вариации
        await prisma.furnitureVariations.deleteMany({
            where: { furnitureId: id },
        });

        // 4. Удаляем отзывы
        await prisma.review.deleteMany({
            where: { furnitureId: id },
        });

        // 5. Снимаем связи с тегами (через disconnect)
        const furniture = await prisma.furniture.findUnique({
            where: { id },
            include: { tags: true },
        });

        if (furniture && furniture.tags.length > 0) {
            await prisma.furniture.update({
                where: { id },
                data: {
                    tags: {
                        disconnect: furniture.tags.map(tag => ({ id: tag.id })),
                    },
                },
            });
        }

        // 6. Удаляем сам товар
        await prisma.furniture.delete({
            where: { id },
        });

        return { success: true };
    } catch (error) {
        console.error('Ошибка при удалении товара:', error);
        return { success: false, error: error.message };
    }
}


export async function createFurniture(data) {
    const { name, price, category, tags, image, discription } = data;

    try {
        const created = await prisma.furniture.create({
            data: {
                name,
                price: Number(price),
                category,
                image,
                discription,
                tags: {
                    connect: tags.map(tag => ({ id: tag.value }))
                }
                // variations больше не создаём
            }
        });

        return { success: true, data: created };
    } catch (error) {
        console.error('Ошибка при создании товара:', error);
        return { success: false, error: error.message };
    }
}


export async function editVariation({
    id,
    size,
    sizeId,
    colorId,
    deletedImages = [],
    newImages = []
}) {
    try {
        // 1. Удаляем изображения
        if (deletedImages.length > 0) {
            const deleted = await prisma.images.findMany({
                where: {
                    id: { in: deletedImages.map(Number) },
                },
            });

            await prisma.images.deleteMany({
                where: {
                    id: { in: deletedImages.map(Number) },
                },
            });

            for (const image of deleted) {
                const filePath = path.join(
                    process.cwd(),
                    "public",
                    "image",
                    "furniture",
                    "uploads",
                    `${image.name}.webp`
                );
                try {
                    await fs.unlink(filePath);
                } catch (err) {
                    console.warn("Файл уже удалён или не найден:", filePath);
                }
            }
        }

        // 2. Работа с размером
        let sizeConnection;

        if (sizeId) {
            // Если sizeId указан, используем существующий размер
            sizeConnection = { connect: { id: sizeId } };
        } else {
            // Иначе создаем новый размер, если такого размера нет
            const existingSize = await prisma.sizes.findFirst({
                where: { size: size },
            });

            if (existingSize) {
                sizeConnection = { connect: { id: existingSize.id } };
            } else {
                // Создаём новый размер
                const newSize = await prisma.sizes.create({
                    data: {
                        size: size,
                    },
                });
                sizeConnection = { connect: { id: newSize.id } };
            }
        }

        // 3. Обновляем вариацию
        const updated = await prisma.furnitureVariations.update({
            where: { id: Number(id) },
            data: {
                size: sizeConnection,
                color: {
                    connect: { id: Number(colorId) },
                },
                images: {
                    create: newImages.map((name) => ({
                        name,
                    })),
                },
            },
            include: {
                color: true,
                size: true,
                images: true,
            },
        });

        return { success: true, data: updated };
    } catch (error) {
        console.error("Ошибка при редактировании вариации:", error);
        return { success: false, error: error.message };
    }
}



export async function getColorsOptions() {
    const colors = await prisma.colors.findMany({
        select: {
            id: true,
            name: true,  // Предполагаем, что есть поле name
            code: true  // И поле value (или hex для цветов)
        }
    });
    return colors;
}
export async function getSizesOptions() {
    const sizes = await prisma.sizes.findMany();
    return sizes;
}

export async function getTagsOptions() {
    const tags = await prisma.tag.findMany()
    return tags
}


export async function getCategoryOptions() {
    const category = await prisma.furniture.findMany({
        select: {
            category: true
        },
        distinct: ['category'],
        orderBy: {
            category: 'asc'
        }
    })
    return category.map(item => item.category)
}