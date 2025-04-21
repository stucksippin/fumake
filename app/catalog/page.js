export const dynamic = 'force-dynamic' // разобраться 

import Image from 'next/image'
import React from 'react'
import catalog from '/public/image/catalogBanner.png'
import Filter from '@/components/Filter'
import getFurniture from '@/libs/getFurniture'
import MainCatalog from '@/components/MainCatalog'
import { Breadcrumb } from 'antd'
import Link from 'next/link'

export default async function CatalogPage({ searchParams }) {
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
        <div>

            <div className='container relative h-full w-full object-cover object-left'>
                <Breadcrumb
                    className='breadcrumb mb-5 text-[18px] absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2  z-10'
                    items={breadcrumbItems}
                />
                <Image className='opacity-50 mx-auto' width={1536} height={316} src={catalog} alt='catalog banner' />
                <span className='breadcrumb_title breadcrumb_title_catalog absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 title'>Каталог</span>
            </div>
            <Filter searchParams={searchParams} />
            <MainCatalog furnitures={furnitures} />
        </div>
    )
}

