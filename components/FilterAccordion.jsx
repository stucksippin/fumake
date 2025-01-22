'use client'
import Image from "next/image"
import filter from "../public/image/filtering.png"
import { useState } from "react"
import { InputNumber, Select } from "antd"
export default function FilterAccordion() {
    const [animating, SetAnimating] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const toggleAccordion = () => {
        if (isOpen) {
            SetAnimating(true);
            setTimeout(() => {
                setIsOpen(false);
                SetAnimating(false);
            }, 600);
        } else {
            setIsOpen(true);
        }
    };
    const optionsCategory = [
        { value: '1', label: 'Диваны' },
        { value: '2', label: 'Столы' },
        { value: '3', label: 'Стулья' },
        { value: '4', label: 'Шкафы' },
        { value: '5', label: 'Лампы' },
        { value: '6', label: 'Кровати' },
    ]

    const optionsColor = [
        { value: '1', label: 'Серый' },
        { value: '2', label: 'Коричневый' },
        { value: '3', label: 'Бежевый' },
        { value: '4', label: 'Черный' },
        { value: '5', label: 'Белый' },
        { value: '6', label: 'Синий' },
        { value: '7', label: 'Розовый' },
        { value: '8', label: 'Голубой' },
        { value: '9', label: 'Дуб' },
    ]

    const onChange = (value) => {
        console.log('changed', value);
    };
    return (
        <div className="flex">
            <button onClick={toggleAccordion} className="flex items-center hover:bg-white ">
                <div>
                    <Image src={filter} width={19} alt="filter ico" />
                </div>

                <span className="text-[18px] ml-1">Фильтр</span>
            </button>
            <div className={`flex gap-x-5 ml-10 ${isOpen ? "flex" : "hidden"}`}>

                <Select
                    className={`w-[180px] text-center ${isOpen && !animating ? "animate-slide-in" : "animate-slide-out"}`}
                    placeholder="Категории"
                    options={optionsCategory}
                />

                <Select
                    className={`w-[180px] text-center ${isOpen && !animating ? "animate-slide-in delay-[200ms]" : "animate-slide-out delay-[200ms]"}`}
                    placeholder="Цвет"
                    options={optionsColor}
                />
                <div className={`flex items-center ${isOpen && !animating ? "animate-slide-in delay-[400ms]" : "animate-slide-out delay-[400ms]"}`}>
                    <span className="mr-2">от</span>
                    <InputNumber min={1000} max={100000} defaultValue={1000} onChange={onChange} step={500} />
                    <span className="mr-2 ml-2">до</span>
                    <InputNumber min={1000} max={100000} defaultValue={100000} onChange={onChange} step={500} />
                </div>

            </div>
        </div>

    )
}
