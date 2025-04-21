import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Image from 'next/image';
import forward from '@/public/image/Forward.png'
import back from '@/public/image/Back.png'

export default function ImageThumb() {
    const image = [
        {
            original: 'https://m.pm.ru/global_images/goods/02e/e8f/c4c/bb6/1210960_original.jpg',
            thumbnail: 'https://m.pm.ru/global_images/goods/02e/e8f/c4c/bb6/1210960_original.jpg'
        },
        {
            original: 'https://letabouret.ru/upload/resize_cache/iblock/13d/770_675_1/13d22e792f5b3744fac895563a4a3388.jpg',
            thumbnail: 'https://letabouret.ru/upload/resize_cache/iblock/13d/770_675_1/13d22e792f5b3744fac895563a4a3388.jpg'
        },
        {
            original: 'https://www.belfan.ru/upload/iblock/7a2/oskar_spalnya_orekh_6.jpg',
            thumbnail: 'https://www.belfan.ru/upload/iblock/7a2/oskar_spalnya_orekh_6.jpg'
        }
    ]
    return (
        <div className='relative max-w-[600px]'>
            <ImageGallery
                renderLeftNav={(onClick, disabled) => (
                    <button
                        className="absolute z-10 top-[50%]"
                        disabled={disabled}
                        onClick={onClick}
                    >
                        <Image src={back} alt='back arrow' width={40} />
                    </button>
                )}
                renderRightNav={(onClick, disabled) => (
                    <button
                        className="absolute z-10 top-[50%] right-0"
                        disabled={disabled}
                        onClick={onClick}
                    >
                        <Image src={forward} alt='forward arrow' width={40} />
                    </button>
                )}
                showPlayButton={false}
                lazyLoad={true}
                items={image} />
        </div>
    )
}
