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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            applyQuery();
        }
    }

    return (
        <div className='w-full max-w-sm lg:w-auto'>
            <div className='flex items-center bg-white rounded-xl border-2 border-gray-200 focus-within:border-[#BAA898] focus-within:ring-4 focus-within:ring-stone-100 transition-all duration-300 shadow-sm hover:shadow-md min-w-0'>
                <Input
                    placeholder='Поиск товаров...'
                    className='border-none rounded-xl h-12 px-4 text-base placeholder:text-gray-400 focus:shadow-none min-w-0 flex-1'
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                        boxShadow: 'none',
                        minWidth: 0
                    }}
                />
                <button
                    onClick={applyQuery}
                    className='flex items-center justify-center w-12 h-12 rounded-r-xl bg-[#BAA898] hover:bg-[#a89886] transition-all duration-300 hover:scale-105 active:scale-95 group flex-shrink-0'
                    aria-label="Поиск"
                >
                    <Image
                        className='transition-transform duration-200 group-hover:scale-110'
                        src={lens}
                        width={20}
                        height={20}
                        alt='поиск'
                        style={{ filter: 'brightness(0) invert(1)' }}
                    />
                </button>
            </div>
        </div>
    )
}