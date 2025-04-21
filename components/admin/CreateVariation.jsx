import { Modal, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { getColorsOptions, getSizesOptions } from '@/libs/serverActions';

export default function CreateVariationModal({ isOpen, onClose, onSubmit, furnitureId }) {
    const [size, setSize] = useState('');
    const [colorId, setColorId] = useState(null);
    const [images, setImages] = useState([]);

    const [colorsOptions, setColorsOptions] = useState([]);
    const [sizesOptions, setSizesOptions] = useState([]);

    const handleFileChange = ({ fileList }) => {
        setImages(fileList);
    };

    //загрузка options
    useEffect(() => {
        async function loadOptions() {
            try {

                const colorsData = await getColorsOptions();
                const sizesData = await getSizesOptions();

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

        if (!size || !colorId || images.length === 0) {
            message.error('Заполните все поля и загрузите хотя бы одно изображение');
            return;
        }

        const formData = new FormData();
        formData.append('size', size);
        formData.append('colorId', colorId);
        formData.append('furnitureId', furnitureId);

        images.forEach(fileWrapper => {
            formData.append('images', fileWrapper.originFileObj);
            console.log(images);
        });

        try {
            const response = await fetch('/api/variations/createVariations', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Ошибка от сервера:', data);
                throw new Error('Ошибка при создании вариации');
            }

            message.success('Вариация создана');
            onSubmit?.();
            setSize('');
            setColorId(null);
            setImages([]);
            onClose();
        } catch (error) {
            console.error(error);
            message.error('Не удалось создать вариацию');
        }

    };



    return (
        <Modal title="Создание вариации" open={isOpen} onCancel={onClose} footer={null}>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                <Select
                    placeholder="Выберите размер"
                    value={size}
                    onChange={(value) => setSize(value)}
                    options={sizesOptions}
                />

                <Select
                    placeholder="Выберите цвет"
                    value={colorId}
                    onChange={(value) => setColorId(value)}
                    options={colorsOptions}
                />

                <Upload
                    listType="picture"
                    beforeUpload={() => false} // предотвращаем авто-загрузку
                    onChange={handleFileChange}
                    multiple
                >
                    <Button icon={<UploadOutlined />}>Фото товара</Button>
                </Upload>
                <Button type="primary" htmlType="submit">Создать вариацию</Button>
            </form>
        </Modal>
    );
}
