import { useGlobalStore } from "@src/store";
import { useEffect, useRef } from "react";
import { ThreeCadEditor } from "sdk";

export function useThreeCadEditor() {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const setThreeCadEditor = useGlobalStore((state) => state.setThreeCadEditor);
  useEffect(() => {
    if (canvasElementRef.current != null) {
      const threeCadEditor = new ThreeCadEditor({
        canvasElement: canvasElementRef.current,
        globalStateWatcher: {
          sketchObjectTree(newTree) {
            console.log(newTree)
          }
        }
      });
      setThreeCadEditor(threeCadEditor);
      return () => {
        threeCadEditor.dispose();
        setThreeCadEditor(undefined);
      };
    }
  }, [canvasElementRef, setThreeCadEditor]);
  return canvasElementRef;
}
