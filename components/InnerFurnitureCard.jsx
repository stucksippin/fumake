'use client'
import { Button, Rate } from 'antd';
import Image from 'next/image'
import React from 'react'
import Counter from './Counter';

export default function InnerFurnitureCard({ image, name, discription, size, price, color, category, tags, reviews }) {
    const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
    // const arr = ['color', 'color']


    return (
        <div className='container mx-auto pt-5'>
            {/* {arr.map((item, i) => (
                <div key={i} className={`w-5 h-5 rounded-full`} style={{ backgroundColor: item }}></div>
            ))} */}
            <div className='flex justify-center mb-[5%]'>
                <div className='flex mr-[10%]'>
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
                    <span className='text-2xl mb-2'>{price} руб.</span>
                    <div className='flex items-center'>
                        <Rate allowHalf value={averageRating} disabled />
                        <span className='ml-2'> Отзывов | {reviews.length}</span>
                    </div>

                    <span className='mt-5 mb-5'>{discription}</span>
                    <label className='text-gray-400'>Размер</label>
                    <button className='border w-fit p-1 rounded-md'>{size}</button>


                    <label className='text-gray-400'>Цвет</label>
                    <span>{color}</span>
                    <div className='flex mt-5'>
                        <Counter />
                        <button type='default' className='px-5 text-[12px] border bg-white hover:bg-[#FFF3E3]  border-black ml-4 font-semibold  rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Добавить в корзину</button>
                    </div>


                </div>
            </div>

            <div className='container flex flex-col'>

                <span className='text-3xl text-center'>Отзывы</span>
                <div className='flex gap-x-10 mt-5'>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="border rounded-lg p-5">
                                <p className='text-right'>John Doe</p>
                                <p className=''><Rate allowHalf value={review.rating} disabled /></p>
                                <p>{review.content}</p>
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
