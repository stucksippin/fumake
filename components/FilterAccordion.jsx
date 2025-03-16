"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import filter from "../public/image/filtering.png";
import { InputNumber, Select } from "antd";

import { useRouter } from "next/navigation";

export default function FilterAccordion() {
    const optionsCategory = [
        { value: 'all', label: "Все категории" },
        { value: 'table', label: "Столы" },
        { value: "sofa", label: "Диваны" },
        { value: "lamp", label: "Лампы" },
        { value: "chair", label: "Стулья" },
        { value: "cabinet", label: "Шкафы" },
        { value: "bed", label: "Кровати" },
    ];
    const optionsColor = [
        { value: 'all', label: "Все цвета" },
        { value: "grey", label: "Серый" },
        { value: "dark-brown", label: "Темно-коричневый" },
        { value: "beige", label: "Бежевый" },
        { value: "black", label: "Черный" },
        { value: "white", label: "Белый" },
        { value: "brown", label: "Коричневый" },
        { value: "blue", label: "Синий" },
        { value: "dark-blue", label: "Темно-синий" },
        { value: "green", label: "Зеленый" },
        { value: "walnut", label: "Орех" },
        { value: "yellow", label: "Желтый" },
        { value: "light-grey", label: "Светло-серый" },
        { value: "pink", label: "Розовый" },
        { value: "oak", label: "Дуб" },
    ];
    const [category, setCategory] = useState(optionsCategory[0])
    const [color, setColor] = useState(optionsColor[0])
    const [priceMin, setPriceMin] = useState(1000)
    const [priceMax, setPriceMax] = useState(100000)
    const router = useRouter()
    const params = new URLSearchParams()
    function applyFilters() {

        category !== "all" ? params.set("category", category) : params.delete("category")
        color.value !== 'all' ? params.set("color", color) : params.delete("color")
        if (priceMin) params.set("priceMin", String(priceMin))
        if (priceMax) params.set("priceMax", String(priceMax))
        console.log('category: ', category);
        console.log('color: ', color.value);
        router.push(`?${params.toString()}`, { scroll: false });
        console.log(params);
    }

    function resetFilters() {
        setCategory(optionsCategory[0])
        setColor(optionsColor[0])
        setPriceMin(1000)
        setPriceMax(100000)
        router.push("/catalog")
    }
    return (
        <div className="flex ">

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
                        onChange={(value) => setPriceMin(value)}
                        step={500}
                    />
                    <span className="mr-2 ml-2">до</span>
                    <InputNumber
                        min={1000}
                        max={100000}
                        value={priceMax}
                        onChange={(value) => setPriceMax(value)}
                        step={500}
                    />
                </div>
                <button className="border border-gray-300 py-[3px] px-4 text-[14px] bg-white rounded-md" onClick={applyFilters}>Применить</button>
                <button className="border border-gray-300 py-[3px] px-4 text-[14px] bg-white rounded-md" onClick={resetFilters}>Сбросить</button>
            </div>
        </div>
    );
}
