import { InstanceContext } from "@src/instance_context";
import { SketchObject } from "@src/sketch_object/interface";
import { Box3, Group, Raycaster, Scene, Sphere, Vector2 } from "three";

export class SketchObjectManager {
  sketchObjectGroup: Group;
  context: InstanceContext;
  raycaster: Raycaster;
  eventController: AbortController;
  selectedObjectList: SketchObject[] = [];

  constructor(context: InstanceContext, scene: Scene) {
    this.context = context;
    this.raycaster = new Raycaster();
    this.sketchObjectGroup = new Group();
    scene.add(this.sketchObjectGroup);
    this.eventController = new AbortController();
    context.sceneRenderer.canvasElement.addEventListener(
      "pointerup",
      (event) => {
        this.onSelectObject(event);
      },
      { signal: this.eventController.signal },
    );
  }

  public addSketchObject(object: SketchObject) {
    this.sketchObjectGroup.add(object);
    this.context.sceneRenderer.fitCameraToScene();
  }

  public getBoundingSphere() {
    if (this.sketchObjectGroup.children.length === 0) {
      return null;
    }

    return new Box3()
      .setFromObject(this.sketchObjectGroup)
      .getBoundingSphere(new Sphere());
  }

  public dispose() {
    this.eventController.abort();
  }

  private onSelectObject(event: MouseEvent) {
    if (this.sketchObjectGroup.children.length === 0 || event.button !== 0) {
      return;
    }
    const canvasElement = this.context.sceneRenderer.canvasElement;
    const position = new Vector2(
      (event.offsetX / canvasElement.clientWidth) * 2 - 1,
      -(event.offsetY / canvasElement.clientHeight) * 2 + 1,
    );
    this.raycaster.setFromCamera(
      position,
      this.context.sceneRenderer.currentCamera,
    );
    const [firstIntersection] = this.raycaster.intersectObjects<SketchObject>(
      this.sketchObjectGroup.children,
    );
    if (firstIntersection == null) {
      return;
    }
    if (!event.ctrlKey) {
      this.selectedObjectList = [];
    }
    firstIntersection.object.onSelect();
    this.selectedObjectList.push(firstIntersection.object);
  }
}
