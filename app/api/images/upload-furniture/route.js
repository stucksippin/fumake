import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/libs/prisma'; // адаптируй путь, если другой
import s3Client from '@/libs/s3Client'; // используем твой s3Client

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;
const PUBLIC_URL = process.env.MINIO_PUBLIC_URL; // например: https://s3.mir-komfortarnd.ru/furniture

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get('file');
        const furnitureIdRaw = data.get('furnitureId');
        const furnitureId = parseInt(furnitureIdRaw, 10);

        if (!file || !furnitureId) {
            return NextResponse.json({ success: false, error: 'file или furnitureId не указаны' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const webpBuffer = await sharp(buffer)
            .webp({ quality: 80 })
            .toBuffer();

        const filename = `${uuidv4()}.webp`;

        const uploadCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: webpBuffer,
            ContentType: 'image/webp',
        });

        await s3Client.send(uploadCommand);

        const imageUrl = `${PUBLIC_URL}/${filename}`;

        await prisma.furniture.update({
            where: { id: furnitureId },
            data: { image: imageUrl },
        });

        return NextResponse.json({ success: true, imageUrl });
    } catch (err) {
        console.error('Ошибка при загрузке в MinIO:', err);
        return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
    }
}
