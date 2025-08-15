import React from 'react'
import SearchItem from './UI/SearchItem'
import FilterAccordion from './UI/FilterAccordion'

export default function Filter() {

    return (
        <div className='container rounded-lg p-5 bg-[#F9F1E7] box-border w-full'>
            <div className='flex  justify-center items-center gap-[20px] max-w-[1200px] mx-auto'>
                <SearchItem />
                <FilterAccordion />
            </div>

        </div>
    )
}
