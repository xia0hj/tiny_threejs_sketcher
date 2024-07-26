import { useGlobalStore } from "@src/store";
import { useEffect, useRef } from "react";
import { ThreeCadEditor } from "sdk";

export function useThreeCadEditor() {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const setThreeCadEditor = useGlobalStore((state) => state.setThreeCadEditor);
  const setSketchObjectTree = useGlobalStore(
    (state) => state.setSketchObjectTree,
  );
  const setSelectedObjectList = useGlobalStore(
    (state) => state.setSelectedObjectList,
  );

  useEffect(() => {
    if (canvasElementRef.current != null) {
      const threeCadEditor = new ThreeCadEditor();
      threeCadEditor.startRender(canvasElementRef.current);

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
    setSelectedObjectList,
  ]);
  return canvasElementRef;
}
