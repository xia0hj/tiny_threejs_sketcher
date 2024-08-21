import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { SketchObjectInterface } from "@src/modules/sketch_object/type";
import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Points,
  PointsMaterial,
  Vector3,
} from "three";

export class BasePoint
  extends Points<BufferGeometry, PointsMaterial>
  implements SketchObjectInterface
{
  override userData = {
    type: SKETCH_OBJECT_TYPE.base_point,
  };

  connectedObjects: Map<number, ((position: Vector3) => void) | undefined> =
    new Map();

  isConnectable = false;

  constructor(isConnectable?: boolean) {
    const pointGeometry = new BufferGeometry().setAttribute(
      "position",
      new BufferAttribute(new Float32Array([0, 0, 0]), 3),
    );
    const pointMaterial = new PointsMaterial({ side: DoubleSide });
    super(pointGeometry, pointMaterial);
    this.isConnectable = isConnectable ?? false;
  }

  updatePositionPassively(position: Vector3, noNotifyId: number) {
    this.position.copy(position);
    for (const [objectId, onPositionChange] of this.connectedObjects.entries()) {
      if (objectId !== noNotifyId) {
        onPositionChange?.(position);
      }
    }
  }

  updatePosition(position: Vector3) {
    this.position.copy(position);
    for (const onPositionChange of this.connectedObjects.values()) {
      onPositionChange?.(position);
    }
  }

  connectObject(
    objectId: number,
    onPositionChange?: (position: Vector3) => void,
  ) {
    if (this.isConnectable && this.connectedObjects.size === 1) {
      throw new Error("this point can not connect other object");
    }
    this.connectedObjects.set(objectId, onPositionChange);
  }

  disconnectObject(objId: number) {
    this.connectedObjects.delete(objId);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.connectedObjects.clear();
  }
}
