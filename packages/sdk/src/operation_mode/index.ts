import { ThreeCadEditor } from "@src/three_cad_editor"

export type OperationMode = {
  onPointermove?: (event:MouseEvent, threeCadEditor:ThreeCadEditor)=>void;
  onPointerdown?: (event:MouseEvent, threeCadEditor:ThreeCadEditor)=>void;
}

export class DefaultOperationMode implements OperationMode {
  onPointerdown(event: MouseEvent, threeCadEditor: ThreeCadEditor){
    
  }
}