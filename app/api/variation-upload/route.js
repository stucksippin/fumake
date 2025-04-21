import { mkdir } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req) {
    try {
        const data = await req.formData();
        const files = data.getAll('file'); // ✅ ключ 'file', как на клиенте

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, error: 'Файлы не переданы' }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), 'public', 'image', 'furniture', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        const names = [];

        for (const file of files) {
            if (!file || typeof file.arrayBuffer !== 'function') continue;

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const basename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
            const filename = `${basename}.webp`;

            await sharp(buffer)
                .webp({ quality: 80 })
                .toFile(path.join(uploadDir, filename));

            names.push(basename);
        }

        return NextResponse.json({ success: true, filenames: names });
    } catch (err) {
        console.error('Ошибка при загрузке изображений:', err);
        return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
    }
}
