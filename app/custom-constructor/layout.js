import { ConfiguratorProvider } from './contexts/Configurator';
export const metadata = {
    title: "FUMAKE",
    description: "Конструктор мебели",
};

export default function ConstructorLayout({ children }) {
    return (
        <ConfiguratorProvider>
            <div>
                {children}
            </div>
        </ConfiguratorProvider>
    );
}
