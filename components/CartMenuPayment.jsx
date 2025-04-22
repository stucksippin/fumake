'use client'
import useCartStore from '@/app/store/useCartStore'
import { message } from 'antd';
import React, { useEffect, useState } from 'react'

export default function CartMenuPayment() {
    const { items, discountedPrice, updateDiscountedPrice, setPromoCodeUsed } = useCartStore()
    const [hydrated, setHydrated] = useState(false);
    const [promoCode, setPromoCode] = useState('');

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const secretWord = 'qwerty';
    const perOfDiscount = 15;

    function handleApplyPromoCode() {
        if (promoCode === secretWord) {
            const newPrice = totalPrice - (totalPrice * (perOfDiscount / 100));
            setPromoCodeUsed(true);  // Устанавливаем, что промокод был применён
            updateDiscountedPrice(newPrice);  // Обновляем скидочную цену
            message.success("Промокод успешно активирован");
        } else {
            setPromoCodeUsed(false);  // Промокод не применён
            updateDiscountedPrice(totalPrice);  // Сбрасываем цену до обычной
            message.error("Промокод неверен!");
        }
    }

    const formatPrice = (price) => String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');

    useEffect(() => {
        setHydrated(true);
    }, [items]);

    if (!hydrated) return null;

    return (
        <div className='cart_menu bg-[#F9F1E7] p-8 flex flex-col h-[400px] justify-evenly rounded-lg'>
            <span className='payment_window-title text-[24px] font-semibold text-center mb-5'>Сумма заказа</span>

            <div className='payment_window-block flex justify-between mb-3'>
                <span className='font-semibold payment_window-text'>К оплате</span>
                <span className=' payment_window-text'>{formatPrice(totalPrice)} ₽</span>
            </div>

            <div className='payment_window-block flex justify-between mb-3'>
                <span className='font-semibold payment_window-text'>Итого</span>
                <span className=' payment_window-text'>{formatPrice(discountedPrice)} ₽</span>
            </div>

            <div className='flex flex-col items-end'>
                <input
                    className='payment_window-input w-full px-2 py-1 border border-black border-b-0 border-t-0 rounded-lg bg-[#fffaf4]'
                    type="text"
                    placeholder='Промокод'
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                    onClick={handleApplyPromoCode}
                    className='payment_window-confirm mt-3 p-1 text-[12px] border border-black rounded-lg'>
                    Применить
                </button>
            </div>
            <div className='flex justify-center mt-8'>
                <button className="payment_window-btn w-fit py-3 px-8 text-[12px] border border-black font-semibold rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" type="text">ОПЛАТИТЬ</button>
            </div>
        </div>
    )
}
