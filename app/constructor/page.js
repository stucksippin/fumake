// pages/constructor/page.js
'use client';
import dynamic from 'next/dynamic';
import { Experience } from './components/Experience';
import { Interface } from './components/Interface';

export default function ConstructorPage() {
    const Canvas = dynamic(() => import('@react-three/fiber').then(m => m.Canvas), {
        ssr: false
    });

    return (
        <div className="min-h-screen flex">
            {/* Левая часть — трёхмерка */}
            <div className="flex-1 flex">
                <Canvas
                    className="flex-1 h-full"
                    camera={{ position: [3, 3, -9], fov: 25 }}
                    shadows
                >
                    <Experience />
                </Canvas>
            </div>

            {/* Правая панель */}
            <div className="w-80 p-4 overflow-auto bg-white/80 backdrop-blur-sm">
                <Interface />
            </div>
        </div>
    );
}
