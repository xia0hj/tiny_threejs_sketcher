import { ThreeCadEditor } from "@src/three_cad_editor/three_cad_editor"

export type InputEventHandler = {
  onPointermove?: (event:MouseEvent, rootRenderer:ThreeCadEditor)=>void;
  onPointerdown?: (event:MouseEvent, rootRenderer:ThreeCadEditor)=>void;
}