import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import like from '../public/image/header/like.svg'
export default function FurnitureCard({ id, name, tags, price, image }) {


    const editPrice = String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.')
    return (
        <Link href={`/catalog/${id}`} className='flex relative flex-col transformCard'>
            {/* <Image width={285} height={300} src={image} alt='furniture' /> */}
            <div className='qw absolute top-5 right-5 bg-white hover:bg-[#C44B4B] p-2 rounded-3xl'>
                <svg
                    className='heart-icon'
                    width='23'
                    height='23'
                    viewBox='0 0 26 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M7.16683 1.5C3.94566 1.5 1.3335 4.08533 1.3335 7.275C1.3335 9.84983 2.35433 15.9608 12.4028 22.1383C12.5828 22.2479 12.7895 22.3058 13.0002 22.3058C13.2109 22.3058 13.4175 22.2479 13.5975 22.1383C23.646 15.9608 24.6668 9.84983 24.6668 7.275C24.6668 4.08533 22.0547 1.5 18.8335 1.5C15.6123 1.5 13.0002 5 13.0002 5C13.0002 5 10.388 1.5 7.16683 1.5Z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            </div>

            <img className='rounded-lg' width={285} height={300} src={image} alt='furniture' />
            <span className='font-bold text-[#484848] text-[]'>{name}</span>
            <span className=''>{editPrice} ₽</span>
        </Link>
    )
}
