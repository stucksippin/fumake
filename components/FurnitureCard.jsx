import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function FurnitureCard({ id, name, tags, price, image }) {


    const editPrice = String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.')
    return (
        <Link href={`/catalog/${id}`} className='flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
            {/* <Image width={285} height={300} src={image} alt='furniture' /> */}
            <img className='rounded-lg' width={285} height={300} src={image} alt='furniture' />

            <span className='font-bold text-[#484848] text-[]'>{name}</span>
            <span className=''>{editPrice} ₽</span>
        </Link>
    )
}
