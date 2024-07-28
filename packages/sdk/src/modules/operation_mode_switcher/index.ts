import { MODULE_NAME, Module, ModuleGetter, ModuleNameMap } from "@src/modules";

export type OperationMode = {
  onPointerdown?: (event: PointerEvent, getModule: ModuleGetter) => void;
  onPointerup?: (event: PointerEvent, getModule: ModuleGetter) => void;
  onClick?: (event: PointerEvent, getModule: ModuleGetter) => void;
  onPointermove?: (event: PointerEvent, getModule: ModuleGetter) => void;

  dispose?: () => void;
};

class DefaultOperationMode implements OperationMode {
  onClick(event: PointerEvent, getModule: ModuleGetter) {
    const sketchObjectManager = getModule(MODULE_NAME.SketchObjectManager);
    const globalStore = getModule(MODULE_NAME.GlobalStore);

    const intersectList = sketchObjectManager.getPointerIntersectList(event);
    if (!Array.isArray(intersectList) || intersectList.length === 0) {
      globalStore.setState({ selectedObjects: [] });
      return;
    }
    const firstIntersect = intersectList[0];
    firstIntersect.object.onSelect?.();
    console.log("选中了", firstIntersect.object);
    globalStore.setState({
      selectedObjects: [firstIntersect.object],
    });
  }
}

export class OperationModeSwitcher implements Module {
  name = MODULE_NAME.OperationModeSwitcher;
  getModule: ModuleGetter;

  abortController = new AbortController();

  curOperationMode: OperationMode = new DefaultOperationMode();

  #pressStartTimestamp = 0;

  constructor(getModule: ModuleGetter) {
    this.getModule = getModule;
  }

  startListenCanvas() {
    const {canvasElement} = this.getModule(MODULE_NAME.SceneBuilder);
    const { pressMinDuration } = this.getModule(MODULE_NAME.Configurator).getOptions()

    canvasElement.addEventListener(
      "pointerdown",
      (event) => {
        if (event.button === 0) {
          this.#pressStartTimestamp = Date.now();
        }
        this.curOperationMode?.onPointerdown?.(event, this.getModule);
      },
      { signal: this.abortController.signal },
    );

    canvasElement.addEventListener("pointerup", (event) => {
      const pressDuration = Date.now() - this.#pressStartTimestamp;
      if (pressDuration < pressMinDuration) {
        this.curOperationMode?.onClick?.(event, this.getModule);
      } else {
        this.curOperationMode?.onPointerup?.(event, this.getModule);
      }
    });

    canvasElement.addEventListener("pointermove", (event) => {
      this.curOperationMode?.onPointermove?.(event, this.getModule);
    });
  }

  dispose() {
    this.abortController.abort();
  }
}
