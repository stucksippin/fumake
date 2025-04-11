import React, { useState } from 'react';
import { Table, Tag, Button } from 'antd';
import dynamic from 'next/dynamic';

const ChangeModal = dynamic(() => import('./ChangeModal'), { ssr: false });

export default function TableFurniture({ furnitures }) {
    const [selectedFurniture, setSelectedFurniture] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const data = furnitures.map((item) => ({
        key: item.id,
        ...item
    }));

    const columns = [
        {
            title: 'Продукт',
            dataIndex: 'name',
            key: 'name',
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
                if (!reviews || reviews.length === 0) return <span>Нет оценки</span>;
                const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
                return <span>{averageRating.toFixed(1)} ★</span>;
            }
        },
        {
            title: 'Теги',
            dataIndex: 'tags',
            key: 'tags',
            width: '250px',
            render: (tags) => (
                <div>
                    {tags?.length ? tags.map((tag, index) => <Tag key={index}>{tag.name}</Tag>) : <span>Нет тегов</span>}
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
                    {variations?.length ? [...new Map(variations.map(v => [v.color.id, v.color])).values()].map((color, index) => (
                        <Tag key={index}>{color.name}</Tag>
                    )) : <span>Нет цветов</span>}
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
                    {variations?.length ? [...new Set(variations.map(v => v.size))].map((size, index) => <Tag key={index}>{size}</Tag>) : <span>Нет размеров</span>}
                </div>
            ),
        },
        {
            title: 'Действие',
            key: 'action',
            render: (_, record) => (
                <Button
                    onClick={() => {
                        setSelectedFurniture(record);
                        setIsModalOpen(true);
                    }}
                >
                    ✏️ Редактировать
                </Button>
            ),
        },
    ];

    return (
        <>
            <Table pagination={{ pageSize: 12 }} columns={columns} dataSource={data} />
            {selectedFurniture && (
                <ChangeModal
                    furniture={selectedFurniture}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}
