import { rendererStore } from "@src/store";
import { useEffect, useRef } from "react";
import { CommandKeyList, SceneRenderer } from "sdk";

export function useSceneRenderer() {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasElementRef.current != null) {
      const sceneRenderer = new SceneRenderer(
        canvasElementRef.current,
        rendererStore,
      );
      (window as any).sr = sceneRenderer;
      (window as any).tc = () =>
        sceneRenderer.context.commandSystem.runCommand({
          key: CommandKeyList.create_plane,
          parameter: {
            offset: 3,
            parallelTo: "XY",
          },
        });
      return () => sceneRenderer.dispose();
    }
  }, [canvasElementRef]);
  return canvasElementRef;
}
