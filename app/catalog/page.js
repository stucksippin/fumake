import Image from 'next/image'
import React from 'react'
import catalog from '/public/image/catalogBanner.png'
import Filter from '@/components/Filter'
import BreefCatalog from '@/components/BreefCatalog'
import getFurniture from '@/libs/getFurniture'

export default async function CatalogPage() {
    const furnitures = await getFurniture()
    return (
        <div>
            <div className='container relative'>
                <Image className='opacity-50' width={1440} height={316} src={catalog} />
                <span className='absolute top-[45%] left-[45%] title'>Каталог</span>
            </div>
            <Filter />
            <BreefCatalog furnitures={furnitures} />
        </div>
    )
}
