import { BufferGeometry, Mesh, MeshStandardMaterial } from "three";

export type SceneObjectUserData = {
  type: "plane";
};

export abstract class SceneObject extends Mesh<
  BufferGeometry,
  MeshStandardMaterial
> {
  abstract userData: SceneObjectUserData;
  abstract onMouseEnter(): void;
  abstract onMouseLeave(): void;
  abstract onSelect(): void;
  abstract onDeselect(): void;
}
