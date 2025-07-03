'use client';

export const dynamic = 'force-dynamic';

import loadable from 'next/dynamic';
import { Experience } from './components/Experience';
import { Interface } from './components/Interface';

const Canvas = loadable(() => import('./components/CanvasWrapper'), {
    ssr: false,
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
