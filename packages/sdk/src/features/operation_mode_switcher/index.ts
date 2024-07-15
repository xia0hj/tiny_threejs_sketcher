import { PRESS_MIN_DURATION } from "@src/constant/config";
import { ThreeCadEditor } from "@src/three_cad_editor";

export type OperationMode = {
  onPointerdown?: (event: PointerEvent, threeCadEditor: ThreeCadEditor) => void;
  onPointerup?: (event: PointerEvent, threeCadEditor: ThreeCadEditor) => void;
  onClick?: (event: PointerEvent, threeCadEditor: ThreeCadEditor) => void;
  onPointermove?: (event: PointerEvent, threeCadEditor: ThreeCadEditor) => void;
};

class DefaultOperationMode implements OperationMode {
  onClick(event: PointerEvent, threeCadEditor: ThreeCadEditor) {
    const intersectList =
      threeCadEditor.sketchObjectManager.getPointerIntersectList(event);
    if (!Array.isArray(intersectList) || intersectList.length === 0) {
      threeCadEditor.globalStore.setState({selectedObjectList: []});
      return;
    }
    const firstIntersect = intersectList[0];
    firstIntersect.object.onSelect?.();
    console.log("选中了", firstIntersect.object);
    threeCadEditor.globalStore.setState({
      selectedObjectList: [firstIntersect.object]
    })
  }
}

class Sketcher2dOperationMode implements OperationMode {}

export class OperationModeSwitcher {
  private threeCadEditor: ThreeCadEditor;
  private abortController = new AbortController();
  private pressStartTimestamp = 0;

  currentOperationMode: OperationMode = new DefaultOperationMode();

  constructor(threeCadEditor: ThreeCadEditor) {
    this.threeCadEditor = threeCadEditor;
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

    threeCadEditor.canvasElement.addEventListener("pointermove", (event) => {
      this.currentOperationMode?.onPointermove?.(event, threeCadEditor);
    });
  }

  setOperationMode(operationMode: OperationMode) {
    this.currentOperationMode = operationMode;
  }

  resetOperationMode() {
    if (
      this.threeCadEditor.globalStore.getState().sketcher2dBasePlane !==
      undefined
    ) {
      this.currentOperationMode = new Sketcher2dOperationMode();
    } else {
      this.currentOperationMode = new DefaultOperationMode();
    }

    this.threeCadEditor.orbitControls.enabled = true;
  }

  dispose() {
    this.abortController.abort();
  }
}
