import { CONFIG_VARS } from "@src/constant/config";
import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { SketchObjectInterface } from "@src/modules/sketch_object/interface";
import {
  BufferGeometry,
  DoubleSide,
  Points,
  PointsMaterial,
  Vector3,
} from "three";

export type BasePointProps = {
  /** @default false */
  isConnectable?: boolean;
};

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

  constructor(props: BasePointProps = {}) {
    const pointGeometry = new BufferGeometry().setFromPoints([new Vector3()]);
    const pointMaterial = new PointsMaterial({
      side: DoubleSide,
      size: CONFIG_VARS.basePointSize,
      sizeAttenuation: false,
    });
    super(pointGeometry, pointMaterial);
    this.isConnectable = props.isConnectable ?? false;
  }

  updatePositionPassively(position: Vector3, noNotifyId: number) {
    this.position.copy(position);
    for (const [
      objectId,
      onPositionChange,
    ] of this.connectedObjects.entries()) {
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
