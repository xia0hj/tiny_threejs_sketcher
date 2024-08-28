import { CONFIG_VARS } from "@src/constant/config";
import {
  MODULE_NAME,
  Module,
  ModuleGetter,
} from "@src/modules/module_registry";
import { DefaultCanvasInteractor } from "@src/modules/operation_mode_switcher/default_operation_mode";

export type CanvasInteractor = {
  onPointerdown?(event: PointerEvent, getModule: ModuleGetter): void;
  onPointerup?(event: PointerEvent, getModule: ModuleGetter): void;
  onClick?(event: PointerEvent, getModule: ModuleGetter): void;
  onPointermove?(event: PointerEvent, getModule: ModuleGetter): void;
  dispose?(): void;
};

export class CanvasInteractorSwitcher implements Module {
  public name = MODULE_NAME.CanvasInteractorSwitcher;
  private getModule: ModuleGetter;

  private abortController = new AbortController();

  public curOperationMode: CanvasInteractor = new DefaultCanvasInteractor();

  private _pressStartTimestamp = 0;

  constructor(getModule: ModuleGetter) {
    this.getModule = getModule;
  }

  public startListenCanvas() {
    const { canvasElement } = this.getModule(MODULE_NAME.SceneBuilder);

    canvasElement.addEventListener(
      "pointerdown",
      (event) => {
        if (event.button === 0) {
          this._pressStartTimestamp = Date.now();
        }
        this.curOperationMode?.onPointerdown?.(event, this.getModule);
      },
      { signal: this.abortController.signal },
    );

    canvasElement.addEventListener("pointerup", (event) => {
      const pressDuration = Date.now() - this._pressStartTimestamp;
      if (pressDuration < CONFIG_VARS.pressMinDuration) {
        this.curOperationMode?.onClick?.(event, this.getModule);
      } else {
        this.curOperationMode?.onPointerup?.(event, this.getModule);
      }
    });

    /** 用 requestAnimationFrame 实现 pointermove 事件的节流 */
    let throttleLock = false;
    canvasElement.addEventListener("pointermove", (event) => {
      if (throttleLock) {
        return;
      }
      throttleLock = true;
      requestAnimationFrame(() => {
        this.curOperationMode?.onPointermove?.(event, this.getModule);
        throttleLock = false;
      });
    });
  }

  public setOperationMode(operationMode: CanvasInteractor) {
    this.curOperationMode.dispose?.();
    this.curOperationMode = operationMode;
  }

  public dispose() {
    this.abortController.abort();
  }
}
