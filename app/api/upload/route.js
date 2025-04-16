import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get('file');
        const category = data.get('category');

        if (!file || !category) {
            return NextResponse.json({ success: false, error: 'Файл или категория не указаны' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const basename = `${Date.now()}`; // без расширения
        const filename = `${basename}.webp`; // файл на диске
        const targetDir = path.join(process.cwd(), 'public', 'image', 'furniture', category);
        const targetPath = path.join(targetDir, filename);

        await mkdir(targetDir, { recursive: true });

        await sharp(buffer)
            .webp({ quality: 80 })
            .toFile(targetPath);

        // Отправляем имя файла БЕЗ .webp
        return NextResponse.json({ success: true, filename: basename });
    } catch (err) {
        console.error('Ошибка при загрузке изображения:', err);
        return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
    }
}
