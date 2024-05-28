import { SketchObject } from "@src/features/sketch_object/type";
import { ThreeCadEditor } from "@src/three_cad_editor";
import { Group, Raycaster, Vector2 } from "three";

export class SketchObjectManager {
  sketchObjectGroup: Group = new Group();
  raycaster: Raycaster = new Raycaster()

  threeCadEditor: ThreeCadEditor;


  constructor(threeCadEditor: ThreeCadEditor) {
    this.threeCadEditor = threeCadEditor;

    threeCadEditor.scene.add(this.sketchObjectGroup);
  }

  add(sketchObject: SketchObject) {
    this.sketchObjectGroup.add(sketchObject);
  }

  public getPointerIntersectList(event: PointerEvent) {
    if (this.sketchObjectGroup.children.length === 0) {
      return;
    }
    const canvasElement = this.threeCadEditor.canvasElement;
    const position = new Vector2(
      (event.offsetX / canvasElement.clientWidth) * 2 - 1,
      -(event.offsetY / canvasElement.clientHeight) * 2 + 1,
    );
    this.raycaster.setFromCamera(
      position,
      this.threeCadEditor.camera,
    );
    return this.raycaster.intersectObjects<SketchObject>(
      this.sketchObjectGroup.children,
    );
  }

  dispose() {
    this.sketchObjectGroup.removeFromParent();
  }
}
