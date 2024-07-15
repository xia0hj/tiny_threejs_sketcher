import { SketchObject } from "@src/features/sketch_object/type";
import { ThreeCadEditor } from "@src/three_cad_editor";
import { checkIsSketchObject } from "@src/util";
import {
  BufferGeometry,
  Group,
  Line,
  Object3D,
  Plane,
  Raycaster,
  Vector2,
  Vector3,
} from "three";

export type SketchObjectTreeItem = {
  id: number;
  obj: SketchObject;
  children: Map<number, SketchObjectTreeItem>;
};

export class SketchObjectManager {
  sketchObjectGroup: Group = buildSketchObjectGroup();
  previewGroup = new Group();
  raycaster: Raycaster = new Raycaster();

  threeCadEditor: ThreeCadEditor;

  constructor(threeCadEditor: ThreeCadEditor) {
    this.threeCadEditor = threeCadEditor;
    threeCadEditor.scene.add(this.sketchObjectGroup);
    this.refreshTree();

    this.sketchObjectGroup.add(
      new Line(
        new BufferGeometry().setFromPoints([
          new Vector3(1, 1, 1),
          new Vector3(5, 5, 5),
        ]),
      ),
    );
  }

  add(sketchObject: SketchObject) {
    this.sketchObjectGroup.add(sketchObject);
    this.refreshTree();
  }

  addObject2d(obj: SketchObject) {
    const plane =
      this.threeCadEditor.globalStore.getState().sketcher2dBasePlane;
    if (plane) {
      plane.add(obj);
      this.refreshTree();
    }
  }

  addPreviewObject(obj: Object3D) {
    this.previewGroup.add(obj);
  }

  refreshTree() {
    const treeRoot = bfs(this.sketchObjectGroup);

    this.threeCadEditor.globalStore.setState({
      sketchObjectTreeRoot: treeRoot,
    });

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

  public getIntersectPointOnPlane(event: PointerEvent, plane: Plane) {
    const canvasElement = this.threeCadEditor.canvasElement;
    this.raycaster.setFromCamera(
      new Vector2(
        (event.offsetX / canvasElement.width) * 2 - 1,
        -(event.offsetY / canvasElement.height) * 2 + 1,
      ),
      this.threeCadEditor.camera,
    );
    return this.raycaster.ray.intersectPlane(plane, new Vector3());
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
