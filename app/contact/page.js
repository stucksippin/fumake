import { Breadcrumb } from "antd"
import Link from "next/link"
import banner from '@/public/image/catalogBanner.png'
import Image from "next/image"

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

        </div>
    )
}
