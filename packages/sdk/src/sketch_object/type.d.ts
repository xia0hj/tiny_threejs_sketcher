import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { ValueOf } from "@src/util";
import { BufferGeometry, Mesh, MeshStandardMaterial } from "three";

export type SketchObjectUserData = {
  type: ValueOf<typeof SKETCH_OBJECT_TYPE>;
};

export abstract class SketchObject extends Mesh<
  BufferGeometry,
  MeshStandardMaterial
> {
  abstract userData: SketchObjectUserData;
  abstract onMouseEnter(): void;
  abstract onMouseLeave(): void;
  abstract onSelect(): void;
  abstract onDeselect(): void;
  abstract dispose(): void;
}
