import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Image from 'next/image';
import forward from '@/public/image/Forward.png'
import back from '@/public/image/Back.png'

export default function ImageThumb({ images }) {
    const galleryImages = images.map(img => ({
        original: `/image/furniture/uploads/${img.name}.webp`,
        thumbnail: `/image/furniture/uploads/${img.name}.webp`,
    }));

    return (
        <div className='relative max-w-[600px]'>
            <ImageGallery
                renderLeftNav={(onClick, disabled) => (
                    <button className="absolute z-10 top-[50%]" disabled={disabled} onClick={onClick}>
                        <Image src={back} alt='back arrow' width={40} />
                    </button>
                )}
                renderRightNav={(onClick, disabled) => (
                    <button className="absolute z-10 top-[50%] right-0" disabled={disabled} onClick={onClick}>
                        <Image src={forward} alt='forward arrow' width={40} />
                    </button>
                )}
                showPlayButton={false}
                lazyLoad={true}
                items={galleryImages}
            />
        </div>
    );
}
