import { Rate } from 'antd';
import Image from 'next/image'
import React from 'react'

export default function InnerFurnitureCard({ image, name, discription, size, price, color, category, tags, reviews }) {
    const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
    // const arr = ['color', 'color']
    return (
        <div className='container mx-auto pt-5'>
            {/* {arr.map((item, i) => (
                <div key={i} className={`w-5 h-5 rounded-full`} style={{ backgroundColor: item }}></div>
            ))} */}
            <div className='flex justify-around'>
                <div>
                    <Image src={image} width={285} height={300} />
                </div>
                <div className='flex flex-col'>
                    <span className='text-3xl mb-2'>{name}</span>
                    <span className='text-2xl mb-2'>{price} руб.</span>
                    <div className='flex items-center'>
                        <Rate allowHalf value={averageRating} disabled />
                        <span className='ml-2'> Отзывов | {reviews.length}</span>
                    </div>

                    <span>{discription}</span>
                    <label className='text-gray-400'>Размер</label>
                    <span>{size}</span>


                    <label className='text-gray-400'>Цвет</label>
                    <span>{color}</span>



                </div>
            </div>

            <div className='flex flex-col mt-[5%]'>

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
