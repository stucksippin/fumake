'use client'
import { Button, Rate } from 'antd';
import Image from 'next/image'
import React from 'react'
import Counter from './Counter';

export default function InnerFurnitureCard({ image, name, discription, size, price, color, category, tags, reviews }) {
    const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
    const editPrice = String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.')
    return (
        <div className='container mx-auto pt-5'>

            <div className='flex px-24 justify-around mb-[5%]'>
                <div className='flex'>
                    <div className='flex flex-col justify-between'>
                        <Image src={image} width={65} height={50} />
                        <Image src={image} width={65} height={50} />
                        <Image src={image} width={65} height={50} />
                        <Image src={image} width={65} height={50} />
                        <Image src={image} width={65} height={50} />
                    </div>
                    <div className='ml-2'>
                        <Image src={image} width={400} height={400} />
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
                            size.map((size, index) => (
                                <button key={index} className="border border-gray-400 p-1 rounded-md mr-2 mb-2">
                                    {size}
                                </button>
                            ))
                        )}
                    </div>

                    <label className='text-gray-400 mb-2'>Цвет</label>
                    <div className='flex'>
                        <div className='flex'>
                            {color.length > 0 && (
                                color.map((code, index) => (
                                    <button key={index} className='border border-gray-400 rounded-full w-[30px] h-[30px] mr-2' style={{ backgroundColor: code }}></button>
                                ))
                            )}
                        </div>
                    </div>


                    <div className='flex mt-5'>
                        <Counter />
                        <button type='default' className='px-5 text-[12px] border bg-white hover:bg-[#FFF3E3]  border-black ml-4 font-semibold  rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Добавить в корзину</button>
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
