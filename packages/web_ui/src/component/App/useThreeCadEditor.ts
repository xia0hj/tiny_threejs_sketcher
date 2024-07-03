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
      const threeCadEditor = new ThreeCadEditor({
        canvasElement: canvasElementRef.current,
        globalStateWatcher: {
          sketchObjectTreeRoot(newTree) {
            console.log(newTree);
            setSketchObjectTree(newTree);
          },
          selectedObjectList(objList) {
            setSelectedObjectList([...objList]);
          },
        },
      });
      (window as any).tce = threeCadEditor;
      setThreeCadEditor(threeCadEditor);
      return () => {
        threeCadEditor.dispose();
        setThreeCadEditor(undefined);
      };
    }
  }, [canvasElementRef, setThreeCadEditor, setSketchObjectTree]);
  return canvasElementRef;
}
