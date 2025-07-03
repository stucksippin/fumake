// app/constructor/page.tsx
export const dynamic = 'force-dynamic'; // теперь работает!

import ConstructorPageClient from './ConstructorPageClient';

export default function ConstructorPage() {
    return <ConstructorPageClient />;
}
