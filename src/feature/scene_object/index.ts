import { Mesh } from "three"

export abstract class SceneObject extends Mesh {
  declare userData: {
    type: 'plane'
  }
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onSelect?: () => void
  onDeselect?: () => void
}