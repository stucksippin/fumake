import Image from 'next/image'
import React from 'react'
import lens from '../public/image/header/search.png'

export default function SearchItem() {
    return (
        <div className='flex items-center'>

            <div>
                <Image className='' src={lens} width={22} alt='lens' />
            </div>
            <input className='ml-2 border border-black rounded-lg py-1 px-20' type="text" />

        </div>
    )
}
