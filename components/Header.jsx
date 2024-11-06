import Image from "next/image";
import user from "../public/image/header/user.png"
import cart from "../public/image/header/cart.png"
import like from "../public/image/header/like.png"
import search from "../public/image/header/search.png"
import Link from "next/link";

import { NextAuthOptions } from "@/config";

export default async function Header() {

    return (
        <header className="header p-5">

            <nav className="flex justify-around">
                <span className="font-bold">FUCRAFT</span>
                <ul className="flex gap-x-5">
                    <Link href={'/'}>Главная</Link>
                    <Link href={'#'}>Каталог</Link>
                    <Link href={'#'}>О нас</Link>
                    <Link href={'#'}>Контакты</Link>
                </ul>
                <ul className="flex gap-x-5">
                    <Link href={'#'}> <Image src={user} width={23} alt="user ico" /> </Link>
                    <Link href={'#'}><Image src={cart} width={23} alt="user ico" /></Link>
                    <Link href={'#'}><Image src={like} width={23} alt="user ico" /></Link>
                    <Link href={'#'}><Image src={search} width={23} alt="user ico" /></Link>

                </ul>
            </nav>
        </header>
    )
}
