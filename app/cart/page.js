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
        <div className='container'>
            <div className='relative'>
                <Breadcrumb className='breadcrumb breadcrumb_cart mb-5 text-[18px] absolute top-[60%] left-[42%] z-10' items={breadcrumbItems} />
                <Image className='opacity-50 mx-auto' width={1536} height={316} src={cart_image} alt='cart banner' />
                <span className='breadcrumb_title breadcrumb_title_cart absolute top-[45%] left-[46%] title'>Корзина</span>
            </div>
            <div className=' flex justify-between mt-10'>

                <CartTable />
                <CartMenuPayment />
            </div>
        </div>
    )
}
