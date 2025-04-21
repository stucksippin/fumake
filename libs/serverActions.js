'use server'
import prisma from './prisma';
import { writeFile, mkdir } from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

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

export async function editVariation({ id, size, colorId, deletedImages = [], newImages = [] }) {
    console.log({ id, size, colorId, newImages, deletedImages });

    try {
        // 1. Удаляем изображения из базы и с диска
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

        // 2. Обновляем вариацию и добавляем новые изображения
        const updated = await prisma.furnitureVariations.update({
            where: { id: Number(id) },
            data: {
                size,
                color: {
                    connect: { id: Number(colorId) },
                },
                images: {
                    create: newImages.map((name) => ({
                        name, // это уже имя файла без расширения
                    })),
                },
            },
            include: {
                color: true,
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