import { InstanceContext } from "@src/instance_context";
import { SketchObject } from "@src/sketch_object/type";
import { Box3, Group, Scene, Sphere } from "three";

export class SketchObjectManager {
  sketchObjectGroup: Group;
  context: InstanceContext;

  constructor(context: InstanceContext, scene: Scene) {
    this.context = context;

    this.sketchObjectGroup = new Group();
    scene.add(this.sketchObjectGroup);
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
}
