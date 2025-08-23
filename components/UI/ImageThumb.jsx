import React, { useState, useEffect } from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Image from 'next/image';
import forward from '@/public/image/Forward.png';
import back from '@/public/image/Back.png';

export default function ImageThumb({ images }) {
    const [isAutoPlay, setAutoPlay] = useState(true);
    const [galleryRef, setGalleryRef] = useState(null);

    console.log(images);

    const galleryImages = images.map(img => ({
        original: img.url,
        thumbnail: img.url,
    }));

    // Обработчики для остановки автопрокрутки
    const handleInteraction = () => {
        if (isAutoPlay) {
            setAutoPlay(false);
            galleryRef?.pause();
        }
    };

    // Эффект для повторного запуска автопрокрутки при смене изображений
    useEffect(() => {
        if (isAutoPlay && galleryRef) {
            galleryRef.play();
        }
    }, [images, isAutoPlay, galleryRef]);

    return (
        <div className='relative w-full max-w-4xl mx-auto'
            onTouchStart={handleInteraction}
            onMouseDown={handleInteraction}>

            {/* Обертка для адаптивности */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-50 shadow-xl">
                <ImageGallery
                    ref={ref => setGalleryRef(ref)}
                    autoPlay={isAutoPlay}
                    autoPlayInterval={4000}
                    onSlide={handleInteraction}
                    onTouchMove={handleInteraction}
                    onMouseOver={handleInteraction}
                    renderLeftNav={(onClick, disabled) => (
                        <button
                            className={`
                                absolute z-10 left-4 top-1/2 -translate-y-1/2
                                bg-white/90 backdrop-blur-sm hover:bg-white
                                rounded-full p-2 sm:p-3 shadow-lg
                                transition-all duration-300 hover:scale-110
                                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
                            `}
                            disabled={disabled}
                            onClick={(e) => {
                                handleInteraction();
                                onClick(e);
                            }}
                        >
                            <Image
                                src={back}
                                alt='back arrow'
                                width={24}
                                height={24}
                                className="sm:w-8 sm:h-8"
                            />
                        </button>
                    )}
                    renderRightNav={(onClick, disabled) => (
                        <button
                            className={`
                                absolute z-10 right-4 top-1/2 -translate-y-1/2
                                bg-white/90 backdrop-blur-sm hover:bg-white
                                rounded-full p-2 sm:p-3 shadow-lg
                                transition-all duration-300 hover:scale-110
                                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
                            `}
                            disabled={disabled}
                            onClick={(e) => {
                                handleInteraction();
                                onClick(e);
                            }}
                        >
                            <Image
                                src={forward}
                                alt='forward arrow'
                                width={24}
                                height={24}
                                className="sm:w-8 sm:h-8"
                            />
                        </button>
                    )}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    showThumbnails={images.length > 1}
                    thumbnailPosition="bottom"
                    lazyLoad={true}
                    items={galleryImages}
                    additionalClass="interactive-gallery"
                    useBrowserFullscreen={false}
                    renderFullscreenButton={(onClick, isFullscreen) => (
                        <button
                            className="absolute z-10 top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                            onClick={onClick}
                            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isFullscreen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4m-4 0l5.657 5.657M20 16v4m0 0h-4m4 0l-5.657-5.657" />
                                )}
                            </svg>
                        </button>
                    )}
                />
            </div>

            {/* Индикатор автопроигрывания */}
            {isAutoPlay && images.length > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    <span>Авто</span>
                </div>
            )}

            {/* Кастомные стили для галереи */}
            <style jsx global>{`
                .interactive-gallery .image-gallery-slide img {
                    max-height: 600px;
                    object-fit: contain;
                    border-radius: 0;
                }
                
                .interactive-gallery .image-gallery-thumbnail img {
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                
                .interactive-gallery .image-gallery-thumbnail.active img,
                .interactive-gallery .image-gallery-thumbnail:hover img {
                    transform: scale(1.05);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .interactive-gallery .image-gallery-thumbnails-wrapper {
                    padding: 16px;
                }
                
                .interactive-gallery .image-gallery-thumbnails {
                    gap: 12px;
                }
                
                .interactive-gallery .image-gallery-thumbnail {
                    border: 2px solid transparent;
                    border-radius: 12px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                
                .interactive-gallery .image-gallery-thumbnail.active {
                    border-color: #f97316;
                    box-shadow: 0 0 0 2px #fed7aa;
                }
                
                .interactive-gallery .image-gallery-thumbnail:hover {
                    border-color: #fb923c;
                }
                
                /* Адаптивность для мобильных устройств */
                @media (max-width: 640px) {
                    .interactive-gallery .image-gallery-slide img {
                        max-height: 400px;
                    }
                    
                    .interactive-gallery .image-gallery-thumbnails-wrapper {
                        padding: 12px;
                    }
                    
                    .interactive-gallery .image-gallery-thumbnails {
                        gap: 8px;
                    }
                    
                    .interactive-gallery .image-gallery-thumbnail {
                        width: 60px !important;
                        height: 60px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .interactive-gallery .image-gallery-slide img {
                        max-height: 300px;
                    }
                    
                    .interactive-gallery .image-gallery-thumbnail {
                        width: 50px !important;
                        height: 50px !important;
                    }
                }
                
                /* Скрыть thumbnails на очень маленьких экранах если изображений много */
                @media (max-width: 375px) {
                    .interactive-gallery .image-gallery-thumbnails-wrapper {
                        display: ${images.length > 4 ? 'none' : 'block'};
                    }
                }
            `}</style>
        </div>
    );
}