import { CONFIG_VARS } from "@src/constant/config";
import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { SketchObjectInterface } from "@src/modules/sketch_object/interface";
import {
  BufferGeometry,
  Color,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  Vector3,
  Vector3Tuple,
} from "three";

export type CreateBasePlaneParameter = {
  parallelTo: "XY" | "XZ" | "YZ";
  offset: number;
};

export class BasePlane
  extends Mesh<BufferGeometry, MeshStandardMaterial>
  implements SketchObjectInterface
{
  override userData: {
    type: typeof SKETCH_OBJECT_TYPE.base_plane;
    normal: Vector3Tuple;
    constant: number;
  };

  color: number;
  selectColor: number;

  constructor(createPlaneParameter: CreateBasePlaneParameter) {
    super(
      buildPlaneGeomtry(createPlaneParameter),
      new MeshStandardMaterial({
        vertexColors: false,
        color: CONFIG_VARS.planeColor,
        side: DoubleSide,
        transparent: true,
        opacity: CONFIG_VARS.planeOpacity,
      }),
    );
    this.userData = {
      type: SKETCH_OBJECT_TYPE.base_plane,
      normal:
        createPlaneParameter.parallelTo === "XY"
          ? [0, 0, 1]
          : createPlaneParameter.parallelTo === "XZ"
            ? [0, 1, 0]
            : [1, 0, 0],
      constant: createPlaneParameter.offset,
    };
    this.color = CONFIG_VARS.planeColor;
    this.selectColor = CONFIG_VARS.planeSelectColor;
  }

  onSelect() {
    this.material.color = new Color(this.selectColor);
  }

  onDeselect() {
    this.material.color = new Color(this.color);
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}

function buildPlaneGeomtry({
  parallelTo,
  offset,
}: CreateBasePlaneParameter): BufferGeometry {
  const distance = CONFIG_VARS.planeLength / 2;
  if (parallelTo === "XY") {
    const minPosition = new Vector3(-distance, -distance, offset);
    const maxPosition = new Vector3(distance, distance, offset);
    return new BufferGeometry().setFromPoints([
      new Vector3().copy(minPosition), // 左下
      new Vector3(maxPosition.x, minPosition.y, offset), // 右下
      new Vector3().copy(maxPosition), // 右上
      new Vector3().copy(maxPosition), // 右上
      new Vector3(minPosition.x, maxPosition.y, offset), // 左上
      new Vector3().copy(minPosition), // 左下
    ]);
  } else if (parallelTo === "XZ") {
    const minPosition = new Vector3(-distance, offset, -distance);
    const maxPosition = new Vector3(distance, offset, distance);
    return new BufferGeometry().setFromPoints([
      new Vector3().copy(minPosition), // 左下
      new Vector3(maxPosition.x, offset, minPosition.z), // 右下
      new Vector3().copy(maxPosition), // 右上
      new Vector3().copy(maxPosition), // 右上
      new Vector3(minPosition.x, offset, maxPosition.z), // 左上
      new Vector3().copy(minPosition), // 左下
    ]);
  } else {
    const minPosition = new Vector3(offset, -distance, -distance);
    const maxPosition = new Vector3(offset, distance, distance);
    return new BufferGeometry().setFromPoints([
      new Vector3().copy(minPosition), // 左下
      new Vector3(offset, maxPosition.y, minPosition.z), // 右下
      new Vector3().copy(maxPosition), // 右上
      new Vector3().copy(maxPosition), // 右上
      new Vector3(offset, minPosition.y, maxPosition.z), // 左上
      new Vector3().copy(minPosition), // 左下
    ]);
  }
}
