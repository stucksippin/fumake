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
        <div className='section_cart container'>
            <div className='relative'>
                <Breadcrumb className='breadcrumb mb-5 text-[18px] absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2  z-10' items={breadcrumbItems} />
                <Image className='opacity-50 mx-auto' width={1536} height={316} src={cart_image} alt='cart banner' />
                <span className='breadcrumb_title breadcrumb_title_catalog absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 title'>Корзина</span>
            </div>
            <div className='cart_items flex justify-between mt-10'>

                <CartTable />
                <CartMenuPayment />
            </div>
        </div>
    )
}
