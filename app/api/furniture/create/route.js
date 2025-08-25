// /app/api/create-furniture/route.js (или .ts)
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
        const formData = await req.formData();

        const file = formData.get('file');
        const name = formData.get('name');
        const price = formData.get('price');
        const category = formData.get('category');
        const discription = formData.get('discription');
        const rawTags = formData.get('tags');

        if (!name || !price || !category) {
            return NextResponse.json({ success: false, error: 'Обязательные поля отсутствуют' }, { status: 400 });
        }

        let imageUrl = '';

        if (file && typeof file === 'object') {
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
            imageUrl = `${PUBLIC_URL}/${filename}`;
        }

        let tagsArray = [];
        try {
            if (rawTags) {
                const parsedTags = JSON.parse(rawTags);
                if (Array.isArray(parsedTags)) {
                    tagsArray = parsedTags;
                }
            }
        } catch (e) {
            console.warn('Ошибка парсинга тегов:', e);
        }

        const created = await prisma.furniture.create({
            data: {
                name,
                price: Number(price),
                category,
                image: imageUrl,
                discription,
                tags: {
                    connect: tagsArray.map(tag => ({ id: tag.value })),
                },
            }
        });

        return NextResponse.json({ success: true, data: created });
    } catch (err) {
        console.error('Ошибка при создании товара:', err);
        return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
    }
}
