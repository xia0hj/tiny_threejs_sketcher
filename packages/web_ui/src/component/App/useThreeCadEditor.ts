import { useGlobalStore } from "@src/store";
import { useEffect, useRef } from "react";
import { CommandKeyList, ThreeCadEditor } from "sdk";

export function useThreeCadEditor() {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const setThreeCadEditor = useGlobalStore((state) => state.setThreeCadEditor);
  useEffect(() => {
    if (canvasElementRef.current != null) {
      const threeCadEditor = new ThreeCadEditor(canvasElementRef.current);
      setThreeCadEditor(threeCadEditor);
      return () => {
        threeCadEditor.dispose();
        setThreeCadEditor(undefined);
      };
    }
  }, [canvasElementRef, setThreeCadEditor]);
  return canvasElementRef;
}
