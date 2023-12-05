import { SceneTool } from "@/common/type";
import { getGlobalState } from "@/feature/global_state/zustand_impl";
import { SceneObject } from "@/feature/sketch_object";
import { Camera, Intersection, Raycaster, Vector2 } from "three";

export class SceneController implements SceneTool {
  raycaster: Raycaster;
  onPointerMove: (event: MouseEvent) => void;

  pointerPosition: Vector2;

  isActive = false;

  lastIntersectObjectList: Intersection<SceneObject>[] = [];

  init() {
    this.pointerPosition = new Vector2();
    this.raycaster = new Raycaster();
    this.onPointerMove = (event) => {
      this.pointerPosition.set(
        (event.offsetX / window.innerWidth) * 2 - 1,
        -(event.offsetY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", this.onPointerMove);
    this.isActive = true;
  }

  highlightHoverObject() {
    if (!this.isActive) {
      return;
    }
    const sceneViewer = getGlobalState("sceneViewer")
    this.raycaster?.setFromCamera(
      this.pointerPosition,
      sceneViewer?.camera as Camera,
    );
    const allSceneObject = sceneViewer?.sceneObjectGroup.children;
    if (!Array.isArray(allSceneObject)) {
      return;
    }
    const intersectObjectList =
      this.raycaster.intersectObjects<SceneObject>(allSceneObject);

    const removedObjectList = this.lastIntersectObjectList.filter(
      (lastIntersectObject) =>
        intersectObjectList.findIndex(
          (intersectObject) =>
            intersectObject.object === lastIntersectObject.object,
        ) === -1,
    );

    const newHoverObjectList = intersectObjectList.filter(
      (intersectObject) =>
        this.lastIntersectObjectList.findIndex(
          (lastIntersectObject) =>
            lastIntersectObject.object === intersectObject.object,
        ) === -1,
    );

    removedObjectList.forEach((removedObject) =>
      removedObject.object.onMouseLeave(),
    );
    newHoverObjectList.forEach((newHoverObject) =>
      newHoverObject.object.onMouseEnter(),
    );

    this.lastIntersectObjectList = intersectObjectList;
  }

  dispose() {
    window.removeEventListener("pointermove", this.onPointerMove);
    this.isActive = false;
  }
}
