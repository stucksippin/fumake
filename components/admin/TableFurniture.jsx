import React, { useState } from 'react';
import { Table, Tag, Button, Space } from 'antd';
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
                        src={record.image}
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
            width: '90px',
            render: (price) => `${price} ₽`,
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
        },

        {
            title: 'Теги',
            dataIndex: 'tags',
            key: 'tags',
            width: '200px',
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

                            try {
                                const res = await fetch(`/api/furniture/delete?id=${record.id}`, {
                                    method: 'DELETE',
                                });

                                const data = await res.json();

                                if (data.success) {
                                    location.reload(); // или обнови локальное состояние
                                } else {
                                    console.error(data.error);
                                    alert("Ошибка при удалении");
                                }
                            } catch (err) {
                                console.error(err);
                                alert("Произошла ошибка при удалении");
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

                            try {
                                const res = await fetch(`/api/variations/delete?id=${record.id}`, {
                                    method: 'DELETE',
                                });

                                const data = await res.json();

                                if (data.success) {
                                    location.reload(); // или локальный рефетч списка
                                } else {
                                    console.error(data.error);
                                    alert("Ошибка при удалении вариации");
                                }
                            } catch (err) {
                                console.error(err);
                                alert("Ошибка соединения с сервером");
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
