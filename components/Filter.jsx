import React from 'react'
import SearchItem from './UI/SearchItem'
import FilterAccordion from './UI/FilterAccordion'

export default function Filter() {
    return (
        <div className='w-full bg-gradient-to-r from-stone-50 to-neutral-50 border border-stone-200 rounded-2xl shadow-sm'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-center'>
                    <div className='w-full lg:w-auto lg:flex-shrink-0 flex justify-center'>
                        <SearchItem />
                    </div>

                    <div className='hidden lg:block w-px h-12 bg-stone-300'></div>

                    <div className='w-full lg:w-auto lg:flex-shrink-0 flex justify-center'>
                        <FilterAccordion />
                    </div>
                </div>
            </div>
        </div>
    )
}