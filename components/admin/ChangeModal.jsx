import { editFurniture, getTagsOptions, getColorsOptions, getSizesOptions } from '@/serverActions';
import { Input, Modal, Select } from 'antd';
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
            setColors(furniture.variations?.map(variation => ({ value: variation.color.id, label: variation.color.name })) || []);
            setSizes(furniture.variations?.map(variation => variation.size) || []);
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
                setSizesOptions(sizesData.map(size => ({ value: size.id, label: size.size })));

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
            tags: tags,
            colors: colors,
            sizes: sizes,
            id: furniture.id
        }
        console.log(newForm)
        const resp = await editFurniture(newForm)
        // formData.append('id', furniture.id);
        // formData.append('name', name);
        // formData.append('price', price);
        // formData.append('category', category);
        // formData.append('tags', JSON.stringify(tags));
        // formData.append('colors', JSON.stringify(colors));
        // formData.append('sizes', JSON.stringify(sizes));

        // await editFurniture(formData);
        // onClose();
    };

    return (
        <Modal title="Редактирование товара" open={isOpen} onCancel={onClose} footer={null}>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                <Input name='title' placeholder="Название товара" value={name} onChange={(e) => setName(e.target.value)} />
                <Input name='price' placeholder="Цена товара" value={price} onChange={(e) => setPrice(e.target.value)} />
                <Input name='category' placeholder="Категория" value={category} onChange={(e) => setCategory(e.target.value)} />

                <Select
                    name='tags'
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Теги"
                    value={tags}
                    onChange={setTags}
                    options={tagsOptions}
                />

                <Select
                    name='colors'
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Цвет"
                    value={colors}
                    onChange={setColors}
                    options={colorsOptions}
                />

                <Select
                    name="sizes"
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Размер"
                    value={sizes}
                    onChange={setSizes}
                    options={sizesOptions}
                />

                <button className="w-[300px] border border-black p-1 hover:bg-slate-300 mx-auto" type="submit">Изменить</button>
            </form>
        </Modal>
    );
}
