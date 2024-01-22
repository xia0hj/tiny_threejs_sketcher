import { SKETCH_OBJECT_TYPE } from "@src/constant/enum";
import { ValueOf } from "@src/util";
import { BufferGeometry, Mesh, MeshStandardMaterial } from "three";

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
  abstract updateCustomConfig(customConfig: SketchObjectCustomConfig): void;
}

export type SketchObjectUserData = {
  type: ValueOf<typeof SKETCH_OBJECT_TYPE>;
};

type SketchObjectCustomConfig = {
  visible: boolean;
};

export type SketchObjectTreeItem = {
  id: number;
  children: Map<number, SketchObjectTreeItem>;
  isSelected: boolean;
  customConfig: SketchObjectCustomConfig;
};
