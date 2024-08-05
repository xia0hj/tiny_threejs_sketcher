import {
  SKETCH_OBJECT_TYPE,
  SketchObject,
  SketchObjectUserData,
} from "@src/modules/sketch_object";
import {
  BufferGeometry,
  Color,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from "three";

export type CreateBasePlaneParameter = {
  parallelTo: "XY" | "XZ" | "YZ";
  offset: number;

  planeLength: number;
  planeColor: number;
  planeSelectColor: number;
  planeOpacity: number;
};

export class BasePlane
  extends Mesh<BufferGeometry, MeshStandardMaterial>
  implements SketchObject
{
  userData: Extract<
    SketchObjectUserData,
    { type: typeof SKETCH_OBJECT_TYPE.basePlane }
  >;

  color: number;
  selectColor: number;

  constructor(createPlaneParameter: CreateBasePlaneParameter) {
    super(
      buildPlaneGeomtry(createPlaneParameter),
      new MeshStandardMaterial({
        vertexColors: false,
        color: createPlaneParameter.planeColor,
        side: DoubleSide,
        transparent: true,
        opacity: createPlaneParameter.planeOpacity,
      }),
    );
    this.userData = {
      type: SKETCH_OBJECT_TYPE.basePlane,
      normal:
        createPlaneParameter.parallelTo === "XY"
          ? { x: 0, y: 0, z: 1 }
          : createPlaneParameter.parallelTo === "XZ"
            ? { x: 0, y: 1, z: 0 }
            : { x: 1, y: 0, z: 0 },
      constant: createPlaneParameter.offset,
    };
    this.color = createPlaneParameter.planeColor;
    this.selectColor = createPlaneParameter.planeSelectColor;
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
  planeLength: planeLength,
}: CreateBasePlaneParameter): BufferGeometry {
  const distance = planeLength / 2;
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
