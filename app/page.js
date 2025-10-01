export const dynamic = 'force-dynamic';
import Image from "next/image";
import welcome_pic from "../public/image/welcome_pic.png"
import BreefCatalog from "@/components/BreefCatalog";
import getBreefFurniture from "@/libs/getBreefFurniture";
import Link from "next/link";
import SliderInstance from "@/components/UI/SliderInstance";
import { unstable_noStore as noStore } from 'next/cache';

export default async function MainPage() {
    noStore()
    const furnitures = await getBreefFurniture()

    return (
        <div className="mainPage">


            <div className="mainPage_welcome_block relative">
                <Image
                    className="welcome_block-image w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] object-cover"
                    src={welcome_pic}
                    alt="welcome picture with furniture"
                />
                <div className="welcome_block-info absolute left-[55%] md:left-[60%] -translate-x-1/2 bottom-[10%] md:bottom-[20%] flex flex-col bg-[#FFF3E3] p-4 md:p-8 max-w-[90%] md:max-w-none rounded-md">
                    <h1 className="welcome_block-title text-xl sm:text-2xl md:text-3xl lg:text-[45px] text-[#BAA898] font-semibold mb-3 md:mb-5" style={{ lineHeight: '1.2' }}>
                        Изучите Нашу <br /> Новую Коллекцию
                    </h1>
                    <h2 className="welcome_block-text hidden md:block mb-5 text-base lg:text-[18px] text-gray-700">
                        Стильные и функциональные решения для вашего дома. Качество, которое прослужит годами.
                    </h2>
                    <button
                        className="welcome_block-button w-fit py-2 md:py-3 px-6 md:px-8 text-xs md:text-[12px] bg-[#BAA898] text-white hover:bg-[#FFF3E3] hover:text-black hover:border border-black font-semibold rounded-lg transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-100"
                        type="button"
                    >
                        СМОТРЕТЬ КАТАЛОГ
                    </button>
                </div>
            </div>



            <div className="mainPage_range container mt-[100px]">
                <div className="range_title text-center pt-[10%] pb-10">
                    <h2 className="title">Ассортимент мебели для всех уголков </h2>
                    <span>Lorem amet enim laboris est enim velit nostrud.</span>
                </div>
                <SliderInstance />
            </div>


            <BreefCatalog furnitures={furnitures} />
            <Link className="flex justify-center mt-10" href={"/catalog"}><button className="button button:hover" type="text">БОЛЬШЕ</button></Link>
        </div>
    );
}
