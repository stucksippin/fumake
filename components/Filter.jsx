import React from 'react'
import SearchItem from './SearchItem'
import FilterAccordion from './FilterAccordion'

export default function Filter() {

    return (
        <div className='container rounded-lg p-5 bg-[#F9F1E7] flex'>
            <SearchItem />
            <div className=''>
                <FilterAccordion />
            </div>

        </div>
    )
}
