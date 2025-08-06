import { OrbitControls, Stage, Environment, useTexture } from "@react-three/drei"
import { useConfigurator } from "../contexts/Configurator"
import { Table } from "./Table"
import { Suspense } from "react"

export const Experience = () => {
    const { legs } = useConfigurator()

    return (
        <>
            <Stage
                intensity={0.5}
                environment={null}
                shadows={{
                    type: "accumulative",
                    color: "#ffffff",
                    colorBlend: 1,
                    opacity: 2,
                }}
                adjustCamera={2}
            >
                {/* Оборачиваем в Suspense для асинхронной загрузки */}
                <Suspense fallback={null}>
                    <EnvironmentWrapper />
                </Suspense>

                <Table />
            </Stage>
            <OrbitControls
                makeDefault
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
            />
        </>
    )
}

// Выносим в отдельный компонент для обработки ошибок
function EnvironmentWrapper() {
    try {
        return (
            <>
                <Environment
                    files="/env.hdr"
                    onError={(e) => console.error("Failed to load HDR:", e)}
                />

            </>
        )
    } catch (e) {
        console.error("Environment error:", e)
        return (
            <>
                <ambientLight intensity={0.7} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1.5}
                    castShadow
                />
            </>
        )
    }
}