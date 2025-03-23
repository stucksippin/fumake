'use client';
import useFavoritesStore from '@/app/store/useFavoriteStore';
import { CloseOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


export default function FavouriteModal({ onClose }) {
    const [hydrated, setHydrated] = useState(false);
    const favorites = useFavoritesStore((state) => state.favorites);
    const removeFromFavorites = useFavoritesStore((state) => state.removeFromFavorites);



    const data = favorites.map((item) => ({
        key: item.id,
        ...item,
    }));

    const columns = [
        {
            title: 'Товар',
            dataIndex: 'name',
            key: 'name',
            width: '80%',
            render: (text, record) => (
                <Link href={`/catalog/${record.id}`} className="flex items-center gap-3">
                    <Image
                        src={record.image}
                        width={30}
                        height={30}
                        alt={text}
                        className="w-16 h-16 object-cover rounded"
                    />
                    <span>{text}</span>
                </Link>
            ),
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <button onClick={() => removeFromFavorites(record.id)}>
                    <svg
                        className="heart-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 26 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.16683 1.5C3.94566 1.5 1.3335 4.08533 1.3335 7.275C1.3335 9.84983 2.35433 15.9608 12.4028 22.1383C12.5828 22.2479 12.7895 22.3058 13.0002 22.3058C13.2109 22.3058 13.4175 22.2479 13.5975 22.1383C23.646 15.9608 24.6668 9.84983 24.6668 7.275C24.6668 4.08533 22.0547 1.5 18.8335 1.5C15.6123 1.5 13.0002 5 13.0002 5C13.0002 5 10.388 1.5 7.16683 1.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            ),
        },
    ];

    // hydrated
    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null;
    }

    return (
        <div className="sticky top-[7%] z-40">
            <div className="absolute right-5 top-5 flex flex-col items-center w-[400px]  min-h-[350px] bg-[#FAFAFA] rounded-md border-slate-300 border-2">
                <button onClick={onClose} className="absolute right-5 top-2 transition ease-in-out delay-100 hover:-translate-y-[2px] hover:scale-100 duration-100">
                    <CloseOutlined />
                </button>
                <span className="font-semibold mt-4 mb-2">Избранные товары</span>
                <hr />
                <Table className="w-full" locale={{ emptyText: 'Здесь пока пусто' }} dataSource={data} columns={columns} pagination={{ pageSize: 4 }} />
            </div>
        </div>
    );
}