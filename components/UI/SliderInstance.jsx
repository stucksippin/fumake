'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import bedroom from "@/public/image/range/bedroom.png"
import dinning from "@/public/image/range/dinning.png"
import living from "@/public/image/range/living.png"
import bathroom from "@/public/image/range/bathroom.png"
import kidsroom from "@/public/image/range/kidsroom.png"
import hall from "@/public/image/range/hall.png"
import Image from "next/image";
import Link from "next/link";


export default function SliderInstance() {

    const sliderData = [
        {
            name: "Кухня",
            image: dinning,
            link: 'http://localhost:3000/catalog?tags=Кухня'
        },
        {
            name: "Гостиная",
            image: living,
            link: 'http://localhost:3000/catalog?tags=Гостиная'
        },
        {
            name: "Спальня",
            image: bedroom,
            link: 'http://localhost:3000/catalog?tags=Спальня'
        },
        {
            name: "Ванна",
            image: bathroom,
            link: 'http://localhost:3000/catalog?tags=Ванна'
        },
        {
            name: "Детская",
            image: kidsroom,
            link: 'http://localhost:3000/catalog?tags=Детская'
        },
        {
            name: "Холл",
            image: hall,
            link: 'http://localhost:3000/catalog?tags=Холл'
        },

    ]
    return (
        <div className="swiper flex justify-center">
            <Swiper
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                spaceBetween={50}
                slidesPerView={4}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="!pb-10"
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    600: {
                        slidesPerView: 3
                    },
                    900: {
                        slidesPerView: 4
                    }
                }}
            >
                {sliderData.map((data, index) => (
                    <SwiperSlide key={index} className="flex flex-col items-center justify-center text-center ">
                        <Link href={data.link}>
                            <Image className="swiper-image rounded-lg" src={data.image} width={350} alt="image of rooms" />
                            <span className="swiper-title text-[22px] pt-3 block">{data.name}</span>
                        </Link>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}

