import Image from 'next/image'
import React from 'react'

export default function FurnitureCard({ id, name, tags, price, image }) {
    return (
        <div className='flex flex-col'>
            {/* <Image width={285} height={300} src={image} alt='furniture' /> */}
            <img width={285} height={300} src={image} alt='furniture' />

            <span className='font-bold text-[#484848] text-[]'>{name}</span>
            <span>{price} руб</span>

        </div>
    )
}
