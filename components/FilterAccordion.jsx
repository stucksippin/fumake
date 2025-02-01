"use client";
import { useEffect } from "react";
import Image from "next/image";
import filter from "../public/image/filtering.png";
import { InputNumber, Select } from "antd";
import useFilterStore from "@/app/store/useFilterStore";

export default function FilterAccordion() {
    const {
        category, color, priceMin, priceMax,
        setCategory, setColor, setPriceRange, resetFilters, fetchPriceRange
    } = useFilterStore();

    useEffect(() => {
        fetchPriceRange()
    }, [])

    const optionsCategory = [
        { value: null, label: "Все категории" },
        { value: "table", label: "Столы" },
        { value: "sofa", label: "Диваны" },
        { value: "lamp", label: "Лампы" },
        { value: "chair", label: "Стулья" },
        { value: "cabinet", label: "Шкафы" },
        { value: "bed", label: "Кровати" },
    ];
    const optionsColor = [
        { value: null, label: "Все цвета" },
        { value: "Серый", label: "Серый" },
        { value: "Темно-коричневый", label: "Темно-коричневый" },
        { value: "Бежевый", label: "Бежевый" },
        { value: "Черный", label: "Черный" },
        { value: "Белый", label: "Белый" },
        { value: "Коричневый", label: "Коричневый" },
        { value: "Синий", label: "Синий" },
        { value: "Темно-синий", label: "Темно-синий" },
        { value: "Зеленый", label: "Зеленый" },
        { value: "Орех", label: "Орех" },
        { value: "Желтый", label: "Желтый" },
        { value: "Светло-серый", label: "Светло-серый" },
        { value: "Розовый", label: "Розовый" },
        { value: "Дуб", label: "Дуб" },
    ];

    return (
        <div className="flex">
            <div className="flex items-center">
                <div>
                    <Image src={filter} width={19} alt="filter ico" />
                </div>
                <span className="text-[18px] ml-1">Фильтр</span>
            </div>
            <div className="flex gap-x-5 ml-10">
                <Select
                    className="w-[180px] text-center"
                    placeholder="Категории"
                    options={optionsCategory}
                    value={category}
                    onChange={(value) => setCategory(value)}
                />
                <Select
                    className="w-[180px] text-center"
                    placeholder="Цвет"
                    options={optionsColor}
                    value={color}
                    onChange={(value) => setColor(value)}
                />
                <div className="flex items-center">
                    <span className="mr-2">от</span>
                    <InputNumber
                        min={1000}
                        max={100000}
                        value={priceMin}
                        onChange={(value) => setPriceRange(value, priceMax)}
                        step={500}
                    />
                    <span className="mr-2 ml-2">до</span>
                    <InputNumber
                        min={1000}
                        max={100000}
                        value={priceMax}
                        onChange={(value) => setPriceRange(priceMin, value)}
                        step={500}
                    />
                </div>
                <button className="border border-gray-300 py-[3px] px-4 text-[14px] bg-white rounded-md" onClick={resetFilters}>Сбросить</button>
            </div>
        </div>
    );
}
