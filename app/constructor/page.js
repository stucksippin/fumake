// app/constructor/page.tsx
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import ConstructorPageClient from './ConstructorPageClient';

export default function ConstructorPage() {
    return <ConstructorPageClient />;
}
