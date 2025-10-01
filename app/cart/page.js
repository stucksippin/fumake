import CartMenuPayment from '@/components/CartMenuPayment'
import CartTable from '@/components/CartTable'
import React from 'react'
import cart_image from '/public/image/catalogBanner.png'
import Image from 'next/image'
import { Breadcrumb } from 'antd'
import Link from 'next/link'

export default function CartPage() {
    const breadcrumbItems = [
        {
            title: <Link href={"/"}>Главная</Link>,
        },
        {
            title: <Link href={"/catalog"}>Каталог</Link>,
        },
        {
            title: 'Корзина'
        },
    ]
    return (
        <div>
            <div className='relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] overflow-hidden'>
                <Breadcrumb className='absolute z-10 text-sm sm:text-base md:text-lg lg:text-xl top-[60%] sm:top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2' items={breadcrumbItems} />
                <Image className='w-full h-full object-cover opacity-50' width={1536} height={316} src={cart_image} alt='cart banner' />
                <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center'>Корзина</h1>
            </div>
            <div className='section_cart container'>

                <div className='cart_items flex justify-between mt-10'>

                    <CartTable />
                    <CartMenuPayment />
                </div>
            </div>
        </div>
    )
}
