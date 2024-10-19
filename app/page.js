import Image from "next/image";
import welcome_pic from "./image/welcome_pic.png"
import { Button } from "antd";
export default function Home() {
  return (
    <div>
      <div className="welcome_block relative" >
        <Image src={welcome_pic} alt="welcome picture with furniture" />

        <div className="absolute left-[50%] bottom-[20%] flex flex-col bg-[#FFF3E3] p-8">
          <span className="text-[45px] text-[#BAA898] font-semibold mb-5">Изучите Нашу <br /> Новую Коллекцию</span>
          <span className="mb-5 text-[18px]">Magna ad nulla proident exercitation incididunt duis occaecat est cillum non eu amet sint. Duis officia </span>
          <Button className="w-fit p-7 bg-[#BAA898]" type="text">ПОСМОТРЕТЬ</Button>
        </div>

      </div>
    </div>
  );
}
