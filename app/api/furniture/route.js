import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

// Обрабатываем GET-запрос
export async function GET(req) {
    try {
        // Получаем параметры запроса
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const color = searchParams.get("color");
        const priceMin = searchParams.get("priceMin");
        const priceMax = searchParams.get("priceMax");

        const filters = {};
        if (category) filters.category = category;
        if (priceMin || priceMax) {
            filters.price = {
                gte: priceMin ? Number(priceMin) : undefined,
                lte: priceMax ? Number(priceMax) : undefined,
            };
        }

        const furnitures = await prisma.furniture.findMany({
            where: {
                ...filters,
                variations: color ? { some: { colors: { name: color } } } : undefined
            },
            include: { variations: { include: { colors: true } } }
        });

        return NextResponse.json(furnitures, { status: 200 });
    } catch (error) {
        console.error("Ошибка загрузки мебели:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
