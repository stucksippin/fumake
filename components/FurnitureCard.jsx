'use client';
import useFavoritesStore from '@/app/store/useFavoriteStore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';


export default function FurnitureCard({ id, name, tags, price, image }) {
    const editPrice = String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');
    const [active, setActive] = useState(false);


    const { favorites, addToFavorites, removeFromFavorites, isInFavorites } = useFavoritesStore();


    useEffect(() => {
        setActive(isInFavorites(id));
    }, [id, isInFavorites]);


    const handleClick = () => {
        if (active) {
            removeFromFavorites(id);
        } else {
            addToFavorites({ id, name, tags, price, image });
        }
        setActive(!active);
    };

    return (
        <div className="flex transformCard flex-col">
            <button className="relative" onClick={handleClick}>
                <div className={`qw absolute top-5 right-5 bg-white p-2 rounded-3xl ${active ? 'bg-[#C44B4B]' : ''}`}>
                    <svg
                        className="heart-icon"
                        width="23"
                        height="23"
                        viewBox="0 0 26 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.16683 1.5C3.94566 1.5 1.3335 4.08533 1.3335 7.275C1.3335 9.84983 2.35433 15.9608 12.4028 22.1383C12.5828 22.2479 12.7895 22.3058 13.0002 22.3058C13.2109 22.3058 13.4175 22.2479 13.5975 22.1383C23.646 15.9608 24.6668 9.84983 24.6668 7.275C24.6668 4.08533 22.0547 1.5 18.8335 1.5C15.6123 1.5 13.0002 5 13.0002 5C13.0002 5 10.388 1.5 7.16683 1.5Z"
                            stroke={"currentColor"}
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill={active ? 'white' : 'none'}
                        />
                    </svg>
                </div>
            </button>

            <Link href={`/catalog/${id}`} className="flex flex-col">
                <Image className="rounded-lg" width={285} height={300} src={image} alt="furniture" />
                <span className="font-bold text-[#484848] text-[]">{name}</span>
                <span className="">{editPrice} ₽</span>
            </Link>
        </div>
    );
}