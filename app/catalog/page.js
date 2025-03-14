import Image from 'next/image'
import React from 'react'
import catalog from '/public/image/catalogBanner.png'
import Filter from '@/components/Filter'
import useFilterStore from '../store/useFilterStore'
import getFurniture from '@/libs/getFurniture'
import MainCatalog from '@/components/MainCatalog'
import { Breadcrumb } from 'antd'
import Link from 'next/link'

export default async function CatalogPage({ searchParams }) {
    const { category, color, priceMin, priceMax, orderBy } = useFilterStore.getState();
    const furnitures = await getFurniture(searchParams);
    console.log(searchParams);

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

            <div className='container relative'>
                <Breadcrumb
                    className='mb-5 text-[18px] absolute top-[60%] left-[45%] z-10'
                    items={breadcrumbItems}
                />
                <Image className='opacity-50 mx-auto' width={1536} height={316} src={catalog} alt='catalog banner' />
                <span className='absolute top-[45%] left-[46%] title'>Каталог</span>
            </div>
            <Filter />
            <MainCatalog furnitures={furnitures} />
        </div>
    )
}
