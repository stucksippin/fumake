import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const runtime = 'nodejs'; // обязательно

export async function POST(req) {
    try {
        const data = await req.formData();
        const size = data.get('size');
        const colorId = Number(data.get('colorId'));
        const furnitureId = Number(data.get('furnitureId'));
        const files = data.getAll('images');

        if (!size || !colorId || !furnitureId || files.length === 0) {
            return NextResponse.json({ success: false, error: 'Неверные данные' }, { status: 400 });
        }

        //бд
        const variation = await prisma.furnitureVariations.create({
            data: {
                size,
                colorsId: colorId,
                furnitureId,
            }
        });

        //логика с картинками
        const uploadDir = path.join(process.cwd(), 'public', 'image', 'furniture', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        const imageRecords = [];

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const basename = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
            const filename = `${basename}.webp`;
            const fullPath = path.join(uploadDir, filename);

            await sharp(buffer)
                .webp({ quality: 80 })
                .toFile(fullPath);

            imageRecords.push({
                name: basename,
                furnitureVariationId: variation.id,
            });
        }

        await prisma.images.createMany({
            data: imageRecords,
        });

        return NextResponse.json({ success: true, variationId: variation.id });
    } catch (err) {
        console.error('Ошибка при создании вариации:', err);
        return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
    }
}
