
import React from 'react';
import { Table, Tag } from 'antd';
import dynamic from 'next/dynamic';

const ChangeModal = dynamic(() => import('./ChangeModal'), { ssr: false });

export default async function TableFurniture({ furnitures }) {

    const data = furnitures.map((item) => ({
        key: item.id,
        ...item
    }));


    const columns = [
        {
            title: 'Продукт',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="flex items-center gap-3">
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
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Рейтинг',
            dataIndex: 'reviews',
            key: 'rate',
            render: (reviews) => {
                if (!reviews || reviews.length === 0) {
                    return <span>Нет оценки</span>;
                }
                const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;


                return <span>{averageRating} ★</span>;
            }
        },
        {
            title: 'Теги',
            dataIndex: 'tags',
            key: 'tags',
            width: '250px',
            render: (tags) => (
                <div>
                    {tags && tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <Tag key={index}>{tag.name}</Tag>
                        ))
                    ) : (
                        <span>Нет тегов</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Цвета',
            dataIndex: 'variations',
            key: 'colors',
            width: '200px',
            render: (variations) => (
                <div>
                    {variations && variations.length > 0 ? (
                        variations.map((variation, index) => (
                            <Tag key={index}>{variation.color.name}</Tag>
                        ))
                    ) : (
                        <span>Неn цветов</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Размеры',
            dataIndex: 'variations',
            key: 'size',
            width: '200px',
            render: (variations) => (
                <div>
                    {variations && variations.length > 0 ? (
                        variations.map((variation, index) => (
                            <Tag key={index}>{variation.size}</Tag>
                        ))
                    ) : (
                        <span>Неn цветов</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Действие',
            key: 'action',
            render: () => (
                <div className='border w-fit p-1 rounded-md'>
                    <ChangeModal />

                </div>
            )
        },
    ];

    return (
        <Table pagination={{ pageSize: 12 }} columns={columns} dataSource={data} />
    )
}
