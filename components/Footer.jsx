import React from 'react'

export default function Footer() {
    return (
        <div className='footer py-10'>
            <hr />
            <div className='container flex justify-between text-[18px] py-5 gap'>
                <div className='flex flex-col'>
                    <span className='footer_title font-semibold text-[24px]'>FUCRAFT</span>
                    <span>Do excepteur tempor veniam ipsum.</span>
                </div>
                <ul className='flex flex-col gap-y-5'>
                    <span className='text-[#818181]'>Ссылки</span>
                    <li>Главная</li>
                    <li>Каталог</li>
                    <li>О нас</li>
                    <li>Контакты</li>
                </ul>
                <ul className='flex flex-col gap-y-5'>
                    <span className='text-[#818181]'>Помощь</span>
                    <li>Варианты оплаты</li>
                    <li>Возврат</li>
                    <li>Условия конфеденциальности</li>
                </ul>
            </div>
            <hr />
            <span className='container flex mx-auto'>2024 fucraft. All rights reverved</span>
        </div>
    )
}
