import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { BaseFace } from "@src/modules/sketch_object/base_face";
import { BasePlane } from "@src/modules/sketch_object/base_plane";
import { BasePoint } from "@src/modules/sketch_object/base_point";
import { Circle2d } from "@src/modules/sketch_object/circle2d";
import { Line2d } from "@src/modules/sketch_object/line2d";
import { ValueOf } from "@src/utils";
import { Object3D } from "three";

export interface SketchObjectInterface extends Object3D {
  userData: { type: ValueOf<typeof SKETCH_OBJECT_TYPE> };
  onMouseEnter?(): void;
  onMouseLeave?(): void;
  onSelect?(): void;
  onDeselect?(): void;
  cloneAsSketchObject?(): void;
  dispose(): void;
}

export type SketchObject = SketchObjectInterface &
  (BasePlane | BasePoint | Line2d | Circle2d | BaseFace);
