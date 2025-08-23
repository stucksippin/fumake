'use client';

import { useRouter } from "next/navigation";
import FurnitureCard from "./FurnitureCard";
import { useState } from "react";

export default function MainCatalog({ furnitures }) {
    const [visibleCount, setVisibleCount] = useState(10); // Сколько товаров показываем
    const itemsToShow = furnitures.slice(0, visibleCount); // Показываем только первые 10 товаров
    const router = useRouter()
    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 16); // Увеличиваем на 16 товаров
    };

    return (
        <div className="mt-[5%]">
            <div className="container grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {itemsToShow.length > 0 ? (
                    itemsToShow.map((furniture) => {
                        return (
                            <FurnitureCard
                                key={furniture.id}
                                id={furniture.id}
                                image={furniture.image}
                                name={furniture.name}
                                tags={furniture.tags}
                                price={furniture.price}
                            />
                        );
                    })
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 px-6">
                        <div className="bg-gradient-to-br from-stone-50 to-neutral-100 border-2 border-dashed border-[#BAA898]/30 rounded-2xl p-12 max-w-md w-full text-center shadow-sm">
                            {/* Иконка */}
                            <div className="mb-6">
                                <svg
                                    className="w-16 h-16 mx-auto text-[#BAA898]/60"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Товары не найдены
                            </h3>

                            {/* Описание */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                К сожалению, по выбранным фильтрам товаров не найдено.
                                Попробуйте изменить параметры поиска.
                            </p>

                            {/* Кнопка */}
                            <button
                                onClick={() => router.push('/catalog')}
                                className="bg-[#BAA898] hover:bg-[#a89886] text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                            >
                                Сбросить фильтры
                            </button>
                        </div>

                        {/* Дополнительные советы */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500 mb-2">Попробуйте:</p>
                            <div className="flex flex-wrap justify-center gap-2 text-xs">
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Изменить категорию</span>
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Убрать цветовой фильтр</span>
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Расширить ценовой диапазон</span>
                            </div>
                        </div>
                    </div>
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