import { SketchObject } from "@src/features/sketch_object/type";
import { ThreeCadEditor } from "@src/three_cad_editor";
import { checkIsSketchObject } from "@src/util";
import { Group, Object3D, Raycaster, Vector2 } from "three";

export type SketchObjectTreeItem = {
  id: number;
  obj: SketchObject;
  children: Map<number, SketchObjectTreeItem>;
};

export class SketchObjectManager {
  sketchObjectGroup: Group = buildSketchObjectGroup();
  raycaster: Raycaster = new Raycaster();

  threeCadEditor: ThreeCadEditor;

  constructor(threeCadEditor: ThreeCadEditor) {
    this.threeCadEditor = threeCadEditor;
    this.refreshTree();
  }

  add(sketchObject: SketchObject) {
    this.sketchObjectGroup.add(sketchObject);
    this.refreshTree();
  }

  refreshTree() {
    const treeRoot = bfs(this.sketchObjectGroup);

    this.threeCadEditor.globalStore.setState("sketchObjectTree", treeRoot);

    function bfs(obj: Object3D) {
      if (!checkIsSketchObject(obj)) {
        return;
      }
      const treeItem: SketchObjectTreeItem = {
        id: obj.id,
        obj,
        children: new Map(),
      };
      obj.children.forEach((childObj) => {
        const childItem = bfs(childObj);
        if (childItem != null) {
          treeItem.children.set(childItem.id, childItem);
        }
      });
      return treeItem;
    }
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
    this.raycaster.setFromCamera(position, this.threeCadEditor.camera);
    return this.raycaster.intersectObjects<SketchObject>(
      this.sketchObjectGroup.children,
    );
  }

  dispose() {
    this.sketchObjectGroup.removeFromParent();
  }
}

function buildSketchObjectGroup() {
  const sketchObjectGroup = new Group();
  sketchObjectGroup.userData.type = "ROOT";
  return sketchObjectGroup;
}
