import {
  MODULE_NAME,
  Module,
  ModuleGetter,
  ModuleNameMap,
} from "@src/modules";

export type OperationMode = {
  onPointerdown?: (event: PointerEvent) => void;
  onPointerup?: (event: PointerEvent) => void;
  onClick?: (event: PointerEvent) => void;
  onPointermove?: (event: PointerEvent) => void;

  dispose?: () => void;
};

export class OperationModeSwitcher implements Module {
  name = MODULE_NAME.OperationModeSwitcher;
  getModule!: ModuleGetter;
  install(getModule: ModuleGetter) {
    this.getModule = getModule;
  }

  startListenCanvas(canvasElement: HTMLCanvasElement) {
    
  }

  dispose() {}
}
