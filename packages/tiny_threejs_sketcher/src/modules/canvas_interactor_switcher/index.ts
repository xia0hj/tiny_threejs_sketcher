import { CONFIG_VARS } from "@src/constant/config";
import { Module, ModuleGetter } from "@src/modules/module_registry";
import { DefaultViewer } from "@src/modules/canvas_interactor_switcher/default_viewer";
import { Result } from "neverthrow";
import { CanvasInteractorNameUnion, MODULE_NAME } from "@src/constant/enum";

export type CanvasInteractor = {
  readonly name: CanvasInteractorNameUnion;

  enter(
    getModule: ModuleGetter,
    prevInteractor: CanvasInteractorNameUnion,
  ): Result<unknown, Error>;
  exit(getModule: ModuleGetter): Result<unknown, Error>;

  onPointerdown?(event: PointerEvent, getModule: ModuleGetter): void;
  onPointerup?(event: PointerEvent, getModule: ModuleGetter): void;
  onClick?(event: PointerEvent, getModule: ModuleGetter): void;
  onPointermove?(event: PointerEvent, getModule: ModuleGetter): void;
};

export class CanvasInteractorSwitcher implements Module {
  public name = MODULE_NAME.CanvasInteractorSwitcher;

  private getModule: ModuleGetter;
  private _abortController = new AbortController();
  private _pressStartTimestamp = 0;
  private _stack: CanvasInteractor[] = [];

  constructor(getModule: ModuleGetter) {
    this.getModule = getModule;
    this.pushInteractor(new DefaultViewer());
  }

  public startListenCanvas() {
    const { canvasElement } = this.getModule(MODULE_NAME.SceneBuilder);

    canvasElement.addEventListener(
      "pointerdown",
      (event) => {
        if (event.button === 0) {
          this._pressStartTimestamp = Date.now();
        }
        this.getCurInteractor().onPointerdown?.(event, this.getModule);
      },
      { signal: this._abortController.signal },
    );

    canvasElement.addEventListener("pointerup", (event) => {
      const pressDuration = Date.now() - this._pressStartTimestamp;
      if (pressDuration < CONFIG_VARS.pressMinDuration) {
        this.getCurInteractor().onClick?.(event, this.getModule);
      } else {
        this.getCurInteractor().onPointerup?.(event, this.getModule);
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
        this.getCurInteractor().onPointermove?.(event, this.getModule);
        throttleLock = false;
      });
    });
  }

  public pushInteractor<CI extends CanvasInteractor>(canvasInteractor: CI) {
    const enterResult = canvasInteractor.enter(
      this.getModule,
      this.getCurInteractor().name,
    ) as ReturnType<CI["enter"]>;
    if (enterResult.isOk()) {
      this._stack.push(canvasInteractor);
    }
    return enterResult;
  }

  public popInteractor() {
    const interactor = this.getCurInteractor();
    const exitResult = interactor.exit(this.getModule);
    if (exitResult.isOk()) {
      this._stack.pop();
    }
    return exitResult;
  }

  public getCurInteractor() {
    return this._stack.at(-1)!;
  }

  public dispose() {
    this._abortController.abort();
    this._stack = [];
  }
}
