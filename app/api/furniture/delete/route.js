import { NextResponse } from 'next/server';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import prisma from '@/libs/prisma';
import s3Client from '@/libs/s3Client';

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;
const PUBLIC_URL = process.env.MINIO_PUBLIC_URL;

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const idParam = searchParams.get('id');
        const id = parseInt(idParam, 10);

        if (!id) {
            return NextResponse.json({ success: false, error: 'Некорректный ID' }, { status: 400 });
        }

        // Получаем URL изображения, чтобы позже удалить из MinIO
        const furniture = await prisma.furniture.findUnique({
            where: { id },
            select: { image: true },
        });

        if (!furniture) {
            return NextResponse.json({ success: false, error: 'Товар не найден' }, { status: 404 });
        }

        const variations = await prisma.furnitureVariations.findMany({
            where: { furnitureId: id },
            select: { id: true },
        });

        const variationIds = variations.map(v => v.id);

        // Удаляем изображения вариаций
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

        // Удаляем изображение из MinIO
        if (furniture.image && furniture.image.startsWith(PUBLIC_URL)) {
            const key = furniture.image.replace(`${PUBLIC_URL}/`, '');

            const deleteCommand = new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: key,
            });

            await s3Client.send(deleteCommand);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Ошибка при удалении товара:', error);
        return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
    }
}
