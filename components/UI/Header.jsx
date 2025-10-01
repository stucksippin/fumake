'use client'
import Image from "next/image";
import cart from "@/public/image/header/cart.png"
import like from "@/public/image/header/like.png"
import Link from "next/link";
import { useState } from "react";
import FavouriteModal from "../FavouriteModal";

export default function Header() {
    const [modal, setModal] = useState(false) // ✅ добавил false по умолчанию
    const [menuOpen, setMenuOpen] = useState(false) // для мобильного меню

    function handleToggle() {
        setModal(!modal)
    }

    return (
        <header className="header py-4 sticky top-0 z-50 bg-white border-b-2">
            <nav className="header_container container flex justify-between items-center">
                <Link href={"/"}>
                    <span className="header-logo font-bold text-xl">FUMAKE</span>
                </Link>

                {/* Десктоп навигация */}
                <ul className="header_container-links hidden lg:flex gap-x-5">
                    <Link className="hover:bg-[#FFF3E3] p-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150" href={'/'}>
                        Главная
                    </Link>
                    <Link className="hover:bg-[#FFF3E3] p-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150" href={'/catalog'}>
                        Каталог
                    </Link>
                    <Link className="hover:bg-[#FFF3E3] p-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150" href={'/contact'}>
                        Контакты
                    </Link>
                    <Link className="hover:bg-[#FFF3E3] p-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150" href={'/custom-constructor'}>
                        Конструктор
                    </Link>
                </ul>

                <ul className="header_container-icons flex gap-x-5 items-center">
                    <Link className="hover:scale-110 duration-300" href={'/cart'}>
                        <Image className="header-icons" src={cart} width={23} height={23} alt="cart icon" />
                    </Link>
                    <button onClick={handleToggle} className="hover:scale-110 duration-300">
                        <Image className="header-icons" src={like} width={23} height={23} alt="like icon" />
                    </button>

                    {/* Бургер меню для мобильных */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden flex flex-col gap-1"
                        aria-label="Toggle menu"
                    >
                        <span className="w-6 h-0.5 bg-black"></span>
                        <span className="w-6 h-0.5 bg-black"></span>
                        <span className="w-6 h-0.5 bg-black"></span>
                    </button>
                </ul>
            </nav>

            {/* Мобильное меню */}
            {menuOpen && (
                <div className="lg:hidden bg-white border-t mt-4 py-4">
                    <ul className="flex flex-col gap-y-3 container">
                        <Link onClick={() => setMenuOpen(false)} className="hover:bg-[#FFF3E3] p-2 rounded-lg" href={'/'}>
                            Главная
                        </Link>
                        <Link onClick={() => setMenuOpen(false)} className="hover:bg-[#FFF3E3] p-2 rounded-lg" href={'/catalog'}>
                            Каталог
                        </Link>
                        <Link onClick={() => setMenuOpen(false)} className="hover:bg-[#FFF3E3] p-2 rounded-lg" href={'/contact'}>
                            Контакты
                        </Link>
                        <Link onClick={() => setMenuOpen(false)} className="hover:bg-[#FFF3E3] p-2 rounded-lg" href={'/custom-constructor'}>
                            Конструктор мебели
                        </Link>
                    </ul>
                </div>
            )}

            {modal && <FavouriteModal onClose={handleToggle} />}
        </header>
    )
}