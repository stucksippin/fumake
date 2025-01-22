import React from 'react'

export default function CartMenuPayment() {
    return (
        <div className='cart_menu bg-[#F9F1E7] p-8 flex flex-col rounded-lg'>
            <span className='text-[24px] font-semibold text-center mb-5'>Корзина</span>
            <div className='flex justify-between mb-3'>
                <span className='font-semibold'>К оплате</span>
                <span>1000 руб.</span>
            </div>
            <div className='flex justify-between mb-3'>
                <span className='font-semibold'>Итого</span>
                <span>1000 руб.</span>
            </div>
            <div className=''>
                <input className='w-full px-2 py-1 border border-black border-b-0 border-t-0 rounded-lg bg-[#fffaf4]' type="text" placeholder='Промокод' />
            </div>
            <div className='flex justify-center mt-8'>
                <button className="w-fit py-3 px-8 text-[12px] border border-black font-semibold  rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" type="text">ОПЛАТИТЬ</button>
            </div>
        </div>
    )
}