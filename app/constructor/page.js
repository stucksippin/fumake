'use client';

import dynamic from 'next/dynamic';
import { Interface } from './components/Interface';
import { Experience } from './components/Experience';

const Canvas = dynamic(() => import('./components/CanvasWrapper'), {
    ssr: false,
    loading: () => <div>Loading canvas...</div>,
});

export default function ConstructorPage() {
    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex">
                <Canvas
                    className="flex-1 h-full"
                    camera={{ position: [3, 3, -9], fov: 25 }}
                    shadows
                >
                    <Experience />
                </Canvas>
            </div>
            <div className="w-80 p-4 overflow-auto bg-white/80 backdrop-blur-sm">
                <Interface />
            </div>
        </div>
    );
}
