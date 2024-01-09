import { useEffect, useRef } from "react";
import { SceneRenderer } from "sdk";

export function useSceneRenderer() {
    const canvasElementRef = useRef<HTMLCanvasElement>();
    useEffect(() => {
        if (canvasElementRef.current != null) {
            const sceneRenderer = new SceneRenderer(canvasElementRef.current);
            sceneRenderer.start();
            return () => sceneRenderer.dispose();
        }
    });
    return canvasElementRef;
}
