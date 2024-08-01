import { MODULE_NAME, Module, ModuleGetter, ModuleNameMap } from "@src/modules";
import { SketchObject } from "@src/modules/sketch_object";
import { ValueOf, checkIsSketchObject } from "@src/utils";
import { Group, Object3D, Plane, Raycaster, Vector2, Vector3 } from "three";

export class SketchObjectManager implements Module {
  name = MODULE_NAME.SketchObjectManager;
  getModule: ModuleGetter;
  sketchObjectGroup = buildSketchObjectGroup();
  previewGroup = new Group();
  raycaster: Raycaster = new Raycaster();

  constructor(getModule: ModuleGetter) {
    this.getModule = getModule;
    const sceneBuilder = getModule(MODULE_NAME.SceneBuilder);
    sceneBuilder.scene.add(this.sketchObjectGroup);
    sceneBuilder.scene.add(this.previewGroup);
  }

  add(obj: SketchObject) {
    this.sketchObjectGroup.add(obj);
    this.refreshTree();
  }

  refreshTree() {
    const treeRoot = bfs(this.sketchObjectGroup);
    this.getModule(MODULE_NAME.StateStore).setState({
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
    const { camera, canvasElement } = this.getModule(MODULE_NAME.SceneBuilder);
    this.raycaster.setFromCamera(
      new Vector2(
        (event.offsetX / canvasElement.clientWidth) * 2 - 1,
        -(event.offsetY / canvasElement.clientHeight) * 2 + 1,
      ),
      camera,
    );
    return this.raycaster.intersectObjects<SketchObject>(
      this.sketchObjectGroup.children,
    );
  }

  public getIntersectPointOnPlane(event: PointerEvent, plane: Plane) {
    const { camera, canvasElement } = this.getModule(MODULE_NAME.SceneBuilder);
    this.raycaster.setFromCamera(
      new Vector2(
        (event.offsetX / canvasElement.width) * 2 - 1,
        -(event.offsetY / canvasElement.height) * 2 + 1,
      ),
      camera,
    );
    return this.raycaster.ray.intersectPlane(plane, new Vector3());
  }

  dispose() {
    this.sketchObjectGroup.removeFromParent();
    this.sketchObjectGroup.clear();
    this.previewGroup.removeFromParent();
    this.previewGroup.clear();
  }
}

export type SketchObjectTreeItem = {
  id: number;
  obj: SketchObject;
  children: Map<number, SketchObjectTreeItem>;
};

function buildSketchObjectGroup(): Group {
  const sketchObjectGroup = new Group();
  sketchObjectGroup.userData.type = "ROOT";
  return sketchObjectGroup;
}