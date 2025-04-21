import React, { useState } from 'react';
import { Table, Tag, Button, Badge, Space } from 'antd';
import { deleteVariation, deleteFurniture } from '@/libs/serverActions';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ChangeModal = dynamic(() => import('./ChangeModal'), { ssr: false });
const CreateVariation = dynamic(() => import('./CreateVariation'), { ssr: false });
const EditVariation = dynamic(() => import('./EditVariation'), { ssr: false });

export default function TableFurniture({ furnitures }) {
    const [selectedFurniture, setSelectedFurniture] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createTargetId, setCreateTargetId] = useState(null);

    const [editVariation, setEditVariation] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const data = furnitures.map((item) => ({
        key: item.id,
        ...item
    }));

    const columns = [
        {
            title: <div className='cart_table-title'>Продукт</div>,
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <Image
                        width={100}
                        height={100}
                        src={`/image/furniture/${record.category}/${record.image}.webp`}
                        alt={record.name}
                        className="cart_item-image w-16 h-16 object-cover rounded"
                    />
                    <span className='cart_item-text'>{record.name}</span>
                </div>
            )
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
            title: 'Количество вариаций',
            dataIndex: 'variations',
            key: 'variationsCount',
            render: (variations) => <span>{variations?.length || 0}</span>,
        },
        {
            title: 'Действие',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Button
                        className='mr-2'
                        onClick={() => {
                            setSelectedFurniture(record);
                            setIsModalOpen(true);
                        }}
                    >
                        Редактирование
                    </Button>
                    <Button
                        className='mr-2'
                        onClick={() => {
                            setCreateTargetId(record.id);
                            setIsCreateModalOpen(true);
                        }}
                    >
                        Добавить вариацию
                    </Button>

                    <Button
                        danger
                        onClick={async () => {
                            const confirmed = window.confirm("Удалить товар?");
                            if (!confirmed) return;

                            const resp = await deleteFurniture(record.id);
                            if (resp.success) {
                                location.reload();
                            } else {
                                console.error(resp.error);
                                alert("Ошибка при удалении товара");
                            }
                        }}
                    >
                        Удалить
                    </Button>

                </div>
            ),
        },
    ];

    const expandColumns = [
        {
            title: 'Цвет',
            dataIndex: 'color',
            key: 'color',
            render: (color) => <Tag color={color.code}>{color.name}</Tag>
        },
        {
            title: 'Размер',
            key: 'size',
            render: (_, record) => record.size?.size || '—'
        },
        {
            title: 'Изображения',
            key: 'images',
            render: (_, record) => (
                <span>{record.images?.length ?? 0} изображений</span>
            )
        },
        {
            title: 'Действие',
            key: 'operation',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        size="small"
                        onClick={() => {
                            setEditVariation(record);
                            setIsEditModalOpen(true);
                        }}
                    >
                        Редактировать
                    </Button>
                    <Button
                        size="small"
                        danger
                        onClick={async () => {
                            const confirmed = window.confirm("Удалить эту вариацию?");
                            if (!confirmed) return;

                            const resp = await deleteVariation(record.id);
                            if (resp.success) {
                                // можно вызывать обновление, если нужно перерендерить
                                location.reload(); // простейший способ обновить таблицу
                            } else {
                                console.error(resp.error);
                                alert("Ошибка при удалении вариации");
                            }
                        }}
                    >
                        Удалить
                    </Button>
                </Space>
            ),
        }
    ];

    const expandedRowRender = (record) => {
        return (
            <Table
                columns={expandColumns}
                dataSource={record.variations}
                pagination={false}
                rowKey="id"
            />
        );
    };

    return (
        <>
            <Table
                pagination={{ pageSize: 12 }}
                columns={columns}
                dataSource={data}
                expandable={{
                    expandedRowRender,
                    rowExpandable: (record) => record.variations?.length > 0,
                }}
            />
            {selectedFurniture && (
                <ChangeModal
                    furniture={selectedFurniture}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            {isCreateModalOpen && (
                <CreateVariation
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={() => { }}
                    furnitureId={createTargetId}
                />
            )}
            {isEditModalOpen && editVariation && (
                <EditVariation
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    variation={editVariation}
                />
            )}
        </>
    );
}
