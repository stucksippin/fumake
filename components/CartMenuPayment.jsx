'use client'
import useCartStore from '@/app/store/useCartStore'
import React, { useEffect, useState } from 'react'

export default function CartMenuPayment() {

    const { items } = useCartStore()
    const [hydrated, setHydrated] = useState(false);
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const editPrice = String(totalPrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.')

    useEffect(() => {
        setHydrated(true);
    }, [items]);

    if (!hydrated) return null;

    const secretWord = 'qwerty'
    return (
        <div className='cart_menu  bg-[#F9F1E7] p-8 flex flex-col h-[400px] justify-evenly rounded-lg'>
            <span className='text-[24px] font-semibold text-center mb-5'>Корзина</span>
            <div className='flex justify-between mb-3'>
                <span className='font-semibold'>К оплате</span>
                <span>{editPrice} ₽</span>
            </div>
            <div className='flex justify-between mb-3'>
                <span className='font-semibold'>Итого</span>
                <span>{editPrice} ₽</span>
            </div>
            <div className='flex flex-col items-end'>
                <input className='w-full px-2 py-1 border border-black border-b-0 border-t-0 rounded-lg bg-[#fffaf4]' type="text" placeholder='Промокод' />
                <button className='mt-3 p-1 text-[12px] border border-black rounded-lg'>Применить</button>
            </div>
            <div className='flex justify-center mt-8'>
                <button className="w-fit py-3 px-8 text-[12px] border border-black font-semibold  rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" type="text">ОПЛАТИТЬ</button>
            </div>
        </div>
    )
}