// app/api/furniture/route.ts или pages/api/furniture/index.ts
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get('file');
        const category = data.get('category')?.toString();
        const name = data.get('name')?.toString();
        const discription = data.get('discription')?.toString();
        const priceStr = data.get('price')?.toString();

        if (!file || !category || !name || !discription || !priceStr) {
            return NextResponse.json(
                { success: false, error: 'Не все поля заполнены' },
                { status: 400 }
            );
        }

        const price = parseInt(priceStr, 10);
        if (isNaN(price)) {
            return NextResponse.json(
                { success: false, error: 'Некорректная цена' },
                { status: 400 }
            );
        }

        // 1) Сохраняем изображение
        const arrayBuffer = await (file).arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const basename = `${Date.now()}`;       // уникальное имя без расширения
        const filename = `${basename}.webp`;    // реальное имя файла на диске
        const targetDir = path.join(
            process.cwd(),
            'public',
            'image',
            'furniture',
            category
        );
        const targetPath = path.join(targetDir, filename);

        await mkdir(targetDir, { recursive: true });
        await sharp(buffer).webp({ quality: 80 }).toFile(targetPath);

        // 2) Создаём запись в БД
        const newFurniture = await prisma.furniture.create({
            data: {
                name,
                discription,
                price,
                category,
                image: basename,
            }
        });

        return NextResponse.json({ success: true, furniture: newFurniture });
    } catch (err) {
        console.error('Ошибка при загрузке изображения или в БД:', err);
        return NextResponse.json(
            { success: false, error: 'Ошибка сервера' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
