'use client';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';

export function SceneWrapper() {
    return (
        <Canvas
            className="flex-1 h-full"
            camera={{ position: [3, 3, -9], fov: 25 }}
            shadows
        >
            <Experience />
        </Canvas>
    );
}