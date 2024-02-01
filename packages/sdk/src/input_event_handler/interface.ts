import { RootRenderer } from "@src/root_renderer"

export type InputEventHandler = {
  onPointermove?: (event:MouseEvent, rootRenderer:RootRenderer)=>void;
  onPointerdown?: (event:MouseEvent, rootRenderer:RootRenderer)=>void;
}