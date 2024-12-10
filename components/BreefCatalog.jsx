import { Button } from "antd";
import FurnitureCard from "./FurnitureCard";
import Link from "next/link";

export default function BreefCatalog({ furnitures }) {
    return (
        <div className="">
            <h2 className="title text-center mt-[5%] mb-[35px]">Наша продукция</h2>

            <div className="container flex flex-wrap gap-x-[40px] gap-y-[40px] justify-center">
                {furnitures.map((furniture) => {
                    const imagePath = `/image/furniture/${furniture.category}/${furniture.image}.png`;
                    return (
                        <FurnitureCard
                            key={furniture.id}
                            id={furniture.id}
                            image={imagePath}
                            name={furniture.name}
                            tags={furniture.tags}
                            price={furniture.price}
                        />
                    );
                })}

            </div>
        </div>
    )
}
