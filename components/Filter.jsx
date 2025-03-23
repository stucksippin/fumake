import React from 'react'
import SearchItem from './UI/SearchItem'
import FilterAccordion from './UI/FilterAccordion'

export default function Filter() {

    return (
        <div className='container rounded-lg p-5 bg-[#F9F1E7] flex justify-center'>
            <div className=' flex flex-wrap'>
                <SearchItem />
                <FilterAccordion />
            </div>

        </div>
    )
}
