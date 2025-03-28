import { Button, Input, Modal, Tag } from 'antd';
import { useState, useEffect, useRef } from 'react';

export default function CreateForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);



    return (

        <form className='flex flex-col gap-y-5 w-[500px] bg-white p-10 rounded-lg'>
            <span className='text-center text-[24px]'>Добавление товара</span>
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
                value={tags.join(', ')}
                onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
            />
            <Input
                placeholder='Цвета'
                value={colors.join(', ')}
                onChange={(e) => setTags(e.target.value.split(',').map(color => color.trim()))}
            />
            <Input
                placeholder='Размеры'
                value={sizes.join(', ')}
                onChange={(e) => setTags(e.target.value.split(',').map(color => color.trim()))}
            />
            <Button>Создать</Button>
        </form>
    );
}
