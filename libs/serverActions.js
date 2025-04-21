'use server'
import prisma from './prisma';
import { writeFile, mkdir } from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export async function editFurniture(data) {
    const { id, name, price, category, tags, image } = data;

    try {
        const updated = await prisma.furniture.update({
            where: { id: Number(id) },
            data: {
                name,
                price: Number(price),
                category,
                image,
                tags: {
                    set: [],
                    connect: tags.map(tag => ({ id: tag.value }))
                }
            },
            include: {
                tags: true
            }
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
        // Удаление изображений → через вариации
        const variations = await prisma.furnitureVariations.findMany({
            where: { furnitureId: id },
            select: { id: true },
        });

        const variationIds = variations.map(v => v.id);

        // Удаляем изображения
        await prisma.images.deleteMany({
            where: {
                furnitureVariationId: { in: variationIds },
            },
        });

        // Удаляем вариации
        await prisma.furnitureVariations.deleteMany({
            where: { furnitureId: id },
        });

        // Удаляем отзывы
        await prisma.review.deleteMany({
            where: { furnitureId: id },
        });

        // Удаляем связи с тегами
        await prisma.furniture.update({
            where: { id },
            data: {
                tags: {
                    set: [],
                },
            },
        });

        // Удаляем сам товар
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
    const tags = await prisma.colors.findMany()
    return tags
}
export async function getSizesOptions() {
    const sizes = await prisma.sizes.findMany();
    return sizes;
}

export async function getTagsOptions() {
    const tags = await prisma.tag.findMany()
    return tags
}