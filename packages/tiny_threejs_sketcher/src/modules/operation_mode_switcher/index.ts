import {
  MODULE_NAME,
  Module,
  ModuleGetter,
} from "@src/modules/module_registry";
import { DefaultOperationMode } from "@src/modules/operation_mode_switcher/operation_modes/default_operation_mode";

export type OperationMode = {
  onPointerdown?: (event: PointerEvent, getModule: ModuleGetter) => void;
  onPointerup?: (event: PointerEvent, getModule: ModuleGetter) => void;
  onClick?: (event: PointerEvent, getModule: ModuleGetter) => void;
  onPointermove?: (event: PointerEvent, getModule: ModuleGetter) => void;

  enable?: (getModule: ModuleGetter) => void;
  dispose?: () => void;
};

export class OperationModeSwitcher implements Module {
  public name = MODULE_NAME.OperationModeSwitcher;
  private getModule: ModuleGetter;

  private abortController = new AbortController();

  public curOperationMode: OperationMode = new DefaultOperationMode();

  #pressStartTimestamp = 0;

  constructor(getModule: ModuleGetter) {
    this.getModule = getModule;
  }

  public startListenCanvas() {
    const { canvasElement } = this.getModule(MODULE_NAME.SceneBuilder);
    const { pressMinDuration } = this.getModule(
      MODULE_NAME.Configurator,
    ).getOptions();

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

    // #todo: 需要节流避免多次触发
    canvasElement.addEventListener("pointermove", (event) => {
      this.curOperationMode?.onPointermove?.(event, this.getModule);
    });
  }

  public setOperationMode(operationMode: OperationMode) {
    this.curOperationMode.dispose?.();
    operationMode.enable?.(this.getModule);
    this.curOperationMode = operationMode;
  }

  public dispose() {
    this.abortController.abort();
  }
}
