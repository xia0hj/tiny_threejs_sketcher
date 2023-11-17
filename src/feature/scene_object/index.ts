import { Mesh } from "three"

export abstract class SceneObject extends Mesh {
  abstract userData: {
    type: 'plane'
  }
  abstract onMouseEnter(): void
  abstract onMouseLeave(): void
  abstract onSelect(): void
  abstract onDeselect(): void
}