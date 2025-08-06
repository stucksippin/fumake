'use client';
import dynamic from 'next/dynamic';
import { Interface } from './components/Interface';

// Динамический импорт ВСЕГО 3D-окружения
const Scene = dynamic(
    () => import('./SceneWrapper').then((mod) => mod.SceneWrapper),
    {
        ssr: false,
        loading: () => <div className="flex-1 flex items-center justify-center">Загрузка 3D...</div>
    }
);

export default function ConstructorPage() {
    return (
        <div className="min-h-screen flex">
            {/* Левая часть — трёхмерка */}
            <div className="flex-1 flex">
                <Scene />
            </div>

            {/* Правая панель */}
            <div className="w-80 p-4 overflow-auto bg-white/80 backdrop-blur-sm">
                <Interface />
            </div>
        </div>
    );
}