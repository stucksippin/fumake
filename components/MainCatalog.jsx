'use client';

import FurnitureCard from "./FurnitureCard";
import { useState } from "react";

export default function MainCatalog({ furnitures }) {
    const [visibleCount, setVisibleCount] = useState(8); // Сколько товаров показываем
    const itemsToShow = furnitures.slice(0, visibleCount); // Показываем только первые 10 товаров

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 16); // Увеличиваем на 10 товаров
    };

    return (
        <div className="mt-[5%]">
            <div className="container flex flex-wrap gap-x-[40px] gap-y-[40px] justify-center">
                {itemsToShow.length > 0 ? (
                    itemsToShow.map((furniture) => {
                        const imagePath = `/image/furniture/${furniture.category}/${furniture.image}.webp`;
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
                    })
                ) : (
                    <span className="text-center p-4 rounded-lg mb-10 text-gray-500 border">Подходящих товаров по этим фильтрам не найдено</span>
                )}
            </div>

            {itemsToShow.length < furnitures.length && (
                <div className="flex justify-center pagination-container text-center mt-4">
                    <button
                        onClick={loadMore}
                        className="button"
                    >
                        Показать еще
                    </button>
                </div>
            )}
        </div>
    );
}
