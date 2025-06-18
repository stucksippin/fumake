
import { ConfiguratorProvider } from './contexts/Configurator';

export default function ConstructorLayout({ children }) {
    return (
        <ConfiguratorProvider>
            <div>
                {children}
            </div>
        </ConfiguratorProvider>
    );
}
