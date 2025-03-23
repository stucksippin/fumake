'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import lens from '@/public/image/header/search.png'
import Input from 'antd/es/input/Input'
import { useRouter } from 'next/navigation'

export default function SearchItem() {
    const [query, setQuery] = useState('')

    const router = useRouter()

    function applyQuery() {
        const nameParams = new URLSearchParams()
        if (query) nameParams.set("name", query)
        router.push(`?${nameParams.toString()}`, { scroll: false });
        console.log('qweqweqweqweqweqweqweqweq', nameParams);
    }

    return (

        <div className='flex items-center'>

            <Input
                placeholder='Что ищем?'
                className='ml-2 border border-black rounded-lg px-2 h-[30px] w-[300px]'
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={applyQuery} className='hover:transition-all ease-in-out delay-150'>
                <Image className='ml-2' src={lens} width={19} alt='lens' />
            </button>
        </div>
    )
}
