'use client';
import { Input, Select, message } from 'antd';
import { useState, useEffect } from 'react';
import { uploadImage } from '@/utils/upload';
import { getTagsOptions, getColorsOptions, getSizesOptions, createFurniture } from '@/libs/serverActions';

export default function CreateForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [file, setFile] = useState(null);
    const [discription, setDiscription] = useState('');

    const [tagsOptions, setTagsOptions] = useState([]);
    const [colorsOptions, setColorsOptions] = useState([]);
    const [sizesOptions, setSizesOptions] = useState([]);

    useEffect(() => {
        async function loadOptions() {
            try {
                const [tagsData, colorsData, sizesData] = await Promise.all([
                    getTagsOptions(),
                    getColorsOptions(),
                    getSizesOptions()
                ]);
                setTagsOptions(tagsData.map(tag => ({ value: tag.id, label: tag.name })));
                setColorsOptions(colorsData.map(color => ({ value: color.id, label: color.name })));
                setSizesOptions(sizesData.map(size => ({ value: size.size, label: size.size })));
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        }
        loadOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageName = '';
        if (file && category) {
            const uploadResp = await uploadImage(file, category);
            if (uploadResp.success) {
                imageName = uploadResp.filename;
            } else {
                message.error('Ошибка при загрузке изображения');
                return;
            }
        }

        const formData = {
            name,
            price,
            category,
            tags,
            colors,
            sizes,
            image: imageName,
            discription,
        };


        const resp = await createFurniture(formData);
        if (resp.success) {
            message.success('Товар создан');
        } else {
            message.error('Ошибка при создании товара');
        }
    };

    return (
        <form className="flex flex-col gap-y-5 w-[600px] bg-white p-10 mx-auto " onSubmit={handleSubmit}>
            <span className='text-center text-2xl'>Форма создания товара</span>
            <Input placeholder="Название товара" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Цена товара" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input placeholder="Категория" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Input.TextArea
                placeholder="Описание товара"
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
                autoSize={{ minRows: 3, maxRows: 6 }}
            />

            <Select
                mode="multiple"
                placeholder="Теги"
                value={tags}
                onChange={(value, option) => setTags(option)}
                options={tagsOptions}
                style={{ width: '100%' }}
            />
            <Select
                mode="multiple"
                placeholder="Цвет"
                value={colors}
                onChange={(value, option) => setColors(option)}
                options={colorsOptions}
                style={{ width: '100%' }}
            />
            <Select
                mode="tags"
                placeholder="Размер"
                value={sizes}
                onChange={(value) => setSizes(value)}
                options={sizesOptions}
                style={{ width: '100%' }}
            />

            <label>Главное фото товара</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />


            {/* <Upload
                listType="picture"
                beforeUpload={() => false} // предотвращаем авто-загрузку
                // onChange={handleFileChange}
                multiple
            >
                <Button icon={<UploadOutlined />}>Главное фото товара</Button>
            </Upload>
           */}

            <button className="w-[300px] border border-black p-1 hover:bg-slate-300 mx-auto" type="submit">
                Создать
            </button>
        </form>
    );
}
