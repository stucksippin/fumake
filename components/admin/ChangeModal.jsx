import { editFurniture, getTagsOptions, getColorsOptions, getSizesOptions } from '@/libs/serverActions';
import { Input, Modal, Select } from 'antd';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ChangeModal({ furniture, isOpen, onClose }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    const [tagsOptions, setTagsOptions] = useState([]);
    const [colorsOptions, setColorsOptions] = useState([]);
    const [sizesOptions, setSizesOptions] = useState([]);

    //хук для загрузки записи в модалку
    useEffect(() => {
        if (furniture) {
            setName(furniture.name || '');
            setPrice(furniture.price || '');
            setCategory(furniture.category || '');
            setTags(furniture.tags?.map(tag => ({ value: tag.id, label: tag.name })) || []);

            // Выводим только уникальные записи
            setColors([...new Map(furniture.variations.map(item =>
                [item.color.id, { value: item.color.id, label: item.color.name }])).values()
            ]);
            setSizes([...new Map(furniture.variations.map(item =>
                [item['size'], item.size])).values()
            ]);
        }
    }, [furniture]);

    //хук для подгрузки options
    useEffect(() => {
        async function loadOptions() {
            try {
                const tagsData = await getTagsOptions();
                const colorsData = await getColorsOptions();
                const sizesData = await getSizesOptions();


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

        const formData = Object.fromEntries(new FormData(e.target));
        const newForm = {
            ...formData,
            tags: tags.map(({ value, label }) => ({ value, label })),
            colors: colors.map(({ value, label }) => ({ value, label })),
            sizes: sizes,
            id: furniture.id
        }

        const resp = await editFurniture(newForm)


    };

    return (
        <Modal title="Редактирование товара" open={isOpen} onCancel={onClose} footer={null}>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                {furniture?.image && (
                    <div className="flex justify-center mb-4">
                        <Image
                            width={160}
                            height={160}
                            src={`/image/furniture/${furniture.category}/${furniture.image}.webp`}
                            alt={furniture.name}
                            className="rounded object-cover"
                        />
                    </div>
                )}

                <Input name='title' placeholder="Название товара" value={name} onChange={(e) => setName(e.target.value)} />
                <Input name='price' placeholder="Цена товара" value={price} onChange={(e) => setPrice(e.target.value)} />
                <Input name='category' placeholder="Категория" value={category} onChange={(e) => setCategory(e.target.value)} />

                <Select
                    name='tags'
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Теги"
                    value={tags}
                    onChange={(value, selectedObj) => setTags(selectedObj)}
                    options={tagsOptions}
                />
                <Select
                    name="sizes"
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Размер"
                    value={sizes}
                    onChange={(value) => setSizes(value)}
                    options={sizesOptions}
                />

                <button className="w-[300px] border border-black p-1 hover:bg-slate-300 mx-auto" type="submit">Изменить</button>
            </form>
        </Modal>
    );
}
