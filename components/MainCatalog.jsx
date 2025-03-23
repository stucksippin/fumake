'use client';
import { Pagination } from "antd";
import FurnitureCard from "./FurnitureCard";
import { useState } from "react";


export default function MainCatalog({ furnitures }) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = furnitures.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="mt-[5%]">
            <div className="container flex flex-wrap gap-x-[40px] gap-y-[40px] justify-center">
                {currentItems.length > 0 ? (
                    currentItems.map((furniture) => {
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

            <div className="flex justify-center pagination-container text-center mt-4">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={furnitures.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}
