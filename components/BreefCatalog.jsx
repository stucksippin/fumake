import FurnitureCard from "./FurnitureCard";

export default function BreefCatalog({ furnitures }) {




    return (
        <div>
            <h2 className="title text-center mt-[5%]">Наша продукция</h2>

            <div>
                {furnitures.map((furniture) => {
                    const imagePath = `/image/furniture/${furniture.category}/${furniture.image}.png`;
                    console.log(imagePath);
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
