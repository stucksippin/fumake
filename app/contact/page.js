import { Breadcrumb, Descriptions } from "antd"
import Link from "next/link"
import banner from '@/public/image/catalogBanner.png'
import Image from "next/image"

// icons
import award from "@/public/image/icons/award.png"
import clock from "@/public/image/icons/clock.png"
import delivery from "@/public/image/icons/delivery.png"
import maptag from "@/public/image/icons/maptag.png"
import phone from "@/public/image/icons/phone.png"
import warrently from "@/public/image/icons/warrently.png"
import support from "@/public/image/icons/support.png"
import Title from "antd/es/skeleton/Title"
import CallbackForm from "@/components/UI/CallbackForm"

export default function ContactPage() {
    const breadcrumbItems = [
        {
            title: <Link href={"/"}>Главная</Link>,
        },
        {
            title: 'Контакты'
        },
    ]
    const dataForBanner = [
        {
            image: award,
            title: "Высшее качество",
            description: "Сделано из лучших материалов"
        },
        {
            image: warrently,
            title: "Гарантия",
            description: "Более 2 лет"
        },
        {
            image: delivery,
            title: "Бесплатная доставка",
            description: "Для заказов от 10.000 руб"
        },
        {
            image: support,
            title: "24 / 7 Поддержка",
            description: "Обученный персонал"
        },
    ]
    return (
        <div>
            <div className='container'>
                <div className='container relative h-full w-full object-cover object-left'>
                    <Breadcrumb className='breadcrumb mb-5 text-[18px] absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2  z-10' items={breadcrumbItems}
                    />
                    <Image className='opacity-50 mx-auto' width={1536} height={316} src={banner} alt='banner' />
                    <span className='breadcrumb_title breadcrumb_title_catalog absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 title'>Контакты</span>
                </div>
                <section className="section">
                    <div className="flex flex-col text-center mb-[5%]">
                        <span className="title">Свяжитесь с нами </span>
                        <span className="contact_subtitle font-thin mt-2">Для получения дополнительной информации о наших продуктах и услугах. Пожалуйста, не стесняйтесь, <br /> пишите нам по электронной почте. Наши сотрудники всегда готовы помочь вам. Не стесняйтесь!</span>
                    </div>

                    <div className="contact_block flex justify-around">

                        <div className="contact_block-info flex flex-col">
                            <div className="flex mb-5">
                                <div className="flex">
                                    <div className="flex flex-col justify-center mr-5">
                                        <Image className="items-center" src={maptag} width={30} alt="map tag" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="contact_infoblock_title">Адрес</span>
                                        <span className="contact_infoblock_text">Ростов-на-Дону, ул. Мечникова 79</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mb-5">
                                <div className="flex">
                                    <div className="flex flex-col justify-center mr-5">
                                        <Image className="items-center" src={phone} width={30} alt="map tag" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="contact_infoblock_title">Номер</span>
                                        <span className="contact_infoblock_text">Горячая линия: +7(988)569-86-37</span>
                                        <span className="contact_infoblock_text">Мобильный телефон: +7(988)569-86-38</span>
                                    </div>
                                </div>

                            </div>
                            <div className="flex">
                                <div className="flex">
                                    <div className="flex flex-col justify-center mr-5">
                                        <Image className="items-center" src={clock} width={30} alt="map tag" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="contact_infoblock_title">Рабочее время</span>
                                        <span className="contact_infoblock_text">Понедельник - Пятница: 9:00 - 18:00</span>
                                        <span className="contact_infoblock_text">Суббота - Воскресенье: 9:00 - 18:00</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <CallbackForm />
                    </div>


                </section>
            </div>
            <div className="contact_banner p-[5%] flex justify-between bg-[#FAF3EA]">
                {
                    dataForBanner.map((item) => (
                        <ul className="contact_banner-item  border-black flex" key={item.title}>
                            <li className="contact_banner-image flex flex-col justify-center mr-3">
                                <Image className="" src={item.image} width={50} alt="banner icon award, warrantly, shipping, support" />
                            </li>
                            <li className="flex flex-col">
                                <span className="contact_banner-title font-semibold text-[25px]">{item.title}</span>
                                <span className="contact_banner-text text-[20px]">{item.description}</span>
                            </li>
                        </ul>
                    ))
                }
            </div>
        </div>

    )
}
