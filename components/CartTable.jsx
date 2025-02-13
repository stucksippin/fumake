'use client'
import useCartStore from '@/app/store/useCartStore';
import { Button, InputNumber, Table } from 'antd';
import React, { useEffect, useState } from 'react'

export default function CartTable() {



    const { items, removeItem, updateQuantity } = useCartStore()


    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true); // Ждем, пока компонент загрузится на клиенте
    }, []);

    if (!hydrated) return null; // Пока клиент не загрузился, ничего не рендерим





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
                <Button danger onClick={() => removeItem(record.id)}>
                    Удалить
                </Button>
            ),
        },
    ];

    const data = items.map((item) => ({
        key: item.id,
        ...item
    }))


    return (
        <div className='cart_table'>
            <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />
        </div>
    )
}
