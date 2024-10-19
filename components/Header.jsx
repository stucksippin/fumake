import Image from "next/image";
import user from "../app/image/header/user.png"
import cart from "../app/image/header/cart.png"
import like from "../app/image/header/like.png"
import search from "../app/image/header/search.png"
export default function Header() {
    return (
        <header className="header p-5">

            <nav className="flex justify-around">
                <span className="font-bold">FUCRAFT</span>
                <ul className="flex gap-x-5">
                    <li>Главная</li>
                    <li>Каталог</li>
                    <li>О нас</li>
                    <li>Контакты</li>
                </ul>
                <ul className="flex gap-x-5">
                    <li> <Image src={user} width={23} alt="user ico" /> </li>
                    <li><Image src={cart} width={23} alt="user ico" /></li>
                    <li><Image src={like} width={23} alt="user ico" /></li>
                    <li><Image src={search} width={23} alt="user ico" /></li>
                </ul>
            </nav>
        </header>
    )
}
