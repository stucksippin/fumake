import { editFurniture } from '@/serverActions';
import { Input, Modal, Tag } from 'antd';
import { useState, useEffect, useRef } from 'react';

export default function ChangeModal({ furniture, isOpen, onClose }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    useEffect(() => {
        if (furniture) {
            setName(furniture.name || '');
            setPrice(furniture.price || '');
            setCategory(furniture.category || '');
            setTags(furniture.tags?.map(tag => tag.name) || []);
            setColors(furniture.variations?.map(variation => variation.color.name) || []);
            setSizes(furniture.variations?.map(variation => variation.size) || []);
        }
    }, [furniture]);

    const handleOk = () => {
        console.log('Сохранение', { name, price });
        onClose();
    };



    return (
        <Modal
            title="Редактирование товара"
            open={isOpen}
            onOk={handleOk}
            onCancel={onClose}
        >
            <form className='flex flex-col gap-y-5' action={editFurniture}>
                <Input
                    placeholder='Название товара'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    placeholder='Цена товара'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    placeholder='Категория'
                    value={category}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    placeholder='Тэги'
                    value={tags.join(' | ')}
                    onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
                />
                <Input
                    placeholder='Цвета'
                    value={colors.join(' | ')}
                    onChange={(e) => setTags(e.target.value.split(',').map(color => color.trim()))}
                />
                <Input
                    placeholder='Размеры'
                    value={sizes.join(' | ')}
                    onChange={(e) => setTags(e.target.value.split(',').map(color => color.trim()))}
                />

                <button className='button' type='submit'>Изменить</button>

            </form>
        </Modal>
    );
}
