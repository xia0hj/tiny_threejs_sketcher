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
      });

      const unsubscribeFn = [
        threeCadEditor.globalStore.subscribe(
          (state) => state.sketchObjectTreeRoot,
          (tree) => setSketchObjectTree(tree),
        ),
        threeCadEditor.globalStore.subscribe(
          (state) => state.selectedObjectList,
          (objList) => setSelectedObjectList([...objList]),
        ),
      ];

      (window as any).tce = threeCadEditor;
      setThreeCadEditor(threeCadEditor);
      // setUseSdkStore(() => useStore(threeCadEditor.globalStore));
      return () => {
        threeCadEditor.dispose();
        setThreeCadEditor(undefined);
        unsubscribeFn.forEach((unsubscribe) => unsubscribe());
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
