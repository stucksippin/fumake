// import prisma from "@/libs/prisma";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//     try {
//         const { searchParams } = new URL(req.url)
//         const category = searchParams.get("category")
//         const color = searchParams.get("color")
//         const priceMin = parseInt(searchParams.get(priceMin)) || 1000
//         const priceMax = parseInt(searchParams.get(priceMax)) || 100000

//         const condition = {
//             AND: [
//                 category ? { category } : {},
//                 color ? {
//                     variations: {
//                         some: {
//                             color: {
//                                 name: color
//                             }
//                         }
//                     }
//                 } : {},
//                 { price: { gte: priceMin, lte: priceMax } }
//             ]
//         };

//         const furnitures = await prisma.findMany({
//             where: condition,
//             include: {
//                 variations: true
//             }
//         });
//         return NextResponse.json(furnitures)
//     } catch (error) {
//         console.error("Ошибка подгрузки мебели", error);
//         return NextResponse.json({
//             error: "Ошибка при подгрузке мебели"
//         },
//             {
//                 status: 500
//             }
//         )
//     }
// }