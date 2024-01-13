import { rendererStore } from "@src/store";
import { useEffect, useRef } from "react";
import { SceneRenderer, getInstanceContext } from "sdk";

export function useSceneRenderer() {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasElementRef.current != null) {
      const sceneRenderer = new SceneRenderer(
        canvasElementRef.current,
        rendererStore,
      );
      sceneRenderer.start();
      (window as any).cs = getInstanceContext(
        sceneRenderer.scene.uuid,
      ).commandSystem;
      return () => sceneRenderer.dispose();
    }
  }, [canvasElementRef]);
  return canvasElementRef;
}
