import getPriceRange from "@/libs/getPriceRange";

export async function GET() {
    const priceRange = await getPriceRange();
    return Response.json(priceRange);
}
