import { useGlobalStore } from "@src/store";
import { useEffect, useRef } from "react";
import { ThreeCadEditor, MODULE_NAME } from "sdk";

export function useThreeCadEditor() {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const setThreeCadEditor = useGlobalStore((state) => state.setThreeCadEditor);
  const setSketchObjectTree = useGlobalStore(
    (state) => state.setSketchObjectTree,
  );
  const setSelectedObjects = useGlobalStore(
    (state) => state.setSelectedObjects,
  );

  useEffect(() => {
    if (canvasElementRef.current != null) {
      const threeCadEditor = new ThreeCadEditor(canvasElementRef.current, {
        debug: true,
      });
      threeCadEditor.startRender();

      const emitter = threeCadEditor
        .getModule(MODULE_NAME.GlobalStore)
        .getEmitter();
      emitter.on("sketchObjectTreeRoot", (treeRoot) => {
        setSketchObjectTree(treeRoot);
      });
      emitter.on("selectedObjects", (objects) => {
        setSelectedObjects(objects);
      });

      (window as any).tce = threeCadEditor;
      setThreeCadEditor(threeCadEditor);

      return () => {
        threeCadEditor.dispose();
      };
    }
  }, [
    canvasElementRef,
    setThreeCadEditor,
    setSketchObjectTree,
    setSelectedObjects,
  ]);
  return canvasElementRef;
}
