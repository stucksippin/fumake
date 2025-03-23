'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Navigation } from 'swiper/modules';
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


export default function SliderInstance() {

    const sliderData = [
        {
            name: "Кухня",
            image: dinning,
        },
        {
            name: "Гостиная",
            image: living,
        },
        {
            name: "Спальня",
            image: bedroom,
        },
        {
            name: "Ванна",
            image: bathroom,
        },
        {
            name: "Детская",
            image: kidsroom,
        },
        {
            name: "Холл",
            image: hall,
        },

    ]
    return (
        <div className="flex justify-center">
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="!pb-10"
            >
                {sliderData.map((data, index) => (
                    <SwiperSlide key={index} className="flex flex-col items-center justify-center text-center ">
                        <Image className="rounded-lg" src={data.image} width={350} alt="image of rooms" />
                        <span className="text-[22px] pt-3 block">{data.name}</span>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}

