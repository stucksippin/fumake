'use client'
import Image from "next/image";
import cart from "@/public/image/header/cart.png"
import like from "@/public/image/header/like.png"
import Link from "next/link";
import { useState } from "react";
import FavouriteModal from "../FavouriteModal";


export default function Header() {
    const [modal, setModal] = useState()

    function handleToggle() {
        setModal(!modal)
    }

    return (
        <header className="header  py-4 sticky top-[0.5px] z-50 bg-white border-b-2 ">

            <nav className="header_container flex container justify-between items-center">
                <Link href={"/"}><span className="header-logo font-bold">FUMAKE</span></Link>
                <ul className="header_container-links flex gap-x-5">
                    <Link className="first-link hover:bg-[#FFF3E3] p-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150" href={'/'}>Главная</Link>
                    <Link className="hover:bg-[#FFF3E3] p-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 " href={'/catalog'}>Каталог</Link>
                    <Link className="hover:bg-[#FFF3E3] p-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 " href={'/contact'}>Контакты</Link>
                    <Link className="hover:bg-[#FFF3E3] p-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 " href={'/constructor'}>Конструктор мебели</Link>
                </ul>
                <ul className="header_container-icons flex gap-x-5">
                    <Link className="hover:scale-110 duration-300" href={'/cart'}><Image className="header-icons" src={cart} width={23} alt="cart ico" /></Link>
                    <button onClick={handleToggle} className="hover:scale-110 duration-300"><Image className="header-icons" src={like} width={23} alt="like ico" /></button>
                </ul>
            </nav>
            {modal && <FavouriteModal onClose={handleToggle} />}
        </header>
    )
}
