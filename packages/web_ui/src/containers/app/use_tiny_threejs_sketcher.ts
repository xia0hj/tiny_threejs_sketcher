import { useSketcherStore } from "@src/store";
import { useEffect, useRef } from "react";
import { TinyThreejsSketcher, MODULE_NAME } from "tiny_threejs_sketcher";

export function useTinyThreejsSketcher() {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const setTinyThreejsSketcher = useSketcherStore((state) => state.setTinyThreejsSketcher);
  const setSketchObjectTree = useSketcherStore(
    (state) => state.setSketchObjectTree,
  );
  const setSelectedObjects = useSketcherStore(
    (state) => state.setSelectedObjects,
  );

  useEffect(() => {
    if (canvasElementRef.current != null) {
      const threeCadEditor = new TinyThreejsSketcher(canvasElementRef.current, {
        debug: true,
      });

      const emitter = threeCadEditor
        .getModule(MODULE_NAME.StateStore)
        .getEmitter();
      emitter.on("sketchObjectTreeRoot", (treeRoot) => {
        setSketchObjectTree(treeRoot);
      });
      emitter.on("selectedObjects", (objects) => {
        setSelectedObjects(objects);
      });

      threeCadEditor.startRender();

      (window as any).tce = threeCadEditor;
      setTinyThreejsSketcher(threeCadEditor);

      return () => {
        threeCadEditor.dispose();
      };
    }
  }, [
    canvasElementRef,
    setTinyThreejsSketcher,
    setSketchObjectTree,
    setSelectedObjects,
  ]);
  return canvasElementRef;
}
