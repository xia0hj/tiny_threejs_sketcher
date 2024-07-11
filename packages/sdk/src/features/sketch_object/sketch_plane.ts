import { Command } from "@src/features/command_system";
import {
  SCENE_PLANE_COLOR,
  SCENE_PLANE_LENGTH,
  SCENE_PLANE_OPACITY,
} from "@src/constant/config";
import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { COMMAND_KEY } from "@src/index";
import {
  SketchObject,
  SketchObjectUserData,
} from "@src/features/sketch_object/type";
import {
  BufferGeometry,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from "three";

export type CreatePlaneParameter = {
  parallelTo: "XY" | "XZ" | "YZ";
  offset: number;
};
export const commandCreatePlane: Command<"create_plane"> = {
  key: "create_plane",
  modification: true,
  run(context, parameter) {
    const plane = new SketchPlane(parameter);
    context.sketchObjectManager.add(plane);
    // context.commandSystem.runCommand({
    //   key: CommandKeyList.edit_plane,
    //   parameter: {
    //     constant: -parameter.offset,
    //     normal: {
    //       x: 1,
    //       y: 0,
    //       z: 0,
    //     },
    //   },
    // });
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

// export const CommandEditPlane: Command<
//   "edit_plane",
//   { normal: { x: number; y: number; z: number }; constant: number }
// > = {
//   key: "edit_plane",
//   modification: false,
//   run(rootRenderer, { normal, constant }) {
//     rootRenderer.inputEventHandler = new LineDrawer(
//       normal,
//       constant,
//       rootRenderer.sketchObjectGroup,
//     );
//   },
// };

export class SketchPlane
  extends Mesh<BufferGeometry, MeshStandardMaterial>
  implements SketchObject
{
  userData: SketchObjectUserData;
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
      normal:
        createPlaneParameter.parallelTo === "XY"
          ? { x: 0, y: 0, z: 1 }
          : createPlaneParameter.parallelTo === "XZ"
            ? { x: 0, y: 1, z: 0 }
            : { x: 1, y: 0, z: 0 },
      constant: createPlaneParameter.offset,
    };
  }
  updateCustomConfig(customConfig: { visible: boolean }): void {
    this.visible = customConfig.visible;
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
