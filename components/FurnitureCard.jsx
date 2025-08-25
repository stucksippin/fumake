'use client';
import useFavoritesStore from '@/app/store/useFavoriteStore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';

export default function FurnitureCard({ id, name, tags, price, image }) {
    const editPrice = String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');
    const [active, setActive] = useState(false);

    message.config({
        top: 60,
        duration: 3,
    });

    const { favorites, addToFavorites, removeFromFavorites, isInFavorites } = useFavoritesStore();

    useEffect(() => {
        setActive(isInFavorites(id));
    }, [id, isInFavorites]);

    const handleClick = () => {
        if (active) {
            removeFromFavorites(id);
            message.error('Товар убран из избранного ');
        } else {
            addToFavorites({ id, name, tags, price, image });
            message.success('Товар добавлен в избранное ');
        }
        setActive(!active);
    };

    return (
        <div className="transformCard flex flex-col items-start relative w-full max-w-sm group">
            {/* Лайк — абсолют внутри карточки */}
            <button
                className="absolute top-3 right-3 z-10 transition-transform duration-200 hover:scale-110"
                onClick={handleClick}
            >
                <div className={`bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg transition-all duration-300 ${active ? '!bg-red-500 shadow-red-200' : 'hover:bg-gray-50'
                    }`}>
                    <svg
                        className="heart-icon transition-transform duration-200"
                        width="20"
                        height="20"
                        viewBox="0 0 26 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.16683 1.5C3.94566 1.5 1.3335 4.08533 1.3335 7.275C1.3335 9.84983 2.35433 15.9608 12.4028 22.1383C12.5828 22.2479 12.7895 22.3058 13.0002 22.3058C13.2109 22.3058 13.4175 22.2479 13.5975 22.1383C23.646 15.9608 24.6668 9.84983 24.6668 7.275C24.6668 4.08533 22.0547 1.5 18.8335 1.5C15.6123 1.5 13.0002 5 13.0002 5C13.0002 5 10.388 1.5 7.16683 1.5Z"
                            stroke={active ? "white" : '#374151'}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill={active ? 'white' : 'none'}
                        />
                    </svg>
                </div>
            </button>

            <Link href={`/catalog/${id}`} className="flex flex-col w-full">
                {/* Адаптивный контейнер с object-contain */}
                <div className='relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden group-hover:shadow-lg transition-all duration-300'>
                    <Image
                        className="rounded-xl transition-transform duration-300 group-hover:scale-105"
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        src={image}
                        alt={name}
                        style={{ objectFit: 'contain' }}
                        priority={false}
                    />
                </div>

                <div className="pt-3 space-y-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 leading-tight">
                        {name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                        {editPrice} ₽
                    </p>
                </div>
            </Link>
        </div>
    );
}