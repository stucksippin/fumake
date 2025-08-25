'use client';
import { Button, Input, Select, Upload, message } from 'antd';
import { useState, useEffect } from 'react';
import { getTagsOptions } from '@/libs/serverActions';
import { UploadOutlined } from '@ant-design/icons';

export default function CreateForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [file, setFile] = useState(null);
    const [discription, setDiscription] = useState('');
    const [tagsOptions, setTagsOptions] = useState([]);

    useEffect(() => {
        async function loadOptions() {
            try {
                const [tagsData] = await Promise.all([
                    getTagsOptions(),
                ]);
                setTagsOptions(tagsData.map(tag => ({ value: tag.id, label: tag.name })));
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        }
        loadOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) formData.append('file', file);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('discription', discription);
        formData.append('tags', JSON.stringify(tags));

        const res = await fetch('/api/furniture/create', {
            method: 'POST',
            body: formData,
        });

        const result = await res.json();

        if (result.success) {
            message.success('Товар создан');
        } else {
            message.error(result.error || 'Ошибка при создании товара');
        }
    };


    return (
        <form className="flex flex-col  gap-y-5 w-[600px] bg-white p-10 mx-auto rounded-md" onSubmit={handleSubmit}>
            <span className='text-center text-2xl'>Форма создания товара</span>
            <Input placeholder="Название товара" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Цена товара" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input placeholder="Категория" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Select
                mode="multiple"
                placeholder="Теги"
                value={tags}
                onChange={(value, option) => setTags(option)}
                options={tagsOptions}
                style={{ width: '100%' }}
            />
            <Input.TextArea
                placeholder="Описание товара"
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
                autoSize={{ minRows: 3, maxRows: 6 }}
            />


            <Upload
                accept="image/*"
                beforeUpload={(file) => {
                    setFile(file);
                    return false;
                }}
                maxCount={1}
                showUploadList={{ showRemoveIcon: true }}
            >
                <Button icon={<UploadOutlined />}>Главное фото товара</Button>
            </Upload>


            <button className="w-[300px] border rounded-md border-black p-1 hover:bg-slate-300 mx-auto" type="submit">
                Создать
            </button>
        </form>
    );
}
