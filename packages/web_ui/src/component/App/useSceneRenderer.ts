import { rendererStore } from "@src/store";
import { useEffect, useRef } from "react";
import { CommandKeyList, RootRenderer } from "sdk";

export function useSceneRenderer() {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasElementRef.current != null) {
      const rootRenderer = new RootRenderer(
        canvasElementRef.current,
        rendererStore,
      );
      (window as any).rr = rootRenderer;
      (window as any).tc = () =>
        rootRenderer.commandSystem.runCommand({
          key: CommandKeyList.create_plane,
          parameter: {
            offset: 3,
            parallelTo: "XY",
          },
        });
      return () => rootRenderer.dispose();
    }
  }, [canvasElementRef]);
  return canvasElementRef;
}
