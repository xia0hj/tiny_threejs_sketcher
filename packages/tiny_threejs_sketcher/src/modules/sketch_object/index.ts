import { ValueOf } from "@src/utils";
import { Object3D } from "three";

export const SKETCH_OBJECT_TYPE = Object.freeze({
  basePlane: "basePlane",
  line2d: "line2d",
});

export interface SketchObject extends Object3D {
  userData: SketchObjectUserData;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onSelect?: () => void;
  onDeselect?: () => void;
  dispose?: () => void;
  // updateCustomConfig?: (customConfig: SketchObjectCustomConfig) => void;
}

export type SketchObjectUserData =
  | {
      type: typeof SKETCH_OBJECT_TYPE.basePlane;
      normal: { x: number; y: number; z: number };
      constant: number;
    }
  | {
      type: typeof SKETCH_OBJECT_TYPE.line2d;
      startPoint: { x: number; y: number; z: number };
      endPoint: { x: number; y: number; z: number };
    };

// type SketchObjectCustomConfig = {
//   visible: boolean;
// };
