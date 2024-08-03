import {
  SKETCH_OBJECT_TYPE,
  SketchObject,
  SketchObjectUserData,
} from "@src/modules/sketch_object";
import { Line, Material, Vector3 } from "three";

export class Line2d extends Line implements SketchObject {
  userData: Extract<
    SketchObjectUserData,
    { type: typeof SKETCH_OBJECT_TYPE.line2d }
  >;

  constructor() {
    super();
    this.userData = {
      type: SKETCH_OBJECT_TYPE.line2d,
      startPoint: { x: 0, y: 0, z: 0 },
      endPoint: { x: 0, y: 0, z: 0 },
    };
  }

  updatePosition(startPoint: Vector3, endPoint: Vector3) {
    this.geometry.setFromPoints([startPoint, endPoint]);
    this.userData.startPoint = {
      x: startPoint.x,
      y: startPoint.y,
      z: startPoint.z,
    };
    this.userData.endPoint = { x: endPoint.x, y: endPoint.y, z: endPoint.z };
  }

  dispose() {
    this.geometry.dispose();
    (this.material as Material).dispose();
  }
}
