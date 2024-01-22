import { RootRenderer } from "@src/root_renderer";
import { ValueOf } from "@src/util";
import { Raycaster } from "three";

export const PointerMode = {
  default: "PointerMode.default",
} as const;

const PointerButton = {
  left: 0,
  right: 1,
};

export class PointerEventHandler {
  public pointerMode: ValueOf<typeof PointerMode> = PointerMode.default;

  private rootRenderer: RootRenderer;
  private raycaster: Raycaster = new Raycaster();
  private abortController: AbortController = new AbortController();

  constructor(rootRenderer: RootRenderer) {
    this.rootRenderer = rootRenderer;

    rootRenderer.canvasElement.addEventListener(
      "pointerdown",
      (event) => {
        if (
          this.pointerMode === PointerMode.default &&
          event.button === PointerButton.left
        ) {
          this.rootRenderer.sketchObjectManager.selectObject(event);
        }
      },
      {
        signal: this.abortController.signal,
      },
    );
  }

  public dispose() {
    this.abortController.abort();
  }
}
