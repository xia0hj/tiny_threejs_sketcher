import { rendererStore } from "@src/store";
import { useEffect, useRef } from "react";
import { SceneRenderer } from "sdk";

export function useSceneRenderer() {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasElementRef.current != null) {
      const sceneRenderer = new SceneRenderer(
        canvasElementRef.current,
        rendererStore,
      );
      return () => sceneRenderer.dispose();
    }
  }, [canvasElementRef]);
  return canvasElementRef;
}
