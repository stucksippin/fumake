import Image from 'next/image'
import React from 'react'
import lens from '../public/image/header/search.png'
import Input from 'antd/es/input/Input'

export default function SearchItem() {
    return (
        <div className='flex items-center ml-[5%]'>

            <div>
                <Image className='' src={lens} width={19} alt='lens' />
            </div>
            <Input className='ml-2 border border-black rounded-lg px-2 h-[30px] w-[300px]' type="text" />

        </div>
    )
}
