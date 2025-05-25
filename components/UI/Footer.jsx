import React from 'react'

export default function Footer() {
    return (
        <div className='footer py-10'>
            <hr />
            <div className='footer_infoblock container flex justify-between text-[14px] py-5 gap'>
                <div className='flex flex-col'>
                    <span className='footer_title font-semibold text-[28px]'>FUMAKE.</span>
                    <span></span>
                </div>
                <ul className='footer-col flex flex-col gap-y-6 font-semibold'>
                    <li className='text-[#818181]'>Ссылки</li>
                    <li>Главная</li>
                    <li>Каталог</li>
                    <li>О нас</li>
                    <li>Контакты</li>
                </ul>
                <ul className='footer-col flex flex-col gap-y-8 font-semibold'>
                    <li className='text-[#818181]'>Помощь</li>
                    <li>Варианты оплаты</li>
                    <li>Возврат</li>
                    <li>Условия конфеденциальности</li>
                </ul>
            </div>
            <hr className='mb-5' />
            <span className='container flex mx-auto '>2024 fucraft. All rights reverved</span>
        </div>
    )
}
