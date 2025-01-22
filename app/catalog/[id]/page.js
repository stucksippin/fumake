import InnerFurnitureCard from "@/components/InnerFurnitureCard";
import getFurnitureById from "@/libs/getFurnitureById";
import { Breadcrumb } from "antd";
import Link from "next/link";

export default async function InnerCardPage({ params: { id } }) {
    const furniture = await getFurnitureById(id)
    console.log(furniture.variations);

    const imagePath = `/image/furniture/${furniture.category}/${furniture.image}.png`;
    const breadcrumbItems = [
        {
            title: <Link href={"/"}>Главная</Link>,
        },
        {
            title: <Link href={"/catalog"}>Каталог</Link>,
        },
        {
            title: ':name',
        },]
    return (
        <div>
            <div className="container mx-auto">
                <Breadcrumb
                    className='mb-5 text-[18px]'
                    items={breadcrumbItems}
                    params={{
                        name: furniture.name,
                    }}
                />
            </div>

            <InnerFurnitureCard
                id={furniture.id}
                image={imagePath}
                name={furniture.name}
                discription={furniture.discription}
                price={furniture.price}
                size={furniture.size}
                color={furniture.color}
                category={furniture.category}
                tags={furniture.tags}
                reviews={furniture.reviews}
            />
        </div>
    )
}
