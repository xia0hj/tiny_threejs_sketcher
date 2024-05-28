import { ThreeCadEditor } from "@src/three_cad_editor";

export type OperationMode = {
  onPointerdown?: (event: PointerEvent, threeCadEditor: ThreeCadEditor) => void;
};

const defaultOperationMode = Object.freeze<OperationMode>({
  onPointerdown(event, threeCadEditor) {
    const intersectList =
      threeCadEditor.sketchObjectManager.getPointerIntersectList(event);
    if(!Array.isArray(intersectList) || intersectList.length === 0){
      return;
    }
    const firstIntersect = intersectList[0];
    firstIntersect.object.onSelect();
  },
});

export class OperationModeSwitcher {
  threeCadEditor: ThreeCadEditor;

  private abortController = new AbortController();

  currentOperationMode: OperationMode = defaultOperationMode;

  constructor(threeCadEditor: ThreeCadEditor) {
    this.threeCadEditor = threeCadEditor;

    threeCadEditor.canvasElement.addEventListener(
      "pointerdown",
      (event) => {
        this.currentOperationMode?.onPointerdown?.(event, threeCadEditor);
      },
      { signal: this.abortController.signal },
    );
  }

  resetOperationMode() {
    this.currentOperationMode = defaultOperationMode;
  }

  dispose() {
    this.abortController.abort();
  }
}
