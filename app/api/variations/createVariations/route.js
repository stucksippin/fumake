import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '@/libs/s3Client';
import sharp from 'sharp';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const runtime = 'nodejs';

export async function POST(req) {
    try {
        const data = await req.formData();
        const sizeValue = data.get('size');
        const colorId = Number(data.get('colorId'));
        const furnitureId = Number(data.get('furnitureId'));
        const files = data.getAll('images');

        if (!sizeValue || !colorId || !furnitureId || files.length === 0) {
            return NextResponse.json({ success: false, error: 'Неверные данные' }, { status: 400 });
        }

        const sizeRecord = await prisma.sizes.upsert({
            where: { size: sizeValue },
            update: {},
            create: { size: sizeValue },
        });

        const variation = await prisma.furnitureVariations.create({
            data: {
                sizeId: sizeRecord.id,
                colorsId: colorId,
                furnitureId,
            }
        });
        const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;

        const imageRecords = [];

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const basename = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
            const filename = `${basename}.webp`;

            const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

            await s3Client.send(new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: filename,
                Body: webpBuffer,
                ContentType: 'image/webp',
            }));

            const publicUrl = process.env.MINIO_PUBLIC_URL || `https://s3.event-hub.space/${bucketName}`;
            const url = `${publicUrl}/${filename}`;


            imageRecords.push({
                name: basename,
                url,
                furnitureVariationId: variation.id,
            });
        }

        await prisma.images.createMany({ data: imageRecords });

        return NextResponse.json({ success: true, variationId: variation.id });
    } catch (err) {
        console.error('Ошибка при создании вариации:', err);
        return NextResponse.json({ success: false, error: err.message || 'Ошибка сервера' }, { status: 500 });
    }
}
