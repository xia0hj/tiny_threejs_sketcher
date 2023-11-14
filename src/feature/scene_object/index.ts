import { Mesh } from "three"

export class GraphicObject extends Mesh {
  declare userData: {
    type: 'plane'
  }

  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onSelect?: () => void
  onDeselect?: () => void
}