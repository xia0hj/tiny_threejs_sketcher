import { SKETCH_OBJECT_TYPE } from "@src/index";
import { SketchObjectInterface } from "@src/modules/sketch_object/interface";
import { BufferGeometry, Mesh, MeshStandardMaterial } from "three";

export class BaseFace
  extends Mesh<BufferGeometry, MeshStandardMaterial>
  implements SketchObjectInterface
{
  userData: {
    type: typeof SKETCH_OBJECT_TYPE.base_face;
  };

  constructor(geometry: BufferGeometry) {
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
    };
  }

  dispose() {
    this.removeFromParent();
    this.geometry.dispose();
    this.material.dispose();
  }
}
