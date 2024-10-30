import Image from 'next/image'
import React from 'react'

export default function FurnitureCard({ id, name, tags, price, image }) {
    return (
        <div className='flex flex-col'>
            <Image width={285} height={300} src={image} alt='furniture' />
            <span>{name}</span>
            <span>{price} руб</span>

        </div>
    )
}
