import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/libs/prisma';
import s3Client from '@/libs/s3Client';

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;
const PUBLIC_URL = process.env.MINIO_PUBLIC_URL;

export async function POST(req) {
    try {
        const data = await req.formData();
        const files = data.getAll('file'); // <-- важно: getAll для массива файлов
        const variationIdRaw = data.get('variationId');
        const variationId = parseInt(variationIdRaw, 10);

        if (!variationId || !files.length) {
            return NextResponse.json({ success: false, error: 'variationId или файлы не переданы' }, { status: 400 });
        }

        const uploaded = [];

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const webpBuffer = await sharp(buffer)
                .webp({ quality: 80 })
                .toBuffer();

            const name = uuidv4(); // используется и как basename и как key без расширения
            const filename = `${name}.webp`;

            await s3Client.send(new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: filename,
                Body: webpBuffer,
                ContentType: 'image/webp',
            }));

            const url = `${PUBLIC_URL}/${filename}`;

            uploaded.push({
                name,
                url,
                furnitureVariationId: variationId,
            });
        }

        await prisma.images.createMany({ data: uploaded });

        return NextResponse.json({ success: true, images: uploaded });
    } catch (err) {
        console.error('Ошибка при загрузке изображений:', err);
        return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
    }
}
