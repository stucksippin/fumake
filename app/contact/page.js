import { Breadcrumb } from "antd"
import Link from "next/link"
import banner from '@/public/image/catalogBanner.png'
import Image from "next/image"
import CallbackForm from "@/components/CallbackForm"

export default function ContactPage() {
    const breadcrumbItems = [
        {
            title: <Link href={"/"}>Главная</Link>,
        },
        {
            title: 'Контакты'
        },
    ]
    return (
        <div className='container'>
            <div className='relative'>
                <Breadcrumb className='mb-5 text-[18px] absolute top-[60%] left-[45.5%] z-10' items={breadcrumbItems}
                />
                <Image className='opacity-50 mx-auto' width={1536} height={316} src={banner} alt='banner' />
                <span className='absolute top-[45%] left-[46%] title'>Контакты</span>
            </div>
            <div className="flex flex-col text-center mt-[5%]">
                <span className="text-3xl font-bold mb-2">Свяжитесь с нами </span>
                <span className="font-thin mt-2">Для Получения Дополнительной Информации О Наших Продуктах И Услугах. Пожалуйста, Не Стесняйтесь, <br /> Пишите Нам По Электронной Почте. Наши Сотрудники Всегда Готовы Помочь Вам. Не Стесняйтесь!</span>
            </div>
            <CallbackForm />
        </div>
    )
}
