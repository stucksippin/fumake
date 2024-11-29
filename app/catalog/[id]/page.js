
// import BreadCrumbs from "@/components/BreadCrumbs";
import InnerFurnitureCard from "@/components/InnerFurnitureCard";
import getFurnitureById from "@/libs/getFurnitureById";

export default async function InnerCardPage({ params: { id } }) {
    const furniture = await getFurnitureById(id)
    const imagePath = `/image/furniture/${furniture.category}/${furniture.image}.png`;
    return (
        <div>
            {/* <BreadCrumbs /> */}
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
