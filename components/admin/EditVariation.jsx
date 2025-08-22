'use client';
import { Modal, Select, Upload, Button, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getColorsOptions, getSizesOptions } from '@/libs/serverActions';

export default function EditVariationModal({ isOpen, onClose, variation }) {
    const [sizeId, setSizeId] = useState(null);
    const [colorId, setColorId] = useState(null);
    const [removedImageIds, setRemovedImageIds] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    const [colorsOptions, setColorsOptions] = useState([]);
    const [sizesOptions, setSizesOptions] = useState([]);

    useEffect(() => {
        if (variation) {
            setSizeId(variation.size?.id);
            setColorId(variation.color.id);
            setExistingImages(variation.images || []);
            setRemovedImageIds([]);
            setNewImages([]);
        }
    }, [variation]);

    useEffect(() => {
        async function loadOptions() {
            try {
                const colorsData = await getColorsOptions();
                const sizesData = await getSizesOptions();

                setColorsOptions(colorsData.map(color => ({
                    value: color.id,
                    label: color.name
                })));
                setSizesOptions(sizesData.map(size => ({
                    value: size.id,
                    label: size.size
                })));
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        }
        loadOptions();
    }, []);

    const handleRemoveExistingImage = (id) => {
        setRemovedImageIds(prev => [...prev, id]);
        setExistingImages(prev => prev.filter(img => img.id !== id));
    };

    const handleNewImageChange = ({ fileList }) => {
        setNewImages(fileList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sizeId || !colorId) {
            message.error('Заполните все поля');
            return;
        }

        // Загружаем новые изображения
        let uploadedImageNames = [];

        if (newImages.length > 0) {
            const formData = new FormData();
            newImages.forEach(file => {
                if (file.originFileObj) {
                    formData.append('file', file.originFileObj);
                }
            });

            formData.append('variationId', variation.id);

            const res = await fetch('/api/images/upload-variation', {
                method: 'POST',
                body: formData
            });

            const result = await res.json();

            if (!result.success) {
                message.error('Ошибка загрузки изображений');
                return;
            }

            uploadedImageNames = result.images.map(img => img.name);
        }


        const res = await fetch('/api/variations/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: variation.id,
                sizeId,
                colorId,
                deletedImages: removedImageIds,
                newImages: uploadedImageNames,
            }),

        });

        const result = await res.json();

        if (result.success) {
            message.success('Вариация обновлена');
            onClose();
            location.reload();
        } else {
            message.error('Ошибка при обновлении вариации');
        }
    };

    return (
        <Modal title="Редактирование вариации" open={isOpen} onCancel={onClose} footer={null}>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                <Select
                    placeholder="Выберите размер"
                    value={sizeId}
                    onChange={(value) => setSizeId(value)}
                    options={sizesOptions}
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                />

                <Select
                    placeholder="Выберите цвет"
                    value={colorId}
                    onChange={(value) => setColorId(value)}
                    options={colorsOptions}
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                />


                {/* Существующие изображения */}
                {existingImages.length > 0 && (
                    <div>
                        <p className="font-semibold mb-1">Текущие изображения:</p>
                        <div className="flex flex-wrap gap-3">
                            {existingImages.map(img => (
                                <div key={img.id} className="relative w-24 h-24 rounded overflow-hidden">
                                    <Image
                                        src={`https://s3.mir-komfortarnd.ru/furniture/${img.name}.webp`}
                                        alt="variation"
                                        fill
                                        className="object-cover"
                                    />
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleRemoveExistingImage(img.id)}
                                        size="small"
                                        danger
                                        className="absolute top-1 right-1 p-1"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Upload
                    listType="picture"
                    beforeUpload={() => false}
                    onChange={handleNewImageChange}
                    multiple
                >
                    <Button icon={<UploadOutlined />}>Загрузить новые изображения</Button>
                </Upload>

                <Button type="primary" htmlType="submit">Сохранить изменения</Button>
            </form>
        </Modal>
    );
}