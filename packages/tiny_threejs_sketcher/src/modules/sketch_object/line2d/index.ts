import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { BasePoint } from "@src/modules/sketch_object/base_point";
import { SketchObjectInterface } from "@src/modules/sketch_object/type";
import {
  BufferGeometry,
  Line,
  LineBasicMaterial,
  Vector3,
  Vector3Tuple,
} from "three";

export class Line2d
  extends Line<BufferGeometry, LineBasicMaterial>
  implements SketchObjectInterface
{
  override userData = {
    type: SKETCH_OBJECT_TYPE.line2d,
    startPosition: [] as unknown as Vector3Tuple,
    endPosition: [] as unknown as Vector3Tuple,
  };

  startPoint = new BasePoint(true);
  endPoint = new BasePoint(true);

  constructor() {
    super();
    this.startPoint.connectObject(this.id, (startPosition) =>
      this.updatePosition(startPosition, this.endPoint.position),
    );
    this.endPoint.connectObject(this.id, (endPosition) =>
      this.updatePosition(this.startPoint.position, endPosition),
    );
  }

  updatePosition(startPosition: Vector3, endPosition: Vector3) {
    this.geometry.setFromPoints([startPosition, endPosition]);
    this.startPoint.updatePositionPassively(startPosition, this.id);
    this.endPoint.updatePositionPassively(endPosition, this.id);
    this.userData.startPosition = startPosition.toArray();
    this.userData.endPosition = endPosition.toArray();
  }

  dispose() {
    this.startPoint.disconnectObject(this.id);
    this.endPoint.disconnectObject(this.id);
    this.geometry.dispose();
    this.material.dispose();
  }
}
