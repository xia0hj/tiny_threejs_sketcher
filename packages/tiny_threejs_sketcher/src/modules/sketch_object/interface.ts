import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { BaseFace } from "@src/modules/sketch_object/base_face";
import { BasePlane } from "@src/modules/sketch_object/base_plane";
import { BasePoint } from "@src/modules/sketch_object/base_point";
import { Circle2d } from "@src/modules/sketch_object/circle2d";
import { Line2d } from "@src/modules/sketch_object/line2d";
import { Solid } from "@src/modules/sketch_object/solid";
import { ValueOf } from "@src/utils";
import { Object3D } from "three";

export interface SketchObject extends Object3D {
  userData: { type: ValueOf<typeof SKETCH_OBJECT_TYPE> };
  onPointerEnter?(): void;
  onPointerLeave?(): void;
  onSelect?(): void;
  onDeselect?(): void;
  cloneAsSketchObject?(): Object3D;
  dispose(): void;
}

export type SketchObjecTypetUnion =
  | BasePlane
  | BasePoint
  | Line2d
  | Circle2d
  | BaseFace
  | Solid;
