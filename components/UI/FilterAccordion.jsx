"use client";
import { useState } from "react";
import { InputNumber, Select, Drawer } from "antd";
import { useRouter } from "next/navigation";
import { optionsCategory, optionsColor, optionsPrice } from '@/utils/constants';

export default function FilterAccordion() {
    const [category, setCategory] = useState('all');
    const [color, setColor] = useState('all');
    const [priceSort, setPriceSort] = useState('all');
    const [priceMin, setPriceMin] = useState(1000);
    const [priceMax, setPriceMax] = useState(100000);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const router = useRouter();

    function applyFilters() {
        const params = new URLSearchParams();
        category !== 'all' && params.set("category", category);
        color !== 'all' && params.set("color", color);
        priceSort !== 'all' && params.set("priceSort", priceSort);
        if (priceMin) params.set("priceMin", String(priceMin));
        if (priceMax) params.set("priceMax", String(priceMax));
        router.push(`?${params.toString()}`, { scroll: false });
        setMobileDrawerOpen(false);
    }

    function resetFilters() {
        setCategory('all');
        setColor('all');
        setPriceMin(1000);
        setPriceMax(100000);
        setPriceSort('all');
        router.push("/catalog");
        setMobileDrawerOpen(false);
    }

    // Подсчет активных фильтров
    const activeFiltersCount = [
        category !== 'all',
        color !== 'all',
        priceSort !== 'all',
        priceMin !== 1000,
        priceMax !== 100000
    ].filter(Boolean).length;

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Категория */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Категория</label>
                <Select
                    className="w-full"
                    size="large"
                    options={optionsCategory}
                    value={category}
                    onChange={setCategory}
                    style={{ borderRadius: '12px' }}
                />
            </div>

            {/* Цвет */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Цвет</label>
                <Select
                    className="w-full"
                    size="large"
                    options={optionsColor}
                    value={color}
                    onChange={setColor}
                    style={{ borderRadius: '12px' }}
                />
            </div>

            {/* Сортировка по цене */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Сортировка</label>
                <Select
                    className="w-full"
                    size="large"
                    options={optionsPrice}
                    value={priceSort}
                    onChange={setPriceSort}
                    style={{ borderRadius: '12px' }}
                />
            </div>

            {/* Диапазон цен */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Диапазон цен</label>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <span className="text-xs text-gray-500">От</span>
                        <InputNumber
                            min={1000}
                            max={100000}
                            value={priceMin}
                            onChange={setPriceMin}
                            step={500}
                            className="w-full"
                            size="large"
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                            parser={value => value.replace(/\./g, '')}
                            style={{ borderRadius: '12px' }}
                        />
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs text-gray-500">До</span>
                        <InputNumber
                            min={1000}
                            max={100000}
                            value={priceMax}
                            onChange={setPriceMax}
                            step={500}
                            className="w-full"
                            size="large"
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                            parser={value => value.replace(/\./g, '')}
                            style={{ borderRadius: '12px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                    onClick={applyFilters}
                    className="flex-1 bg-[#BAA898] text-white font-medium py-3 px-6 rounded-xl hover:bg-[#a89886] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                    Применить фильтры
                </button>
                <button
                    onClick={resetFilters}
                    className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 hover:shadow-md active:scale-95"
                >
                    Сбросить
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-sm lg:w-auto">
            <button
                onClick={() => setMobileDrawerOpen(true)}
                className="w-full bg-white border-2 border-gray-200 rounded-xl px-6 py-3 flex items-center justify-between gap-4 hover:border-[#BAA898] hover:bg-stone-50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
                <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    <span className="font-medium text-gray-700 text-sm sm:text-base">Фильтры</span>
                </div>
                <div className="flex items-center gap-3">
                    {activeFiltersCount > 0 && (
                        <span className="bg-[#BAA898] text-white text-xs px-2.5 py-1 rounded-full font-medium">
                            {activeFiltersCount}
                        </span>
                    )}
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            <Drawer
                title={
                    <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[#BAA898]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                        </svg>
                        <span className="font-semibold text-lg">Фильтры товаров</span>
                        {activeFiltersCount > 0 && (
                            <span className="bg-stone-100 text-[#BAA898] text-sm px-2 py-0.5 rounded-full font-medium">
                                {activeFiltersCount} активных
                            </span>
                        )}
                    </div>
                }
                placement="right"
                width={typeof window !== 'undefined' && window.innerWidth < 768 ? '90%' : 480}
                onClose={() => setMobileDrawerOpen(false)}
                open={mobileDrawerOpen}
                styles={{
                    body: { padding: '24px' },
                    header: { borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }
                }}
            >
                <FilterContent />
            </Drawer>
        </div>
    );
}