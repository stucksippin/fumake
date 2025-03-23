'use client'
import {Rate, message } from 'antd';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useCartStore from '@/app/store/useCartStore';


export default function InnerFurnitureCard({ id, image, name, discription, size, price, color, category, tags, reviews }) {
    const { addItem } = useCartStore();
    const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
    const editPrice = String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');

    const [selectedSize, setSelectedSize] = useState(size.length > 0 ? size[0] : null);
    const [selectedColor, setSelectedColor] = useState(color.length > 0 ? color[0] : null);

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
        message.success('Товар добавлен в корзину ');
    };


    return (
        <div className='container mx-auto pt-5'>
            <div className='flex px-24 justify-around mb-[5%]'>
                <div className='flex'>
                    <div className='flex flex-col justify-between'>
                        <Image src={image} width={65} height={50} alt='image of product' />
                        <Image src={image} width={65} height={50} alt='image of product' />
                        <Image src={image} width={65} height={50} alt='image of product' />
                        <Image src={image} width={65} height={50} alt='image of product' />
                        <Image src={image} width={65} height={50} alt='image of product' />
                    </div>
                    <div className='ml-2'>
                        <Image src={image} width={400} height={400} alt='image of product' />
                    </div>
                </div>

                <div className='flex flex-col '>
                    <span className='text-3xl mb-2'>{name}</span>
                    <span className='text-2xl mb-2'>{editPrice} ₽</span>
                    <div className='flex items-center'>
                        <Rate allowHalf value={averageRating} disabled />
                        <span className='ml-2'> Отзывов | {reviews.length}</span>
                    </div>

                    <span className='mt-5 mb-5'>{discription}</span>

                    <label className='text-gray-400 mb-2'>Размер</label>
                    <div className="flex">
                        {size.length > 0 && (
                            size.map((sizeOption, index) => (
                                <button
                                    key={index}
                                    className={`border p-1 rounded-md mr-2 mb-2 ${selectedSize === sizeOption ? 'border-orange-400 border-[2.5px]' : 'border-gray-400'}`}
                                    onClick={() => setSelectedSize(sizeOption)}
                                >
                                    {sizeOption}
                                </button>
                            ))
                        )}
                    </div>

                    <label className='text-gray-400 mb-2'>Цвет</label>
                    <div className='flex'>
                        <div className='flex'>
                            {color.length > 0 && (
                                color.map((code, index) => (
                                    <button
                                        key={index}
                                        className={`border rounded-full w-[30px] h-[30px] mr-2 ${selectedColor === code ? 'border-orange-400  border-[2.5px]' : 'border-gray-400'}`}
                                        style={{ backgroundColor: code }}
                                        onClick={() => setSelectedColor(code)}
                                    ></button>
                                ))
                            )}
                        </div>
                    </div>

                    <div className='flex mt-5'>
                        <button
                            type='default'
                            className='px-5 py-3 text-[12px] border bg-white hover:bg-[#FFF3E3] border-black font-semibold rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
                            onClick={handleAddToCart}
                        >
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>

            {/* отзывы */}
            <div className='container flex flex-col pt-10'>
                <span className='text-3xl text-center mb-5'>Отзывы</span>
                <div className='flex flex-wrap gap-10 justify-center'>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="w-[250px] border rounded-lg p-5 ">
                                <p className='text-right'>John Doe</p>
                                <span><Rate allowHalf value={review.rating} disabled /></span>
                                <p className='mt-1'>{review.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>Нет отзывов</p>
                    )}
                </div>
            </div>
        </div>
    )
}
