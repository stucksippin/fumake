'use client'
import useCartStore from '@/app/store/useCartStore';
import { Button, InputNumber, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'

export default function CartTable() {



    const { items, removeItem, updateQuantity, clearCart } = useCartStore()


    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true); // Ждем, пока компонент загрузится на клиенте
    }, []);

    if (!hydrated) return null; // Пока клиент не загрузился, ничего не рендерим

    function handleMessage() {
        message.success('Корзина очищена')
    }



    console.log("Товары в корзине:", items);
    const columns = [
        {
            title: 'Продукт',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <img src={record.image} alt={text} className="w-16 h-16 object-cover rounded" />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price} ₽`,
        },
        {
            title: 'Кол-во',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, record) => (
                <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => updateQuantity(record.id, value)}
                />
            ),
        },
        {
            title: 'Итог',
            key: 'subtotal',
            render: (_, record) => `${record.price * record.quantity} ₽`,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <button onClick={() => removeItem(record.id)}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.625 7H20.125V4.8125C20.125 3.84727 19.3402 3.0625 18.375 3.0625H9.625C8.65977 3.0625 7.875 3.84727 7.875 4.8125V7H4.375C3.89102 7 3.5 7.39102 3.5 7.875V8.75C3.5 8.87031 3.59844 8.96875 3.71875 8.96875H5.37031L6.0457 23.2695C6.08945 24.202 6.86055 24.9375 7.79297 24.9375H20.207C21.1422 24.9375 21.9105 24.2047 21.9543 23.2695L22.6297 8.96875H24.2812C24.4016 8.96875 24.5 8.87031 24.5 8.75V7.875C24.5 7.39102 24.109 7 23.625 7ZM18.1562 7H9.84375V5.03125H18.1562V7Z"
                            fill="#B88E2F" />
                    </svg>

                </button>
            ),
        },
    ];

    const data = items.map((item) => ({
        key: item.id,
        ...item
    }))


    return (
        <div className='cart_table'>
            <Table className='w-full' columns={columns} dataSource={data} rowKey="id" pagination={false} />
            {items.length > 0 &&
                <button onClick={clearCart} handleMessage className='border border-black p-2 rounded-lg text-[10px] mt-10'>Очистить корзину</button>
            }

        </div>


    )
}
