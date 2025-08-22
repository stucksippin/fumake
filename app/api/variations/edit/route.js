// app/api/variations/edit/route.js
import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import s3Client from '@/libs/s3Client';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;

export async function POST(req) {
    try {
        const { id, size, sizeId, colorId, deletedImages = [], newImages = [] } = await req.json();

        // Удаляем изображения
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
                try {
                    await s3Client.send(new DeleteObjectCommand({
                        Bucket: BUCKET_NAME,
                        Key: `${image.name}.webp`,
                    }));
                } catch (err) {
                    console.warn('Не удалось удалить из бакета:', image.name, err);
                }
            }
        }

        // Работа с размером
        let sizeConnection;

        if (sizeId) {
            sizeConnection = { connect: { id: sizeId } };
        } else {
            const existingSize = await prisma.sizes.findFirst({
                where: { size },
            });

            if (existingSize) {
                sizeConnection = { connect: { id: existingSize.id } };
            } else {
                const newSize = await prisma.sizes.create({
                    data: { size },
                });
                sizeConnection = { connect: { id: newSize.id } };
            }
        }

        // Обновляем вариацию
        const updated = await prisma.furnitureVariations.update({
            where: { id: Number(id) },
            data: {
                size: sizeConnection,
                color: { connect: { id: Number(colorId) } },

            },
            include: {
                color: true,
                size: true,
                images: true,
            },
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error('Ошибка при редактировании вариации:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
