export const dynamic = 'force-dynamic'
import Image from 'next/image'
import React from 'react'
import catalog from '/public/image/catalogBanner.png'
import Filter from '@/components/Filter'
import getFurniture from '@/libs/getFurniture'
import MainCatalog from '@/components/MainCatalog'
import { Breadcrumb } from 'antd'
import Link from 'next/link'

export default async function CatalogPage({ searchParams = {} }) {
    const furnitures = await getFurniture(searchParams);

    const breadcrumbItems = [
        {
            title: <Link href={"/"}>Главная</Link>,
        },
        {
            title: 'Каталог'
        },
    ]

    return (
        <div className="min-h-screen">
            <div className='relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] overflow-hidden'>
                <Breadcrumb
                    className='absolute z-10 text-sm sm:text-base md:text-lg lg:text-xl top-[60%] sm:top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2'
                    items={breadcrumbItems}
                />
                <Image
                    className='w-full h-full object-cover opacity-50'
                    src={catalog}
                    alt='catalog banner'
                    fill
                    priority
                />

                <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center'>
                    Каталог
                </h1>
            </div>
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
                <Filter searchParams={searchParams} />
                <MainCatalog furnitures={furnitures} />
            </div>
        </div>
    )
}