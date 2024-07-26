// import { SketchObject } from "@src/features/sketch_object/type";
import { Object3D } from "three";

export type ValueOf<OBJ extends { [key: string]: any }> = OBJ[keyof OBJ];

// export function checkIsSketchObject(obj: Object3D): obj is SketchObject {
//   return obj.userData.type != null || obj.userData.type !== "";
// }
