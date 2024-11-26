import Image from "next/image";
import welcome_pic from "../public/image/welcome_pic.png"
import bedroom from "../public/image/range/bedroom.png"
import dinning from "../public/image/range/dinning.png"
import living from "../public/image/range/living.png"
import { Button } from "antd";
import BreefCatalog from "@/components/BreefCatalog";
import getBreefFurniture from "@/libs/getBreefFurniture";
import Link from "next/link";

export default async function MainPage() {
    const furnitures = await getBreefFurniture()
    return (
        <div className="mainPage">

            <div className="mainPage_welcome_block relative" >
                <Image src={welcome_pic} alt="welcome picture with furniture" />
                <div className="absolute left-[50%] bottom-[20%] flex flex-col bg-[#FFF3E3] p-8">
                    <span className="text-[45px] text-[#BAA898] font-semibold mb-5">Изучите Нашу <br /> Новую Коллекцию</span>
                    <span className="mb-5 text-[18px]">Magna ad nulla proident exercitation incididunt duis occaecat est cillum non eu amet sint. Duis officia </span>
                    <Button className="w-fit p-7 bg-[#BAA898] font-semibold" type="text">ПОСМОТРЕТЬ</Button>
                </div>
            </div>

            <div className="mainPage_range container mt-[100px]">

                <div className="range_title text-center pt-[10%] pb-10">
                    <h2 className="title">Ассортимент мебели для всех уголков </h2>
                    <span>Lorem amet enim laboris est enim velit nostrud.</span>
                </div>

                <div className="range_category flex justify-around ">
                    <div className="flex flex-col text-center mr-5">
                        <Image src={bedroom} width={380} alt="image of bedroom" />
                        <span className="text-[22px] pt-3">Кухня</span>
                    </div>
                    <div className="flex flex-col text-center mr-5">
                        <Image src={dinning} alt="image of dinning room" />
                        <span className="text-[22px] pt-3">Гостиная</span>
                    </div>
                    <div className="flex flex-col text-center mr-5">
                        <Image src={living} alt="image of living room" />
                        <span className="text-[22px] pt-3">Спальня</span>
                    </div>
                </div>
            </div>


            <BreefCatalog furnitures={furnitures} />

        </div>
    );
}
