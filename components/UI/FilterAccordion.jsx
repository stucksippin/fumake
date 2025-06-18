"use client";
import { useState } from "react";
import { InputNumber, Select } from "antd";
import { useRouter } from "next/navigation";
import { optionsCategory, optionsColor, optionsPrice } from '@/utils/constants';

export default function FilterAccordion() {
    const [category, setCategory] = useState('all');
    const [color, setColor] = useState('all');
    const [priceSort, setPriceSort] = useState('all');
    const [priceMin, setPriceMin] = useState(1000);
    const [priceMax, setPriceMax] = useState(100000);
    const router = useRouter();

    function applyFilters() {
        const params = new URLSearchParams();
        category !== 'all' && params.set("category", category);
        color !== 'all' && params.set("color", color);
        priceSort !== 'all' && params.set("priceSort", priceSort);
        if (priceMin) params.set("priceMin", String(priceMin));
        if (priceMax) params.set("priceMax", String(priceMax));
        router.push(`?${params.toString()}`, { scroll: false });
    }

    function resetFilters() {
        setCategory('all');
        setColor('all');
        setPriceMin(1000);
        setPriceMax(100000);
        setPriceSort('all');
        router.push("/catalog");
    }

    return (
        <div className="w-full px-4">
            <div className="flex flex-wrap gap-4 items-center">
                <Select
                    className="min-w-[150px] max-w-[150px]"
                    options={optionsCategory}
                    value={category}
                    onChange={setCategory}
                />
                <Select
                    className="min-w-[150px] max-w-[150px]"
                    options={optionsColor}
                    value={color}
                    onChange={setColor}
                />
                <Select
                    className="min-w-[150px] max-w-[150px]"
                    options={optionsPrice}
                    value={priceSort}
                    onChange={setPriceSort}
                />
                <div className="flex items-center gap-2">
                    <span>от</span>
                    <InputNumber
                        min={1000}
                        max={100000}
                        value={priceMin}
                        onChange={setPriceMin}
                        step={500}
                        className="w-[100px]"
                    />
                    <span>до</span>
                    <InputNumber
                        min={1000}
                        max={100000}
                        value={priceMax}
                        onChange={setPriceMax}
                        step={500}
                        className="w-[100px]"
                    />
                </div>
                <button
                    onClick={applyFilters}
                    className="bg-white border border-gray-300 text-sm rounded-md h-[35px]  px-4 hover:bg-gray-50 transition"
                >
                    Применить
                </button>
                <button
                    onClick={resetFilters}
                    className="bg-white border border-gray-300 text-sm rounded-md h-[35px] px-4 hover:bg-gray-50 transition"
                >
                    Сбросить
                </button>
            </div>
        </div>
    );
}
