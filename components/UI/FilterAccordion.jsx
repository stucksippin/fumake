"use client";
import { useState } from "react";
import { InputNumber, Select } from "antd";
import { useRouter } from "next/navigation";
import {optionsCategory,optionsColor,optionsPrice} from '@/utils/constants'
export default function FilterAccordion() {
    const [category, setCategory] = useState('all')
    const [color, setColor] = useState('all')
    const [priceSort, setPriceSort] = useState('all')
    const [priceMin, setPriceMin] = useState(1000)
    const [priceMax, setPriceMax] = useState(100000)
    const router = useRouter()

    function applyFilters() {
        const params = new URLSearchParams()
        category !== 'all' ? params.set("category", category) : params.delete("category")
        color !== 'all' ? params.set("color", color) : params.delete("color")
        priceSort !== 'all' ? params.set("priceSort", priceSort) : params.delete("priceSort")
        if (priceMin) params.set("priceMin", String(priceMin))
        if (priceMax) params.set("priceMax", String(priceMax))
        console.log('category: ', category);
        console.log('color: ', color);
        router.push(`?${params.toString()}`, { scroll: false });
        console.log(params);
    }

    function resetFilters() {
        setCategory('all')
        setColor('all')
        setPriceMin(1000)
        setPriceMax(100000)
        setPriceSort('all')
        router.push("/catalog")
    }
    return (
        <div className="flex">
            <div className="flex flex-wrap gap-x-5 gap-y-5 ml-5">
                <Select
                    className="w-[150px] text-center"
                    options={optionsCategory}
                    value={category}
                    onChange={(value) => setCategory(value)}
                />
                <Select
                    className="w-[150px] text-center"
                    options={optionsColor}
                    value={color}
                    onChange={(value) => setColor(value)}
                />
                 <Select
                    className="w-[150px] text-center"
                    options={optionsPrice}
                    value={priceSort}
                    onChange={(value) => setPriceSort(value)}
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
