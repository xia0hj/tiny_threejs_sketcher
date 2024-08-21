import { SketchObjectInterface } from "@src/modules/sketch_object/type";
import { BasePoint } from "@src/modules/sketch_object/base_point";
import { BufferGeometry, Line, LineBasicMaterial, Path, Vector3 } from "three";
import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";

export class Circle2d
  extends Line<BufferGeometry, LineBasicMaterial>
  implements SketchObjectInterface
{
  override userData;

  center: BasePoint;

  constructor(normal: Vector3) {
    super();
    this.center = new BasePoint();
    this.center.connectObject(this.id, (position) => {
      this.position.copy(position);
      this.userData.center = position.toArray();
    });

    this.userData = {
      type: SKETCH_OBJECT_TYPE.circle2d,
      center: this.center.position.toArray(),
      radius: 1,
    };
  }

  updateCenter(centerPosition: Vector3) {
    this.center.updatePosition(centerPosition);
    this.position.copy(centerPosition);
    this.userData.center = centerPosition.toArray();
  }

  updateRadius(radius: number) {
    this.userData.radius = radius;
    this.geometry.dispose();
    const ringPath = new Path()
      .absarc(0, 0, radius, 0, Math.PI)
      .getSpacedPoints();
    this.geometry = new BufferGeometry().setFromPoints(ringPath);
  }

  dispose() {
    this.removeFromParent();
    this.center.dispose();
    this.geometry.dispose();
    this.material.dispose();
  }
}
