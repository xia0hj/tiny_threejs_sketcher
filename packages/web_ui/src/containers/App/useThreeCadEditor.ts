import { useEditorStore } from "@src/store";
import { useEffect, useRef } from "react";
import { ThreeCadEditor, MODULE_NAME } from "tiny_threejs_sketcher";

export function useThreeCadEditor() {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const setThreeCadEditor = useEditorStore((state) => state.setThreeCadEditor);
  const setSketchObjectTree = useEditorStore(
    (state) => state.setSketchObjectTree,
  );
  const setSelectedObjects = useEditorStore(
    (state) => state.setSelectedObjects,
  );

  useEffect(() => {
    if (canvasElementRef.current != null) {
      const threeCadEditor = new ThreeCadEditor(canvasElementRef.current, {
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
