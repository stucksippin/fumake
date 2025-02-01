'use client';
import { Pagination } from "antd";
import FurnitureCard from "./FurnitureCard";
import { useState } from "react";
import useFilterStore from "@/app/store/useFilterStore";

export default function MainCatalog({ furnitures }) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    // Достаем фильтры из Zustand
    const { category, color, priceMin, priceMax } = useFilterStore();

    // Фильтруем товары перед пагинацией
    const filteredFurnitures = furnitures.filter(furniture => {
        const matchesCategory = category ? furniture.category === category : true;
        const matchesColor = color
            ? furniture.variations.some(variation => variation.color?.name === color)
            : true;

        const matchesPrice = furniture.price >= priceMin && furniture.price <= priceMax;

        return matchesCategory && matchesColor && matchesPrice;
    });

    // Пагинация
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = filteredFurnitures.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="mt-[5%]">
            <div className="container flex flex-wrap gap-x-[40px] gap-y-[40px] justify-center">
                {currentItems.length > 0 ? (
                    currentItems.map((furniture) => {
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
                    })
                ) : (
                    <p className="text-center text-gray-500">Ничего не найдено</p>
                )}
            </div>

            <div className="flex justify-center pagination-container text-center mt-4">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredFurnitures.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}
