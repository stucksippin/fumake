'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';

export default function CanvasWrapper(props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <Canvas {...props} />;
}
