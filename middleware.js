// middleware.ts
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
    function middleware(req) {
        // Дополнительная логика, если нужна
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Защищаем только маршруты /admin
                if (req.nextUrl.pathname.startsWith('/admin')) {
                    return !!token; // Просто проверяем, что пользователь авторизован
                }
                // Для всех остальных маршрутов разрешаем доступ
                return true;
            },
        },
    }
);

export const config = {
    matcher: ['/admin/:path*'], // Применяем middleware только к /admin
};