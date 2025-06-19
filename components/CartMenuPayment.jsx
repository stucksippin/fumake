'use client'
import useCartStore from '@/app/store/useCartStore'
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import CheckoutButton from './CheckoutButton';

export default function CartMenuPayment() {
    const { items, discountedPrice, updateDiscountedPrice, promoCodeUsed, setPromoCodeUsed } = useCartStore()
    const [hydrated, setHydrated] = useState(false);
    const [promoCode, setPromoCode] = useState('');

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const secretWord = 'qwerty';
    const perOfDiscount = 15;

    function handleApplyPromoCode() {
        if (promoCode === secretWord) {
            const newPrice = totalPrice - (totalPrice * (perOfDiscount / 100));
            setPromoCodeUsed(true);
            updateDiscountedPrice(newPrice);
            message.success("Промокод успешно активирован");
        } else {
            setPromoCodeUsed(false);
            updateDiscountedPrice(totalPrice);
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
                <div className='payment_window-text flex flex-col items-end'>
                    {promoCodeUsed ? (
                        <>
                            <span className='line-through text-gray-500'>{formatPrice(totalPrice)} ₽</span>
                            <span className='text-green-600 font-bold'>{formatPrice(discountedPrice)} ₽</span>
                        </>
                    ) : (
                        <span>{formatPrice(totalPrice)} ₽</span>
                    )}
                </div>
            </div>

            {promoCodeUsed && (
                <div className='text-green-700 font-medium text-[12px] mb-3 text-right'>Промокод применён: -{perOfDiscount}%</div>
            )}

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
                <CheckoutButton />
            </div>
        </div>
    )
}
