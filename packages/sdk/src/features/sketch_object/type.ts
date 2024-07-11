import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { ValueOf } from "@src/util";
import { BufferGeometry, Line, Mesh, MeshStandardMaterial, Object3D } from "three";

// export abstract class SketchObject extends Object3D {
//   abstract userData: SketchObjectUserData;
//   abstract onMouseEnter(): void;
//   abstract onMouseLeave(): void;
//   abstract onSelect(): void;
//   abstract onDeselect(): void;
//   abstract dispose(): void;
//   abstract updateCustomConfig(customConfig: SketchObjectCustomConfig): void;
// }


export interface SketchObject extends Object3D {
  userData: SketchObjectUserData;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onSelect?: () => void;
  onDeselect?: () => void;
  dispose?: () => void;
  updateCustomConfig?: (customConfig: SketchObjectCustomConfig) => void;
}

export type SketchObjectUserData =
  | {
      type: typeof SKETCH_OBJECT_TYPE.plane;
      normal: { x: number; y: number; z: number };
      constant: number;
    }
  | {
      type: typeof SKETCH_OBJECT_TYPE.line;
      startPoint: { x: number; y: number; z: number };
      endPoint: { x: number; y: number; z: number };
    };

type SketchObjectCustomConfig = {
  visible: boolean;
};

// export type SketchObjectTreeItem = {
//   id: number;
//   children: Map<number, SketchObjectTreeItem>;
//   isSelected: boolean;
//   customConfig: SketchObjectCustomConfig;
// };
