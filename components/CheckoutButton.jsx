'use client'

import useCartStore from '@/app/store/useCartStore'

const CheckoutButton = () => {
    const { items, discountedPrice } = useCartStore()

    const handleCheckout = async () => {
        if (items.length === 0) {
            message.error('Корзина пуста')
            return
        }

        try {
            const res = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items, discountedPrice }),
            })

            const data = await res.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                message.error('Ошибка при создании сессии Stripe')
            }
        } catch (err) {
            console.error(err)
            message.error('Ошибка оплаты')
        }
    }


    return (
        <button
            onClick={handleCheckout}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
            Оплатить
        </button>
    )
}

export default CheckoutButton
