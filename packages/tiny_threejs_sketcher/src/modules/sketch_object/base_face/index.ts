import { SKETCH_OBJECT_TYPE } from "@src/index";
import { SketchObjectInterface } from "@src/modules/sketch_object/interface";
import {
  BufferGeometry,
  Mesh,
  MeshStandardMaterial,
  Vector3,
  Vector3Tuple,
} from "three";

export class BaseFace
  extends Mesh<BufferGeometry, MeshStandardMaterial>
  implements SketchObjectInterface
{
  override userData: {
    type: typeof SKETCH_OBJECT_TYPE.base_face;
    normal: Vector3Tuple;
  };

  constructor(geometry: BufferGeometry, planeNormal: Vector3) {
    super(
      geometry,
      new MeshStandardMaterial({
        transparent: true,
        opacity: 0.1,
        color: "green", // #todo: move to config
        polygonOffset: true,
        polygonOffsetUnits: -1,
        polygonOffsetFactor: 1,
      }),
    );

    this.userData = {
      type: SKETCH_OBJECT_TYPE.base_face,
      normal: planeNormal.toArray(),
    };
  }

  dispose() {
    this.removeFromParent();
    this.geometry.dispose();
    this.material.dispose();
  }
}
