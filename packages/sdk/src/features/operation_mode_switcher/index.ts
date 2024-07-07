import { PRESS_MIN_DURATION } from "@src/constant/config";
import { ThreeCadEditor } from "@src/three_cad_editor";

export type OperationMode = {
  onPointerdown?: (event: PointerEvent, threeCadEditor: ThreeCadEditor) => void;
  onPointerup?: (event: PointerEvent, threeCadEditor: ThreeCadEditor) => void;
  onClick?: (event: PointerEvent, threeCadEditor: ThreeCadEditor) => void;
};

const defaultOperationMode = Object.freeze<OperationMode>({
  onClick(event, threeCadEditor) {
    const intersectList =
      threeCadEditor.sketchObjectManager.getPointerIntersectList(event);
    if (!Array.isArray(intersectList) || intersectList.length === 0) {
      threeCadEditor.globalStore.setState("selectedObjectList", []);
      return;
    }
    const firstIntersect = intersectList[0];
    firstIntersect.object.onSelect();
    threeCadEditor.globalStore.setState("selectedObjectList", [
      firstIntersect.object,
    ]);
  },
});

export class OperationModeSwitcher {
  private abortController = new AbortController();
  private pressStartTimestamp = 0;

  currentOperationMode: OperationMode = defaultOperationMode;

  constructor(threeCadEditor: ThreeCadEditor) {
    threeCadEditor.canvasElement.addEventListener(
      "pointerdown",
      (event) => {
        if (event.button === 0) {
          this.pressStartTimestamp = Date.now();
        }
        this.currentOperationMode?.onPointerdown?.(event, threeCadEditor);
      },
      { signal: this.abortController.signal },
    );

    threeCadEditor.canvasElement.addEventListener("pointerup", (event) => {
      const pressDuration = Date.now() - this.pressStartTimestamp;
      if (pressDuration < PRESS_MIN_DURATION) {
        this.currentOperationMode?.onClick?.(event, threeCadEditor);
      } else {
        this.currentOperationMode?.onPointerup?.(event, threeCadEditor);
      }
    });
  }

  setOperationMode(operationMode: OperationMode) {
    this.currentOperationMode = operationMode;
  }

  resetOperationMode() {
    this.currentOperationMode = defaultOperationMode;
  }

  dispose() {
    this.abortController.abort();
  }
}
