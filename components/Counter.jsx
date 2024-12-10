import React, { useState } from 'react'

export default function Counter() {
    const maxItems = 10
    const [counter, setCounter] = useState(1)
    return (
        <div className='text-2xl select-none border w-fit rounded-lg p-1'>
            <span
                className='cursor-pointer mr-5'
                onClick={() => {
                    if (counter > 1)
                        setCounter(counter - 1)
                }}
            >-</span>
            <span className='text-[16px]'>{counter}</span>
            <span
                className='cursor-pointer ml-5'
                onClick={() => {
                    if (counter < maxItems)
                        setCounter(counter + 1)
                }}>+</span>
        </div>
    )
}
