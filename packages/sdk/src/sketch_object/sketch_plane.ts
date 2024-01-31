import { Command } from "@src/command_system";
import {
  SCENE_PLANE_COLOR,
  SCENE_PLANE_LENGTH,
  SCENE_PLANE_OPACITY,
} from "@src/constant/config";
import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import {
  SketchObject,
  SketchObjectUserData,
} from "@src/sketch_object/type";
import {
  BufferGeometry,
  DoubleSide,
  MeshStandardMaterial,
  Vector3,
} from "three";

export type CreatePlaneParameter = {
  parallelTo: "XY" | "XZ" | "YZ";
  offset: number;
};
export const CommandCreatePlane: Command<"create_plane", CreatePlaneParameter> =
  {
    key: "create_plane",
    modification: true,
    run(context, parameter) {
      const plane = new SketchPlane(parameter);
      context.sketchObjectManager.addSketchObject(plane);
      return {
        key: this.key,
        parameter: { ...parameter },
        rollback() {
          plane.removeFromParent();
          plane.dispose();
        },
      };
    },
  } as const;

export class SketchPlane extends SketchObject {
  userData: SketchObjectUserData
  constructor(createPlaneParameter: CreatePlaneParameter) {
    super(
      buildPlaneGeomtry(createPlaneParameter, SCENE_PLANE_LENGTH),
      new MeshStandardMaterial({
        vertexColors: false,
        color: SCENE_PLANE_COLOR,
        side: DoubleSide,
        transparent: true,
        opacity: SCENE_PLANE_OPACITY,
      }),
    );
    this.userData = {
      type: SKETCH_OBJECT_TYPE.plane,
      normal: createPlaneParameter.parallelTo === 'XY'
        ? {x:0,y:0,z:1}
        : createPlaneParameter.parallelTo === 'XZ'
          ? {x:0,y:1,z:0}
          : {x:1,y:0,z:0},
      constant: createPlaneParameter.offset
    }
  }
  onMouseEnter(): void {
    throw new Error("Method not implemented.");
  }
  onMouseLeave(): void {
    throw new Error("Method not implemented.");
  }
  onSelect(): void {
    throw new Error("Method not implemented.");
  }
  onDeselect(): void {
    throw new Error("Method not implemented.");
  }
  updateCustomConfig(customConfig: { visible: boolean; }): void {
    this.visible = customConfig.visible
  }
  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}

function buildPlaneGeomtry(
  { parallelTo, offset }: CreatePlaneParameter,
  planeLength: number,
): BufferGeometry {
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
