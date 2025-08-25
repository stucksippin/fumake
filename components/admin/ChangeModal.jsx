'use client';

import { editFurniture, getTagsOptions } from '@/libs/serverActions';
import { Input, message, Modal, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import TextArea from 'antd/es/input/TextArea';

export default function ChangeModal({ furniture, isOpen, onClose }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [tagsOptions, setTagsOptions] = useState([]);
    const [newImage, setNewImage] = useState(null);


    useEffect(() => {
        if (furniture) {
            setName(furniture.name || '');
            setPrice(furniture.price || '');
            setCategory(furniture.category || '');
            setDescription(furniture.discription || '');
            setTags(furniture.tags?.map(tag => ({ value: tag.id, label: tag.name })) || []);
        }
    }, [furniture]);

    useEffect(() => {
        async function loadOptions() {
            try {
                const tagsData = await getTagsOptions();
                setTagsOptions(tagsData.map(tag => ({ value: tag.id, label: tag.name })));
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        }
        loadOptions();
    }, []);

    const handleImageChange = ({ fileList }) => {
        setNewImage(fileList[0]?.originFileObj || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageName = furniture.image; // по умолчанию старое изображение

        if (newImage) {
            const formData = new FormData();
            formData.append('file', newImage);
            formData.append('furnitureId', furniture.id); // <--- ОБЯЗАТЕЛЬНО

            const res = await fetch('/api/images/upload-furniture', {
                method: 'POST',
                body: formData
            });

            const result = await res.json();

            if (result.success) {
                imageName = result.imageUrl; // если сервер возвращает полный URL
            } else {
                message.error('Ошибка загрузки изображения');
                return;
            }
        }

        const newForm = {
            name,
            price,
            category,
            discription: description,
            image: imageName,
            tags: tags.map(({ value, label }) => ({ value, label })),
            id: furniture.id,
        };

        const resp = await editFurniture(newForm);
        if (resp.success) {
            message.success('Товар изменен');
            onClose();
            location.reload();
        } else {
            message.error('Ошибка при сохранении');
        }
    };

    return (
        <Modal title="Редактирование товара" open={isOpen} onCancel={onClose} footer={null}>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                {furniture?.image && (
                    <div className="flex justify-center mb-4">
                        <Image
                            width={160}
                            height={160}
                            src={furniture.image}
                            alt={furniture.name}
                            className="rounded object-cover"
                        />
                    </div>
                )}

                <Input name='title' placeholder="Название товара" value={name} onChange={(e) => setName(e.target.value)} />
                <Input name='price' placeholder="Цена товара" value={price} onChange={(e) => setPrice(e.target.value)} />
                <Input name='category' placeholder="Категория" value={category} onChange={(e) => setCategory(e.target.value)} />


                <TextArea
                    name='description'
                    placeholder="Описание товара"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                />

                <Select
                    name='tags'
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Теги"
                    value={tags}
                    onChange={(value, selectedObj) => setTags(selectedObj)}
                    options={tagsOptions}
                />

                <Upload
                    listType="picture"
                    beforeUpload={() => false}
                    onChange={handleImageChange}
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Загрузить новое изображение</Button>
                </Upload>

                <button className="w-[300px] border border-black p-1 hover:bg-slate-300 mx-auto" type="submit">
                    Изменить
                </button>
            </form>
        </Modal>
    );
}