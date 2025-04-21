// app/catalog/[id]/page.tsx
export const dynamic = 'auto'
export const revalidate = 60

import { notFound } from 'next/navigation';
import InnerFurnitureCard from "@/components/InnerFurnitureCard";
import getFurnitureById from "@/libs/getFurnitureById";
import { Breadcrumb } from "antd";
import Link from "next/link";

export default async function InnerCardPage({ params: { id } }) {
    const furniture = await getFurnitureById(id);

    if (!furniture) {
        notFound();
    }

    const imagePath = `/image/furniture/${furniture.category}/${furniture.image}.webp`;
    console.log(imagePath);



    const breadcrumbItems = [
        { title: <Link href="/">Главная</Link> },
        { title: <Link href="/catalog">Каталог</Link> },
        { title: furniture.name },
    ];

    return (
        <div className="container mx-auto">
            <Breadcrumb className='mb-5 text-[18px]' items={breadcrumbItems} />
            <InnerFurnitureCard
                id={furniture.id}
                image={imagePath}
                name={furniture.name}
                discription={furniture.discription}
                price={furniture.price}
                variations={furniture.variations}
                category={furniture.category}
                tags={furniture.tags}
                reviews={furniture.reviews}
            />
        </div>
    );
}


