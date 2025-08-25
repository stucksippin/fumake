import prisma from '@/libs/prisma';

export async function DELETE(req) {
    // из URL получаем id
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ success: false, error: 'ID не передан' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        await prisma.furnitureVariations.delete({
            where: { id: Number(id) }
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
