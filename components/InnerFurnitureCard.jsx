'use client';

import { Rate, message } from 'antd';
import React, { useEffect, useState } from 'react';
import useCartStore from '@/app/store/useCartStore';
import ImageThumb from './UI/ImageThumb';

export default function InnerFurnitureCard({ id, image, name, discription, price, variations, reviews }) {

    console.log("Вариации", variations);

    // Группируем вариации по размерам
    const sizes = Array.from(new Set(variations.map(v => v.size.size)));
    console.log('размеры', sizes);

    // Группируем вариации по цветам
    const colors = Array.from(new Set(variations.map(v => v.color.code)));
    console.log('цвета', colors);
    const [selectedSize, setSelectedSize] = useState(sizes[0] || null);
    const [selectedColor, setSelectedColor] = useState(colors[0] || null);

    const { addItem } = useCartStore();

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    const editPrice = String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    useEffect(() => {
        // Если нет вариации с текущими size + color, то пробуем поменять один из них
        const variationExists = variations.some(
            v => v.size.size === selectedSize && v.color.code === selectedColor
        );

        if (!variationExists) {
            // Если текущий цвет не доступен для выбранного размера
            const colorsForSize = variations
                .filter(v => v.size.size === selectedSize)
                .map(v => v.color.code);

            if (!colorsForSize.includes(selectedColor)) {
                setSelectedColor(colorsForSize[0]);
                return;
            }

            // Если текущий размер не доступен для выбранного цвета
            const sizesForColor = variations
                .filter(v => v.color.code === selectedColor)
                .map(v => v.size.size);

            if (!sizesForColor.includes(selectedSize)) {
                setSelectedSize(sizesForColor[0]);
            }
        }
    }, [selectedSize, selectedColor, variations]);

    // Найти вариацию по текущему выбору
    const selectedVariation = variations.find(
        v => v.size.size === selectedSize && v.color.code === selectedColor
    );

    // Найти доступные цвета для выбранного размера
    const availableColors = variations
        .filter(v => v.size.size === selectedSize)
        .map(v => v.color.code);

    // Найти доступные размеры для выбранного цвета
    const availableSizes = variations
        .filter(v => v.color.code === selectedColor)
        .map(v => v.size.size);

    useEffect(() => {
        console.log("Обновленное состояние корзины:", useCartStore.getState().items);
    }, [useCartStore().items]);

    message.config({
        top: 60,
        duration: 3,
    });

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            message.warning("Выберите цвет и размер!");
            return;
        }

        const product = {
            id,
            name,
            price,
            image,
            selectedSize,
            selectedColor,
        };

        addItem(product);
        message.success('Товар добавлен в корзину');
    };

    return (
        <div className='mx-auto pt-5 px-4 sm:px-6 lg:px-8'>
            {/* Основная секция продукта */}
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 mb-12 lg:mb-16'>
                {/* Галерея изображений */}
                <div className='flex-1 lg:max-w-2xl'>
                    <ImageThumb images={selectedVariation?.images || []} />
                </div>

                {/* Информация о продукте */}
                <div className='flex-1 lg:max-w-xl space-y-6'>
                    {/* Заголовок и цена */}
                    <div className='space-y-3'>
                        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight'>
                            {name}
                        </h1>
                        <div className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#BAA898]'>
                            {editPrice} ₽
                        </div>
                    </div>

                    {/* Рейтинг и отзывы */}
                    <div className='flex items-center gap-3 py-2'>
                        <Rate allowHalf value={averageRating} disabled className='text-sm' />
                        <span className='text-gray-600 text-sm sm:text-base'>
                            Отзывов: {reviews.length}
                        </span>
                    </div>

                    {/* Описание */}
                    <div className='bg-gray-50 rounded-xl p-4 sm:p-6'>
                        <p className='text-gray-700 leading-relaxed text-sm sm:text-base'>
                            {discription}
                        </p>
                    </div>

                    {/* Выбор размера */}
                    <div className='space-y-3'>
                        <label className='block text-gray-700 font-semibold text-sm sm:text-base'>
                            Размер
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {sizes.map((sizeOption, index) => {
                                const isSelected = selectedSize === sizeOption;
                                return (
                                    <button
                                        key={index}
                                        className={`
                px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-medium text-sm sm:text-base
                transition-all duration-200 min-w-[50px]
                ${isSelected
                                                ? 'bg-[#BAA898] text-white shadow-lg'
                                                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#BAA898] hover:bg-orange-50'
                                            }
            `}
                                        onClick={() => setSelectedSize(sizeOption)}
                                    >
                                        {sizeOption}
                                    </button>
                                );
                            })}


                        </div>
                    </div>

                    {/* Выбор цвета */}
                    <div className='space-y-3'>
                        <label className='block text-gray-700 font-semibold text-sm sm:text-base'>
                            Цвет
                        </label>
                        <div className='flex flex-wrap gap-3'>
                            {colors.map((code, index) => {
                                const isAvailable = availableColors.includes(code);
                                const isSelected = selectedColor === code;
                                return (
                                    <button
                                        key={index}
                                        disabled={!isAvailable}
                                        className={`
                                            relative w-10 h-10 sm:w-12 sm:h-12 rounded-full
                                            transition-all duration-200 hover:scale-110
                                            ${isSelected
                                                ? 'shadow-lg ring-2 ring-[#BAA898]'
                                                : isAvailable
                                                    ? 'ring-2 ring-gray-200 hover:ring-gray-300 shadow-md'
                                                    : 'ring-2 ring-gray-200 opacity-30 cursor-not-allowed'
                                            }
                                        `}
                                        style={{ backgroundColor: code }}
                                        onClick={() => isAvailable && setSelectedColor(code)}
                                    >
                                        {isSelected && (
                                            <div className='absolute inset-0 flex items-center justify-center'>
                                                <div className='w-3 h-3 bg-white rounded-full shadow-sm'></div>
                                            </div>
                                        )}
                                        {!isAvailable && (
                                            <div className='absolute inset-0 flex items-center justify-center'>
                                                <div className='w-8 h-0.5 bg-gray-400 rotate-45'></div>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Кнопка добавления в корзину */}
                    <div className='pt-6'>
                        <button
                            className={`
                                w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-semibold
                                bg-gradient-to-r from-[#BAA898] to-[#a1968c] text-white
                                rounded-xl shadow-lg hover:shadow-xl
                                transform transition-all duration-300
                                hover:-translate-y-1 hover:scale-105
                                active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-200
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                            `}
                            onClick={handleAddToCart}
                            disabled={!selectedSize || !selectedColor}
                        >
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>

            {/* Секция отзывов */}
            <div className='space-y-8'>
                <div className='text-center'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>Отзывы</h2>
                    <div className='w-20 h-1 bg-[#BAA898] mx-auto mt-4 rounded-full'></div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
                                <div className='flex items-center justify-between mb-3'>
                                    <span className='font-semibold text-gray-800'>
                                        {review.author || 'John Doe'}
                                    </span>
                                    <Rate allowHalf value={review.rating} disabled size="small" />
                                </div>
                                <p className='text-gray-600 leading-relaxed text-sm sm:text-base'>
                                    {review.content}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className='col-span-full text-center py-12'>
                            <div className='text-gray-400 text-lg'>Пока нет отзывов</div>
                            <p className='text-gray-500 mt-2'>Будьте первым, кто оставит отзыв!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}