"use client";
import { useEffect } from "react";
import Image from "next/image";
import filter from "../public/image/filtering.png";
import { InputNumber, Select } from "antd";
import useFilterStore from "@/app/store/useFilterStore";

export default function FilterAccordion() {
    const {
        category, color, priceMin, priceMax,
        setCategory, setColor, setPriceRange,
        fetchPriceRange
    } = useFilterStore();

    useEffect(() => {
        fetchPriceRange();
    }, []);

    const optionsCategory = [
        { value: "table", label: "Столы" },
        { value: "sofa", label: "Диваны" },
        { value: "lamp", label: "Лампы" },
        { value: "chair", label: "Стулья" },
        { value: "cabinet", label: "Шкафы" },
        { value: "bed", label: "Кровати" },
    ];

    const optionsColor = [
        { value: "gray", label: "Серый" },
        { value: "brown", label: "Коричневый" },
        { value: "beige", label: "Бежевый" },
        { value: "black", label: "Черный" },
        { value: "white", label: "Белый" },
        { value: "blue", label: "Синий" },
        { value: "pink", label: "Розовый" },
        { value: "lightblue", label: "Голубой" },
        { value: "oak", label: "Дуб" },
    ];

    return (
        <div className="flex">
            <button className="flex items-center hover:bg-white">
                <div>
                    <Image src={filter} width={19} alt="filter ico" />
                </div>
                <span className="text-[18px] ml-1">Фильтр</span>
            </button>
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
                <button className="p-1 bg-white border border-gray-300 rounded-md" >
                    Найти
                </button>
            </div>
        </div>
    );
}
